import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import PageHeader from '../../../components/PageHeader';
import backgroundImg from '../../../assets/images/success-background.svg';

import './styles.scss';
import Button from '../../../components/Button';
import { useAuth } from '../../../hooks/auth';

const AlunoHome: React.FC = () => {
  const { signOut } = useAuth();
  const history = useHistory();

  async function handleDeleteUser() {
    await signOut();
    history.push('/');
  }

  return (
    <div id="page-home-aluno" className="container">
      <PageHeader page="Home" background={backgroundImg} home="aluno-home">
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
          <Link to="/aluno/agendamentos">
            <Button name="agendamentos">Agendamentos</Button>
          </Link>
          <Link to="/pendencias">
            <Button name="pendencias">Financeiro</Button>
          </Link>
          <Link to="/aluno-up-form">
            <Button name="perfil">Perfil</Button>
          </Link>
          <Button
            name="perfil"
            onClick={e => {
              window.confirm('Você deseja realmente sair?') &&
                handleDeleteUser();
            }}
          >
            Sair
          </Button>
        </div>
      </div>

      <footer />
    </div>
  );
};

export default AlunoHome;
