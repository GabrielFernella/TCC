import React, { FormEvent, useState } from 'react';
import PageHeader from '../../../components/PageHeader';
import Input from '../../../components/Input';
import warningIcon from '../../../assets/images/icons/warning.svg';
import './styles.scss';
import backgroundImg from '../../../assets/images/success-background.svg';
import Select from '../../../components/Select';
import Button from '../../../components/Button';

function Disponibilidade() {
  // Deve ser alterado

  const [diasemana, setDiasemana] = useState('');
  const [horarioEntrada, setHorarioEntrada] = useState('');
  const [horarioSaida, setHorarioSaida] = useState('');

  const scheduleItems = [1, 2, 3];

  function excluir() {
    scheduleItems.splice(2, 1);
    console.log(scheduleItems);
  }

  function handleUpdateProfile() {}

  console.log(diasemana);

  return (
    <div id="page-teacher-profile" className="container">
      <PageHeader page="Meu perfil" background={backgroundImg}>
        <div className="profile-header">
          <h2>Cadastre suas disponibilidades</h2>
          <p>
            Assim saberemos quais são os melhores horários para você atender os
            alunos.
          </p>
        </div>
      </PageHeader>

      <main>
        <form onSubmit={handleUpdateProfile}>
          <fieldset>
            {scheduleItems.map(scheduleItem => {
              return (
                <div id="personal-info">
                  <div id="diasemana-info">
                    <Select
                      name="diasemana"
                      label="Dia da semana"
                      value={diasemana}
                      onChange={e => setDiasemana(e.target.value)}
                      options={[
                        { value: '0', label: 'Domingo' },
                        { value: '1', label: 'Segunda-feira' },
                        { value: '2', label: 'Terça-feira' },
                        { value: '3', label: 'Quarta-feira' },
                        { value: '4', label: 'Quinta-feira' },
                        { value: '5', label: 'Sexta-feira' },
                        { value: '6', label: 'Sábado' },
                      ]}
                    />
                  </div>
                  <div id="entrada-info">
                    <Input
                      name="entrada"
                      label="Das"
                      type="time"
                      value={horarioEntrada}
                      onChange={e => setHorarioEntrada(e.target.value)}
                      required
                    />
                  </div>
                  <div id="saida-info">
                    <Input
                      name="saida"
                      label="Até"
                      type="time"
                      value={horarioSaida}
                      onChange={e => setHorarioSaida(e.target.value)}
                      required
                    />
                  </div>
                  <div id="excluir-info">
                    <Button
                      type="button"
                      onClick={() => excluir}
                      className="btnexcluir"
                      name="excluir"
                    >
                      X
                    </Button>
                  </div>
                </div>
              );
            })}
          </fieldset>
          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
              Importante! <br />
              Preencha todos os dados
            </p>
            <button type="submit">Salvar disponibilidade</button>
          </footer>
        </form>
      </main>
    </div>
  );
}

export default Disponibilidade;
