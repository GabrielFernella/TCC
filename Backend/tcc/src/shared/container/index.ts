import { container } from 'tsyringe';

import '@modules/students/providers';
import '@modules/teachers/providers';
import './providers';

// For Students
import IStudentsRepository from '@modules/students/repositories/IStudentRepository';
import StudentRepository from '@modules/students/infra/typeorm/repositories/StudentRepository';
import IStudentsTokensRepository from '@modules/students/repositories/IStudentsTokensRepository';
import StudentsTokensRepository from '@modules/students/infra/typeorm/repositories/StudentTokensRepository';

// For Teachers
import ITeacherRepository from '@modules/teachers/repositories/ITeacherRepository';
import TeachersRepository from '@modules/teachers/infra/typeorm/repositories/TeachersRepository';
import ITeacherTokensRepository from '@modules/teachers/repositories/ITeacherTokensRepository';
import TeacherTokensRepository from '@modules/teachers/infra/typeorm/repositories/TeacherTokensRepository';

// Teachars Disponibilidade and Aula
import IDisponibilidadeRepository from '@modules/teachers/repositories/IDisponibilidadeRepository';
import DisponibilidadeRepository from '@modules/teachers/infra/typeorm/repositories/DisponibilidadeRepository';
import IAulaRepository from '@modules/teachers/repositories/IAulaRepository';
import AulaRepository from '@modules/teachers/infra/typeorm/repositories/AulaRepository';

// Injeção de dependência para os alunos
container.registerSingleton<IStudentsRepository>(
  'StudentRepository',
  StudentRepository,
);
container.registerSingleton<IStudentsTokensRepository>(
  'StudentsTokensRepository',
  StudentsTokensRepository,
);

container.registerSingleton<ITeacherRepository>(
  'TeachersRepository',
  TeachersRepository,
);
container.registerSingleton<ITeacherTokensRepository>(
  'TeacherTokensRepository',
  TeacherTokensRepository,
);

container.registerSingleton<IDisponibilidadeRepository>(
  'DisponibilidadeRepository',
  DisponibilidadeRepository,
);

container.registerSingleton<IAulaRepository>('AulaRepository', AulaRepository);
