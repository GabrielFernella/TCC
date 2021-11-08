import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

// import { isBefore } from 'date-fns';

// import { IUpdateAgendamentoDTO } from '../dtos/IAgendamentoDTO';

import IProfessorRepository from '@modules/professor/repositories/IProfessorRepository';
import IAlunoRepository from '@modules/aluno/repositories/IAlunoRepository';
import IPagamentoRepository from '@modules/aluno/repositories/IPagamentoRepository';
import IAgendamentoRepository from '../repositories/IAgendamentoRepository';

@injectable()
class CancelarAgendamento {
  constructor(
    @inject('AgendamentoRepository')
    private agendamentoRepository: IAgendamentoRepository,

    @inject('PagamentoRepository')
    private pagamentoRepository: IPagamentoRepository,

    @inject('ProfessorRepository')
    private professorRepository: IProfessorRepository,

    @inject('AlunoRepository')
    private alunoRepository: IAlunoRepository,
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
        'Não é permitida o cancelamento da aula para uma aula já concluída.',
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

    // Validar se esse usuário tem permissão em horas para fazer o cancelamento
    // ############################################# Fazer

    // validar se foi feito o pagamento

    const pagamento = await this.pagamentoRepository.findById(
      agendamento.pagamento_id,
    );
    if (!pagamento) {
      throw new AppError('Pagamento não encontrado');
    }

    if (pagamento.statusPagamento === 3) {
      // Chamar API de reembolso
    }

    // Fazer a atualização do cancelamento do agendamento e processar o restituição do calor pago caso ele tenha feito o pagamento

    await this.agendamentoRepository.updateStatus(agendamento_id, 4);

    await this.pagamentoRepository.updateStatus(agendamento.pagamento_id, 4);
  }
}

export default CancelarAgendamento;
