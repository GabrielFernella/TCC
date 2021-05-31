import React from 'react';
import { Switch, Route } from 'react-router-dom';

// import Route from './Route';
// Fazendo a listagem de disciplinas

import Landing from '../pages/dashboard/Landing';

// Professor
import RecuperarSenha from '../pages/professor/RecuperarSenha';
import ProfessorForm from '../pages/professor/ProfessorCadForm';
import ProfessorUpdateForm from '../pages/professor/ProfessorUpdateForm';

import ProfessorCadDisciplina from '../pages/professor/ProfessorCadDisciplina';
import ProfessorUpdateDisciplina from '../pages/professor/ProfessorUpdateDisciplina';
import ProfessorListDisciplinas from '../pages/professor/ProfessorListDisciplinas';
import ProfessorCadDisponibilidade from '../pages/professor/ProfessorCadDisponibilidade';
import ProfessorListAgendamentos from '../pages/professor/ProfessorListAgendamentos';
import ProfessorHome from '../pages/professor/ProfessorHome';
import ProfessorLogin from '../pages/professor/ProfessorLogin';

// Aluno
import AlunoCadForm from '../pages/aluno/AlunoCadForm';
import AlunoUpdateForm from '../pages/aluno/AlunoUpdateForm';
import AlunoLogin from '../pages/aluno/AlunoLogin';
import AlunoHome from '../pages/aluno/AlunoHome';
import AlunoAgendamentos from '../pages/aluno/AlunoAgendamentos';
import ListDisciplinas from '../pages/aluno/ListDisciplinas';
import AgendarDisciplina from '../pages/aluno/AgendarDisciplina';
import ListPendencias from '../pages/aluno/ListPendencias';

// Testes
import teste from '../pages/professor/ProfessorHome';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Landing} />

      <Route path="/dashboard" exact component={Landing} />
      <Route path="/forgot-password" exact component={RecuperarSenha} />

      <Route path="/aluno-login" exact component={AlunoLogin} />
      <Route path="/aluno-home" exact component={AlunoHome} />
      <Route path="/aluno-form" exact component={AlunoCadForm} />
      <Route path="/aluno-up-form" exact component={AlunoUpdateForm} />
      <Route path="/list-disciplina" exact component={ListDisciplinas} />
      <Route path="/aluno-agenda" exact component={AlunoAgendamentos} />
      <Route path="/agendar" exact component={AgendarDisciplina} />
      <Route path="/pendencias" exact component={ListPendencias} />

      <Route path="/prof-login" exact component={ProfessorLogin} />
      <Route path="/prof-home" exact component={ProfessorHome} />
      <Route path="/prof-form" exact component={ProfessorForm} />
      <Route path="/prof-up-form" exact component={ProfessorUpdateForm} />

      <Route path="/prof-agenda" exact component={ProfessorListAgendamentos} />
      <Route
        path="/prof-cad-disciplina"
        exact
        component={ProfessorCadDisciplina}
      />
      <Route
        path="/prof-up-disciplina"
        exact
        component={ProfessorUpdateDisciplina}
      />
      <Route
        path="/prof-list-disciplina"
        exact
        component={ProfessorListDisciplinas}
      />
      <Route
        path="/prof-disponibilidade"
        exact
        component={ProfessorCadDisponibilidade}
      />
    </Switch>
  );
};

export default Routes;
