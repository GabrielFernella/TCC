import { container } from 'tsyringe';

import '@modules/aluno/providers';
import '@modules/professor/providers';
import './providers';

// For Alunos // alterar
import IAlunoRepository from '@modules/aluno/repositories/IAlunoRepository';
import AlunoRepository from '@modules/aluno/infra/typeorm/repositories/AlunoRepository';
import IAlunoTokensRepository from '@modules/aluno/repositories/IAlunoTokensRepository';
import AlunoTokensRepository from '@modules/aluno/infra/typeorm/repositories/AlunoTokensRepository';
import IPagamentoRepository from '@modules/aluno/repositories/IPagamentoRepository';
import PagamentoRepository from '@modules/aluno/infra/typeorm/repositories/PagamentoRepository';

// For Professores
import IProfessorRepository from '@modules/professor/repositories/IProfessorRepository';
import ProfessorRepository from '@modules/professor/infra/typeorm/repositories/ProfessorRepository';
import IProfessorTokensRepository from '@modules/professor/repositories/IProfessorTokensRepository';
import ProfessorTokensRepository from '@modules/professor/infra/typeorm/repositories/ProfessorTokensRepository';

// Teachars Disponibilidade and Aula
import IDisponibilidadeRepository from '@modules/professor/repositories/IDisponibilidadeRepository';
import DisponibilidadeRepository from '@modules/professor/infra/typeorm/repositories/DisponibilidadeRepository';
import IDisciplinaRepository from '@modules/professor/repositories/IDisciplinaRepository';
import DisciplinaRepository from '@modules/professor/infra/typeorm/repositories/DisciplinaRepository';

// Agendamento
import IAgendamentoRepository from '@modules/agendamento/repositories/IAgendamentoRepository';
import AgendamentoRepository from '@modules/agendamento/infra/typeorm/repositories/AgendamentoRepository';

// Notificação
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import NotificationRepository from '@modules/notifications/infra/typeorm/repositories/NotificationRepository';

// Injeção de dependência para os alunos
container.registerSingleton<IAlunoRepository>(
  'AlunoRepository',
  AlunoRepository,
);
container.registerSingleton<IAlunoTokensRepository>(
  'AlunoTokensRepository',
  AlunoTokensRepository,
);
container.registerSingleton<IPagamentoRepository>(
  'PagamentoRepository',
  PagamentoRepository,
);

// Injeção de dependência para o professor
container.registerSingleton<IProfessorRepository>(
  'ProfessorRepository',
  ProfessorRepository,
);
container.registerSingleton<IProfessorTokensRepository>(
  'ProfessorTokensRepository',
  ProfessorTokensRepository,
);

container.registerSingleton<IDisponibilidadeRepository>(
  'DisponibilidadeRepository',
  DisponibilidadeRepository,
);

container.registerSingleton<IDisciplinaRepository>(
  'DisciplinaRepository',
  DisciplinaRepository,
);

container.registerSingleton<IAgendamentoRepository>(
  'AgendamentoRepository',
  AgendamentoRepository,
);

container.registerSingleton<INotificationsRepository>(
  'NotificationRepository',
  NotificationRepository,
);
