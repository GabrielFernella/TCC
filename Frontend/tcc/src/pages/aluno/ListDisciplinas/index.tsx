import React from 'react';
import PageHeader from '../../../components/PageHeader';
import backgroundImg from '../../../assets/images/success-background.svg';

import './styles.scss';

const ListDisciplina: React.FC = () => {
  const teste = [1, 2, 3, 4];
  function select() {
    alert('teste');
  }

  return (
    <div id="page-teacher-profile" className="container">
      <PageHeader page="Diciplinas" background={backgroundImg}>
        <div className="profile-header">
          <h2>Vamos estudar e se aperfeiçoar ainda mais!</h2>
          <p>Escolha uma das disciplinas</p>
        </div>
      </PageHeader>

      <main>
        <fieldset>
          <div id="list-info">
            {teste.map(test => (
              <div key={test} id="card">
                <h2>Computação em Nuvem</h2>

                <h3> + Gabriel Oliveira Santos</h3>

                <div>
                  <h4>Tags:</h4>
                  <p>tags</p>
                </div>

                <h4>Descrição:</h4>
                <p id="desc">
                  Nós aproveitamos o poder da mudança para criar novo e
                  extraordinário valor, colocando cloud no coração dos seus
                  negócios. Nossa abordagem põe as necessidades da sua empresa
                  em primeiro lugar. Desenvolvemos soluções específicas de
                  indústria para que você migre para a nuvem e usufrua dela
                  agora.
                </p>

                <h4>Disponibilidades:</h4>
                <p>Segunda-feira, Terça-feira, Sexta-feira, Sabado, Domingo</p>

                <div>
                  <h4>Valor: R$ 30 /hora</h4>
                </div>

                <button type="button" onClick={select}>
                  Ver disponibilidade
                </button>
              </div>
            ))}
          </div>
        </fieldset>

        <footer>
          <p>
            Selecione uma das disciplinas e veja a disponibilidade para
            agendamento!
          </p>
        </footer>
      </main>
    </div>
  );
};

export default ListDisciplina;
