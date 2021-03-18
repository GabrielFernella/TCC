import { Router } from 'express';

import studentsRouter from '@modules/students/infra/http/routes/students.routes';
import studentsAuthRouter from '@modules/students/infra/http/routes/studentAuth.routes';
import studentPasswordRouter from '@modules/students/infra/http/routes/password.routes';

// Teacher imports
import teachersRouter from '@modules/teachers/infra/http/routes/teacher.routes';
import teachersAuthRouter from '@modules/teachers/infra/http/routes/teacherAuth.routes';
import teacherPasswordRouter from '@modules/teachers/infra/http/routes/password.routes';

import disponibilidadeRouter from '@modules/teachers/infra/http/routes/disponibilidade.routes';
import aulaRouter from '@modules/teachers/infra/http/routes/aula.routes';
import avaliacaoRouter from '@modules/teachers/infra/http/routes/avaliacao.routes';

// Routes
const routes = Router();

routes.use('/students', studentsRouter);
routes.use('/studentsAuth', studentsAuthRouter);
routes.use('/studentpassword', studentPasswordRouter); // Possui a rota forgot e reset

routes.use('/teachers', teachersRouter);
routes.use('/teachersAuth', teachersAuthRouter);
routes.use('/teacherpassword', teacherPasswordRouter); // Possui a rota forgot e reset

routes.use('/disponibilidade', disponibilidadeRouter);
routes.use('/aula', aulaRouter);
routes.use('/avaliacao', avaliacaoRouter); // Se já tiver, alterar

export default routes;
