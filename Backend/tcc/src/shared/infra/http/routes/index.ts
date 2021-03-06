import { Router } from 'express';

import studentsRouter from '@modules/students/infra/http/routes/students.routes';
import studentsAuthRouter from '@modules/students/infra/http/routes/studentAuth.routes';

import teachersRouter from '@modules/teachers/infra/http/routes/teacher.routes';
import teachersAuthRouter from '@modules/teachers/infra/http/routes/teacherAuth.routes';

const routes = Router();

routes.use('/students', studentsRouter);
routes.use('/studentsAuth', studentsAuthRouter);

routes.use('/teachers', teachersRouter);
routes.use('/teachersAuth', teachersAuthRouter);

export default routes;
