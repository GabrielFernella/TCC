import { Router } from 'express';

import studentsRouter from '@modules/students/infra/http/routes/students.route';

const routes = Router();

routes.use('/students', studentsRouter);

export default routes;
