import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import path from 'path';

import { isBefore } from 'date-fns';

// import { isBefore } from 'date-fns';

// import { IUpdateAgendamentoDTO } from '../dtos/IAgendamentoDTO';

import IProfessorRepository from '@modules/professor/repositories/IProfessorRepository';
import IAlunoRepository from '@modules/aluno/repositories/IAlunoRepository';
import IPagamentoRepository from '@modules/aluno/repositories/IPagamentoRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import INotificationRepository from '@modules/notifications/repositories/INotificationsRepository';
import IAgendamentoRepository from '../repositories/IAgendamentoRepository';

@injectable()
class ReembolsoAgendamento {
  constructor(
    @inject('AgendamentoRepository')
    private agendamentoRepository: IAgendamentoRepository,

    @inject('PagamentoRepository')
    private pagamentoRepository: IPagamentoRepository,

    @inject('ProfessorRepository')
    private professorRepository: IProfessorRepository,

    @inject('AlunoRepository')
    private alunoRepository: IAlunoRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('NotificationRepository')
    private notificationRepository: INotificationRepository,
  ) {}

  public async execute(agendamento_id: string, user_id: string): Promise<void> {
    const agendamento = await this.agendamentoRepository.findById(
      agendamento_id,
    );

    if (!agendamento) {
      throw new AppError('Agendamento não encontrado');
    }

    if (agendamento.status === 4) {
      throw new AppError('Agendamento já cancelado.');
    }

    if (agendamento.status === 5) {
      throw new AppError(
        'Não é permitida o reembolso de uma aula já concluída.',
      );
    }

    // Validar se esse usuário tem permissão
    const professor = await this.professorRepository.findById(user_id);

    const aluno = await this.alunoRepository.findById(user_id);

    if (aluno === undefined && professor === undefined) {
      throw new AppError(
        'Esse usuário não tem permissão para cancelar esse agendamento',
      );
    }

    const DateAgendamento = new Date(agendamento.data);

    const pagamento = await this.pagamentoRepository.findById(
      agendamento.pagamento_id,
    );
    if (!pagamento) {
      throw new AppError('Pagamento não encontrado');
    }

    if (pagamento.statusPagamento !== 2) {
      throw new AppError(
        'Seu pagamento ainda não foi processado para solicitar reembolso',
      );
    }

    if (!isBefore(DateAgendamento, new Date())) {
      throw new AppError('Ainda não é possível solicitar reembolso');
    }

    /* if (
      new Date().toLocaleDateString() === DateAgendamento.toLocaleDateString()
    ) {
      throw new AppError(
        'Você só pode cancelar um agendamento com um dia de antecedencia',
      );
    } */

    // validar se foi feito o pagamento

    const getAluno = await this.alunoRepository.findById(pagamento.aluno_id);
    if (!getAluno) {
      throw new AppError('Houve um erro ao localizar o aluno desse pagamento');
    }

    const getProfessor = await this.professorRepository.findById(
      pagamento.professor_id,
    );
    if (!getProfessor) {
      throw new AppError(
        'Houve um erro ao localizar o Professor desse agendamento',
      );
    }

    // Chamar API de reembolso // Mandar um e-mail de reembolso do ALUNO
    // Buscando o arquivo template de email de recuperação
    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'reembolso_agendamento.hbs',
    );

    // Enviar o email para o destinatário
    this.mailProvider.sendMail({
      to: {
        name: getAluno.name,
        email: getAluno.email,
      },
      subject: '[WebEduca] Agendamento cancelado',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: getAluno.name,
          title: pagamento.title,
          // link: `${process.env.APP_WEB_URL}/reset-password?token=${token}`,
        },
      },
    });

    // Fazer a atualização do cancelamento do agendamento e processar o restituição do calor pago caso ele tenha feito o pagamento

    await this.agendamentoRepository.updateStatus(agendamento_id, 4);

    await this.pagamentoRepository.updateStatus(agendamento.pagamento_id, 4);
  }
}

export default ReembolsoAgendamento;
