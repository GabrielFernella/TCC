import { Router } from 'express';

// Students imports
import alunoRouter from '@modules/aluno/infra/http/routes/aluno.routes';

// Teacher imports
import professorRouter from '@modules/professor/infra/http/routes/professor.routes';
import disponibilidadeRouter from '@modules/professor/infra/http/routes/disponibilidade.routes';
import disciplinaRouter from '@modules/professor/infra/http/routes/disciplina.routes';

// Autenticação & Senha
import sessionsRouter from '@modules/usuario/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/usuario/infra/http/routes/password.routes';

// Routes
const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);

routes.use('/aluno', alunoRouter);

routes.use('/professor', professorRouter);
routes.use('/disponibilidade', disponibilidadeRouter);
routes.use('/disciplina', disciplinaRouter);

export default routes;
