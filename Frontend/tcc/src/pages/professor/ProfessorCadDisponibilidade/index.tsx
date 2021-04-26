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
  id?: string;
  diaSemana: string;
  horarioEntrada: string;
  horarioSaida: string;
}

interface ScheduleCreate {
  diaSemana: string;
  horarioEntrada: string;
  horarioSaida: string;
}

function Disponibilidade() {
  // Deve ser alterado

  // Nessa tela colocaremos 3 conexões com a API, de listar, create e delete
  // Teremos 2 botões, um para criar e outro para deletar em cada componente

  const [diaSemana, setDiaSemana] = useState('');
  const [horarioEntrada, setHorarioEntrada] = useState('');
  const [horarioSaida, setHorarioSaida] = useState('');

  const [scheduleItems, setScheduleItems] = useState<ScheduleInterface[]>([]);

  // const [result, setResult] = useState<ScheduleInterface[]>([]);

  // Carregar todos os horários do professor
  useEffect(() => {
    api
      .get('disponibilidade/show', {
        headers: {
          professor_id: '790da2dd-ea66-4414-b14b-6412fa246665',
        },
      })
      .then(response => {
        // const result = response.data;
        console.log(response.data);
        setScheduleItems(response.data);
      });
  }, []);

  // Adicionando uma nova disponibilidade
  /* useEffect(() => {
    api.post('disponibilidade/create', {}).then(response => {
      setScheduleItems(response.data);
    });
  }, [incluir]); */

  function incluir(values: ScheduleCreate) {
    let dia = values.diaSemana;
    if (values.diaSemana === '0') {
      dia = 'Domingo';
    }
    if (values.diaSemana === '1') {
      dia = 'Segunda';
    }
    if (values.diaSemana === '2') {
      dia = 'Terça';
    }
    if (values.diaSemana === '3') {
      dia = 'Quarta';
    }
    if (values.diaSemana === '4') {
      dia = 'Quinta';
    }
    if (values.diaSemana === '5') {
      dia = 'Sexta';
    }
    if (values.diaSemana === '6') {
      dia = 'Sábado';
    }

    setScheduleItems([
      {
        diaSemana: dia,
        horarioEntrada: values.horarioEntrada,
        horarioSaida: values.horarioSaida,
      },
      ...scheduleItems,
    ]);
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
                <div key={scheduleItem.id} id="disponibilidade-content">
                  <div id="diasemana-info">
                    <Input
                      name="diasemana"
                      label="Dia da semana"
                      type="text"
                      disabled
                      value={scheduleItem.diaSemana}
                    />
                  </div>
                  <div id="entrada-info">
                    <Input
                      name="entrada"
                      label="Das"
                      disabled
                      value={scheduleItem.horarioEntrada}
                    />
                  </div>
                  <div id="saida-info">
                    <Input
                      name="saida"
                      label="Até"
                      disabled
                      value={scheduleItem.horarioSaida}
                    />
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

            <div id="disponibilidade-content">
              <div id="diasemana-info">
                <Select
                  name="diasemana"
                  label="Dia da semana"
                  value={diaSemana}
                  onChange={e => setDiaSemana(e.target.value)}
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
                        diaSemana,
                        horarioEntrada,
                        horarioSaida,
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
