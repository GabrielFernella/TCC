import React from 'react';
import { Link } from 'react-router-dom';

import PageHeader from '../../../components/PageHeader';
import backgroundImg from '../../../assets/images/success-background.svg';

import './styles.scss';
import Button from '../../../components/Button';

const ProfessorHome: React.FC = () => {
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
          <Link to="/list-disciplina">
            <Button name="disciplinas">Disciplinas</Button>
          </Link>
          <Link to="/agendamento">
            <Button name="agendamentos">Agendamentos</Button>
          </Link>
          <Link to="/prof-cad-disciplina">
            <Button name="pendencias">Pendencias</Button>
          </Link>
          <Link to="/prof-form">
            <Button name="perfil">Perfil</Button>
          </Link>
        </div>
      </div>

      <footer />
    </div>
  );
};

export default ProfessorHome;
