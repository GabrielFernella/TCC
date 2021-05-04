import React from 'react';
import { Switch, Route } from 'react-router-dom';

// import Route from './Route';
// Fazendo a listagem de disciplinas

import Landing from '../pages/dashboard/Landing';

import RecuperarSenha from '../pages/professor/RecuperarSenha';
import ProfessorForm from '../pages/professor/ProfessorCadForm';
import ProfessorDisciplina from '../pages/professor/ProfessorCadDisciplina';
import ProfessorCadDisponibilidade from '../pages/professor/ProfessorCadDisponibilidade';
import ProfessorHome from '../pages/professor/ProfessorHome';
import ProfessorLogin from '../pages/professor/ProfessorLogin';

// Aluno
import AlunoCadForm from '../pages/aluno/AlunoCadForm';
import AlunoLogin from '../pages/aluno/AlunoLogin';
import AlunoHome from '../pages/aluno/AlunoHome';
import ListDisciplinas from '../pages/aluno/ListDisciplinas';
import AgendarDisciplina from '../pages/aluno/AgendarDisciplina';

// Testes
import teste from '../pages/professor/ProfessorHome';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={ProfessorHome} />

      <Route path="/dashboard" exact component={Landing} />
      <Route path="/forgot-password" exact component={RecuperarSenha} />

      <Route path="/aluno-form" exact component={AlunoCadForm} />
      <Route path="/aluno-login" exact component={AlunoLogin} />
      <Route path="/aluno-home" exact component={AlunoHome} />
      <Route path="/list-disciplina" exact component={ListDisciplinas} />
      <Route path="/agendamento" exact component={AgendarDisciplina} />

      <Route path="/prof-login" exact component={ProfessorLogin} />
      <Route path="/prof-home" exact component={ProfessorHome} />
      <Route path="/prof-form" exact component={ProfessorForm} />
      <Route
        path="/prof-cad-disciplina"
        exact
        component={ProfessorDisciplina}
      />
      <Route
        path="/prof-cad-disponibilidade"
        exact
        component={ProfessorCadDisponibilidade}
      />
    </Switch>
  );
};

export default Routes;
