import React from 'react';
import { Link } from 'react-router-dom';

import PageHeader from '../../../components/PageHeader';
import backgroundImg from '../../../assets/images/success-background.svg';

import './styles.scss';
import Button from '../../../components/Button';

function ProfessorHome() {
  return (
    <div id="page-home" className="container">
      <PageHeader page="Meu perfil" background={backgroundImg}>
        <div className="profile-header">
          <h2>Bem-vindo ao Web Educa</h2>
          <p>Faça seu cadastro e junte-se a outros professores.</p>
        </div>
      </PageHeader>

      <div id="content">
        <div className="menu">
          <Link to="/aluno">
            <Button name="MeusAgendamentos">Cad. Disciplina</Button>
          </Link>
          <Link to="/aluno">
            <Button name="MeusAgendamentos">Cad. Disponibilidade</Button>
          </Link>
          <Link to="/aluno">
            <Button name="MeusAgendamentos">Agendamentos</Button>
          </Link>
          <Link to="/aluno">
            <Button name="MeusAgendamentos">Perfil</Button>
          </Link>
        </div>
      </div>

      <footer />
    </div>
  );
}

export default ProfessorHome;
