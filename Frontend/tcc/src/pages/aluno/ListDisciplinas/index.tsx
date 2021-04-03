import React from 'react';
import PageHeader from '../../../components/PageHeader';
import backgroundImg from '../../../assets/images/success-background.svg';

import './styles.scss';

function ListDisciplina() {
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
                <h2>Teste</h2>
                <div>
                  <h4>Tags:</h4>
                  <p> tags</p>
                </div>

                <h4>Descrição:</h4>
                <p id="desc">
                  descriçãodescriçãodescriçãodescriçãodescriçãodescriçãodescriçãodescriçãodescriçãodescriçãodescriçãodescriçãodescriçãodescrição
                </p>

                <div>
                  <h4>Valor: R$ /hora</h4>
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
}

export default ListDisciplina;
