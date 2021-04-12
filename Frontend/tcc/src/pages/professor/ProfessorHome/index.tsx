import React from 'react';
import { Link } from 'react-router-dom';

import PageHeader from '../../../components/PageHeader';
import backgroundImg from '../../../assets/images/success-background.svg';

import './styles.scss';
import Button from '../../../components/Button';

function ProfessorHome() {
  return (
    <div id="page-home" className="container">
      <PageHeader page="Home" background={backgroundImg}>
        <div className="profile-header">
          <h2>Bem-vindo ao Web Educa</h2>
          <p>
            Navegue pelo menu com facilidade, aqui disponibilizamos os
            principais recursos da plataforma.
          </p>
        </div>
      </PageHeader>

      <div id="content">
        <div className="menu">
          <Link to="/prof-cad-disciplina">
            <Button name="disciplina">Cad. Disciplina</Button>
          </Link>
          <Link to="/prof-cad-disponibilidade">
            <Button name="disponibilidade">Cad. Disponibilidade</Button>
          </Link>
          <Link to="/aluno">
            <Button name="agendamentos">Agendamentos</Button>
          </Link>
          <Link to="/prof-form">
            <Button name="perfil">Perfil</Button>
          </Link>
        </div>
      </div>

      <footer />
    </div>
  );
}

export default ProfessorHome;
