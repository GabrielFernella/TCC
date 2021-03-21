import { Router } from 'express';

import alunoRouter from '@modules/aluno/infra/http/routes/aluno.routes';
import alunoAuthRouter from '@modules/aluno/infra/http/routes/alunoAuth.routes';
import alunoPasswordRouter from '@modules/aluno/infra/http/routes/password.routes';

// Teacher imports
import professorRouter from '@modules/professor/infra/http/routes/professor.routes';
import professorAuthRouter from '@modules/professor/infra/http/routes/professorAuth.routes';
import professorPasswordRouter from '@modules/professor/infra/http/routes/password.routes';

import disponibilidadeRouter from '@modules/professor/infra/http/routes/disponibilidade.routes';
import disciplinaRouter from '@modules/professor/infra/http/routes/disciplina.routes';

// Routes
const routes = Router();

routes.use('/aluno', alunoRouter);
routes.use('/alunoauth', alunoAuthRouter);
routes.use('/alunopassword', alunoPasswordRouter); // Possui a rota forgot e reset

routes.use('/professor', professorRouter);
routes.use('/professorauth', professorAuthRouter);
routes.use('/professorpassword', professorPasswordRouter); // Possui a rota forgot e reset

routes.use('/disponibilidade', disponibilidadeRouter);
routes.use('/disciplina', disciplinaRouter);

export default routes;
