import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

// Feitos
import Landing from '../pages/dashboard/Landing';
import Login from '../pages/dashboard/Login';

import RecuperarSenha from '../pages/professor/RecuperarSenha';
import ProfessorForm from '../pages/professor/ProfessorCadForm';
import ProfessorDisciplina from '../pages/professor/ProfessorCadDisciplina';
import ProfessorCadDisponibilidade from '../pages/professor/ProfessorCadDisponibilidade';

// Processo
import AlunoCadForm from '../pages/aluno/AlunoCadForm';
import ListDisciplinas from '../pages/aluno/ListDisciplinas';

// Testes
import teste from '../pages/professor/ProfessorHome';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={ListDisciplinas} />
      <Route path="/aluno" exact component={ProfessorForm} />
    </Switch>
  );
};

export default Routes;

/*
 <Route path="/forgot-pass" component={RecuperarSenha} />

      <Route path="/aluno-cad" component={AlunoCadForm} />

      <Route path="/prof-form" component={ProfessorForm} />
      <Route path="/prof-disc" component={ProfessorDisciplina} />
      <Route path="/prof-disp" component={ProfessorCadDisponibilidade} />
*/

/*
<Route path="/forgot-pass" component={RecuperarSenha} />

      <Route path="/aluno-cad" component={AlunoCadForm} />

      <Route path="/prof-form" component={ProfessorForm} />
      <Route path="/prof-disc" component={ProfessorDisciplina} />
      <Route path="/prof-disp" component={ProfessorCadDisponibilidade} />
*/
