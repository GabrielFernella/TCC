import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../../hooks/auth';
import PageHeader from '../../../components/PageHeader';
import backgroundImg from '../../../assets/images/success-background.svg';

import './styles.scss';
import Button from '../../../components/Button';

const ProfessorHome: React.FC = () => {
  const { signOut } = useAuth();
  const history = useHistory();

  async function handleDeleteUser() {
    await signOut();
    history.push('/');
  }

  return (
    <div id="page-home" className="container">
      <PageHeader page="Home" background={backgroundImg} home="/prof-home">
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
          <Link to="/prof-list-disciplina">
            <Button name="disponibilidade">Lista Disponibilidade</Button>
          </Link>
          <Link to="/prof-disponibilidade">
            <Button name="disponibilidade">Cad. Disponibilidade</Button>
          </Link>

          <Link to="/prof-agenda">
            <Button name="agendamentos">Agendamentos</Button>
          </Link>
          <Link to="/prof-up-form">
            <Button name="perfil">Perfil</Button>
          </Link>

          <Button name="perfil" onClick={handleDeleteUser}>
            Logout
          </Button>
        </div>
      </div>

      <footer />
    </div>
  );
};

export default ProfessorHome;
