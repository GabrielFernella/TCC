import { Router } from 'express';

// Students imports
import notification from '@modules/notifications/infra/http/routes/notification.routes';

import alunoRouter from '@modules/aluno/infra/http/routes/aluno.routes';
import alunoAuthRouter from '@modules/aluno/infra/http/routes/alunoAuth.routes';
import alunoPasswordRouter from '@modules/aluno/infra/http/routes/password.routes';

// Teacher imports
import professorRouter from '@modules/professor/infra/http/routes/professor.routes';
import professorAuthRouter from '@modules/professor/infra/http/routes/professorAuth.routes';
import professorPasswordRouter from '@modules/professor/infra/http/routes/password.routes';

import disponibilidadeRouter from '@modules/professor/infra/http/routes/disponibilidade.routes';
import disciplinaRouter from '@modules/professor/infra/http/routes/disciplina.routes';

import agendamentoRouter from '@modules/agendamento/infra/http/routes/agendamento.routes';

// Routes
const routes = Router();
routes.use('/notification', notification);

routes.use('/aluno', alunoRouter);
routes.use('/alunosession', alunoAuthRouter);
routes.use('/alunopass', alunoPasswordRouter);

routes.use('/professor', professorRouter);
routes.use('/profsession', professorAuthRouter);
routes.use('/profpass', professorPasswordRouter);

routes.use('/disponibilidade', disponibilidadeRouter);
routes.use('/disciplina', disciplinaRouter);

routes.use('/agendamento', agendamentoRouter);

export default routes;
