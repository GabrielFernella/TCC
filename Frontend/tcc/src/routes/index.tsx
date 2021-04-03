import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

// Feitos
// import Landing from '../pages/dashboard/Landing';
// import Login from '../pages/dashboard/Login';
// import RecuperarSenha from '../pages/professor/RecuperarSenha';
// import ProfessorForm from '../pages/professor/ProfessorCadForm';
// import ProfessorDisciplina from '../pages/professor/ProfessorCadDisciplina';
// import ProfessorCadDisponibilidade from '../pages/professor/ProfessorCadDisponibilidade';

// import teste from '../pages/aluno/AlunoCadForm';

import teste from '../pages/aluno/ListDisciplinas';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={teste} />
    </Switch>
  );
};

export default Routes;
