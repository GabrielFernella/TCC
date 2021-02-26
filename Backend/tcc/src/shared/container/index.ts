import { container } from 'tsyringe';

import '@modules/students/providers';
import './providers';

import IStudentsRepository from '@modules/students/repositories/IStudentRepository';
import StudentRepository from '@modules/students/infra/typeorm/repositories/StudentRepository';
import IStudentsTokensRepository from '@modules/students/repositories/IStudentsTokensRepository';
import StudentsTokensRepository from '@modules/students/infra/typeorm/repositories/StudentTokensRepository';

// Injeção de dependência para os alunos
container.registerSingleton<IStudentsRepository>(
  'StudentRepository',
  StudentRepository,
);
container.registerSingleton<IStudentsTokensRepository>(
  'StudentsTokensRepository',
  StudentsTokensRepository,
);
