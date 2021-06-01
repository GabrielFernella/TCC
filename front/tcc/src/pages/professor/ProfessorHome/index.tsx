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
          <Link to="/prof-list-disciplina">
            <Button name="disponibilidade">Disciplinas</Button>
          </Link>
          <Link to="/prof-agenda">
            <Button name="agendamentos">Agendamentos</Button>
          </Link>
          <Link to="/prof-disponibilidade">
            <Button name="disponibilidade">Disponibilidade</Button>
          </Link>

          <Link to="/prof-up-form">
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

        <div id="listCards">
          <div className="cards">
            {' '}
            <p>
              Mensagem de Gabriel fernella: Boa noite professor, gostaria que
              fosse abordado Boa noite professor, gostaria que fosse abordado
              Boa noite professor, gostaria que fosse abordado
            </p>
          </div>
          <div className="cards">
            {' '}
            <p>
              Mensagem de Samanta: Boa noite professor, gostaria que fosse
              abordado
            </p>
          </div>
          <div className="cards" id="green">
            {' '}
            <p>Agendamento Realizado: Java 05/10/2021</p>
          </div>
          <div className="cards" id="red">
            {' '}
            <p>Agendamento Cancelado de Gabriel fernella: Java 05/10/2021</p>
          </div>
          <div className="cards" id="green">
            {' '}
            <p>Agendamento Realizado: Java 05/10/2021</p>
          </div>
        </div>
      </div>

      <footer />
      <br />
      <br />
    </div>
  );
};

export default ProfessorHome;

/*
          <Link to="/prof-cad-disciplina">
            <Button name="disciplina">Cad. Disciplina</Button>
          </Link>
*/

/*

        <div>
          <div id='cards'> Mensagem: Boa noite professor, gostaria que fosse abordado</div>
          <div id='cards'> Mensagem: Boa noite professor, gostaria que fosse abordado</div>
          <div id='cards'> Mensagem: Boa noite professor, gostaria que fosse abordado</div>
          <div id='cards'> Mensagem: Boa noite professor, gostaria que fosse abordado</div>
          <div id='cards'> Mensagem: Boa noite professor, gostaria que fosse abordado</div>
         <div id='cards'> Mensagem: Boa noite professor, gostaria que fosse abordado</div>
        </div>
*/
