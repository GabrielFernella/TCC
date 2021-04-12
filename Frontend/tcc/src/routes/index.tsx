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
import ProfessorHome from '../pages/professor/ProfessorHome';

// Processo
import AlunoCadForm from '../pages/aluno/AlunoCadForm';
import ListDisciplinas from '../pages/aluno/ListDisciplinas';

// Testes
import teste from '../pages/professor/ProfessorHome';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={ProfessorHome} />
      <Route path="/aluno" exact component={ProfessorForm} />

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
