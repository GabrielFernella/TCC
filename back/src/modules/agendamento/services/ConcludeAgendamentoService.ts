import { injectable, inject } from 'tsyringe';
import path from 'path';

import AppError from '@shared/errors/AppError';

import IPagamentoRepository from '@modules/aluno/repositories/IPagamentoRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IProfessorRepository from '@modules/professor/repositories/IProfessorRepository';
import IAlunoRepository from '@modules/aluno/repositories/IAlunoRepository';
import IDisciplinaRepository from '@modules/professor/repositories/IDisciplinaRepository';
import IAgendamentoRepository from '../repositories/IAgendamentoRepository';
import Agendamento from '../infra/typeorm/entities/Agendamento';

/*
  Esse serviço é responsável por atualizar o agendamento como concluido e aplicar a nota ao professor
*/

// @ Falta
// 1 - Validar se a data já passou para ele avaliar a aula

interface IRequest {
  user_id: string;
  id_agendamento: string;
  nota: string;
  opiniao: string;
}

@injectable()
class ConcludeAgendamentoService {
  constructor(
    @inject('AgendamentoRepository')
    private agendamentoRepository: IAgendamentoRepository,

    @inject('ProfessorRepository')
    private professorRepository: IProfessorRepository,

    @inject('AlunoRepository')
    private alunoRepository: IAlunoRepository,

    @inject('DisciplinaRepository')
    private disciplinaRepository: IDisciplinaRepository,

    @inject('PagamentoRepository')
    private pagamentoRepository: IPagamentoRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({
    user_id,
    id_agendamento,
    nota,
    opiniao,
  }: IRequest): Promise<Agendamento> {
    const agendamento = await this.agendamentoRepository.findById(
      id_agendamento,
    );

    if (!agendamento) {
      throw new AppError('Agendamento não encontrado.');
    }

    if (agendamento.aluno_id !== user_id) {
      throw new AppError('Você não pertence a esse agendamento.');
    }

    if (agendamento.status === 4) {
      throw new AppError('Esse agendamento já foi cancelado.');
    }

    const pagamento = await this.pagamentoRepository.findById(
      agendamento.pagamento_id,
    );
    if (!pagamento) {
      throw new AppError(
        'Algo deu errado em carregar o pagamento desse agendamento.',
      );
    }

    if (
      pagamento.statusPagamento === 0 ||
      pagamento.statusPagamento === 1 ||
      pagamento.statusPagamento === 3 ||
      pagamento.statusPagamento === 4
    ) {
      throw new AppError('Você não concluiu o pagamento dessa aula.');
    }

    if (pagamento.statusPagamento === 5) {
      throw new AppError('Você já avaliou essa aula.');
    }

    agendamento.nota = nota;
    agendamento.opiniao = opiniao;
    agendamento.status = 5;
    pagamento.statusPagamento = 5;

    await this.pagamentoRepository.save(pagamento);
    const result = await this.agendamentoRepository.save(agendamento);

    // Buscando o arquivo template de email de recuperação
    const professorEmail = path.resolve(
      __dirname,
      '..',
      'views',
      'aula_concluida_professor.hbs',
    );

    // Enviar o email para o destinatário Professor
    try {
      const professor = await this.professorRepository.findById(
        agendamento.professor_id,
      );

      const aluno = await this.alunoRepository.findById(agendamento.aluno_id);

      const disciplina = await this.disciplinaRepository.findByID(
        agendamento.disciplina_id,
      );

      if (!professor || !aluno || !disciplina) {
        throw new AppError('Erro ao carregar os usuários.');
      }

      await this.mailProvider.sendMail({
        to: {
          name: professor.name,
          email: professor.email,
        },
        subject: '[WebEduca] Agendamento cadastrado',
        templateData: {
          file: professorEmail,
          variables: {
            name: professor.name,
            title: disciplina.titulo,
            date: agendamento.data.toLocaleString(),
            valor: disciplina.valor,
            aluno: aluno.name,
            // link: `${process.env.APP_WEB_URL}/reset-password?token=${token}`,
          },
        },
      });
    } catch (error) {
      console.log('Erro no envio de e-mail');
    }

    return result;
  }
}

export default ConcludeAgendamentoService;
