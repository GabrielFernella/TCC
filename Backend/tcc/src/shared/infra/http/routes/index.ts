import { Router } from 'express';

import studentsRouter from '@modules/students/infra/http/routes/students.route';
import studentsAuthRouter from '@modules/students/infra/http/routes/studentAuth.route';

const routes = Router();

routes.use('/students', studentsRouter);
routes.use('/studentsAuth', studentsAuthRouter);

export default routes;
