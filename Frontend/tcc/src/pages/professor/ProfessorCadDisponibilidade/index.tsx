import React, { FormEvent, useEffect, useState } from 'react';
import PageHeader from '../../../components/PageHeader';
import Input from '../../../components/Input';
import warningIcon from '../../../assets/images/icons/warning.svg';
import './styles.scss';
import backgroundImg from '../../../assets/images/success-background.svg';
import Select from '../../../components/Select';
import Button from '../../../components/Button';
import api from '../../../services/api';

interface ScheduleInterface {
  dia: string;
  entrada: string;
  saida: string;
}

function Disponibilidade() {
  // Deve ser alterado

  // Nessa tela colocaremos 3 conexões com a API, de listar, create e delete
  // Teremos 2 botões, um para criar e outro para deletar em cada componente

  const [diasemana, setDiasemana] = useState('');
  const [horarioEntrada, setHorarioEntrada] = useState('');
  const [horarioSaida, setHorarioSaida] = useState('');

  const [scheduleItems, setScheduleItems] = useState<ScheduleInterface[]>([
    { dia: diasemana, entrada: horarioEntrada, saida: horarioSaida },
  ]);

  useEffect(() => {
    api.get('/disponibilidade/show').then(response => {
      setScheduleItems(response.data);
    });
  }, []);

  function incluir(values: ScheduleInterface) {
    setScheduleItems([values, ...scheduleItems]);
    console.log(scheduleItems);
  }

  function handleDelete() {
    api
      .delete('/classes', {
        params: {
          disponibilidade_id: '',
        },
      })
      .then(() => {
        // history.push('/');
      })
      .catch(() => {
        alert('Não foi possível deletar');
      });
  }

  function handleUpdateProfile() {}

  console.log(diasemana);

  return (
    <div id="page-disponibilidade" className="container">
      <PageHeader page="Minhas Disponibilidades" background={backgroundImg}>
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
            <legend>Seus dados</legend>
            {scheduleItems.map(scheduleItem => {
              return (
                <div key={scheduleItem.dia} id="disponibilidade-content">
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

                  <div id="create-info">
                    <Button
                      type="button"
                      onClick={
                        () =>
                          incluir({
                            dia: diasemana,
                            entrada: horarioEntrada,
                            saida: horarioSaida,
                          })
                        // eslint-disable-next-line react/jsx-curly-newline
                      }
                      className="btnexcluir"
                      name="create"
                    >
                      Create
                    </Button>
                  </div>

                  <div id="excluir-info">
                    <Button
                      type="button"
                      onClick={() => handleDelete()}
                      className="btnexcluir"
                      name="excluir"
                    >
                      Delete
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
