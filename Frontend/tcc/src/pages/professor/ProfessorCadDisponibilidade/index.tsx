import React, { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast'; // Toast
import PageHeader from '../../../components/PageHeader';
import Input from '../../../components/Input';
import warningIcon from '../../../assets/images/icons/warning.svg';
import backgroundImg from '../../../assets/images/success-background.svg';
import Select from '../../../components/Select';
import Button from '../../../components/Button';
import api from '../../../services/api';

import { useAuth } from '../../../hooks/auth';
import './styles.scss';

interface ScheduleInterface {
  id: string;
  diaSemana: string;
  horarioEntrada: string;
  horarioSaida: string;
}

interface ScheduleCreate {
  diaSemana: string;
  horarioEntrada: string;
  horarioSaida: string;
}

const Disponibilidade: React.FC = () => {
  // const history = useHistory();
  // Nessa tela colocaremos 3 conexões com a API, de listar, create e delete
  // Teremos 2 botões, um para criar e outro para deletar em cada componente

  const { user } = useAuth();

  let userID: string;
  if (!user) {
    userID = '';
  } else {
    userID = user.id;
  }

  const [diaSemana, setDiaSemana] = useState('');
  const [horarioEntrada, setHorarioEntrada] = useState('');
  const [horarioSaida, setHorarioSaida] = useState('');

  const [scheduleItems, setScheduleItems] = useState<ScheduleInterface[]>([]);

  // Carregar todos os horários do professor
  useEffect(() => {
    api
      .get('disponibilidade/show', {
        headers: {
          professor_id: userID,
        },
      })
      .then(response => {
        setScheduleItems(response.data);
      })
      .catch(() => {
        // alert('Não foi possível identificar suas disponibilidades');
        toast.error('Não foi possível identificar suas disponibilidades');
      });
  }, []);

  function validateDay(day: string) {
    switch (day) {
      case '0':
        return 'Domingo';
      case '1':
        return 'Segunda-feira';
      case '2':
        return 'Terça-feira';
      case '3':
        return 'Quarta-feira';
      case '4':
        return 'Quinta-feira';
      case '5':
        return 'Sexta-feira';
      case '6':
        return 'Sábado';
      default:
        return 'Inválid';
    }
  }

  async function incluir(values: ScheduleCreate) {
    const dia = parseInt(values.diaSemana, 10);
    const entrada = parseInt(values.horarioEntrada, 10);
    const saida = parseInt(values.horarioSaida, 10);

    // Efetuando intervalo de horas
    if (
      !(
        entrada >= 0 &&
        saida >= 0 &&
        entrada <= 23 &&
        saida <= 23 &&
        dia >= 0 &&
        dia <= 6
      )
    ) {
      // alert('Intervalo de horas inválidas');
      toast.error('Intervalo de horas inválidas');
    } else {
      await api
        .post('disponibilidade/create', {
          diaSemana: dia,
          horarioEntrada: entrada,
          horarioSaida: saida,
        })
        .then(() => {
          toast.success('Disponibilidade Criada com sucesso');

          // Alterar essa parte depois
          window.location.reload();
        })
        .catch(() => {
          toast.error('Não foi possível criar uma nova disponibilidade');
        });
    }
  }

  async function handleDelete(dispo_id: string) {
    await api
      .delete(`disponibilidade/delete/${dispo_id}`)
      .then(() => {
        toast.success('Disponibilidade deletada');

        window.location.reload();
      })
      .catch(() => {
        toast.error('Não foi possível deletar');
      });
  }
  return (
    <div id="page-disponibilidade" className="container">
      <Toaster />
      <PageHeader
        page="Minhas Disponibilidades"
        background={backgroundImg}
        to="/login"
      >
        <div className="profile-header">
          <h2>Cadastre suas disponibilidades</h2>
          <p>
            Assim saberemos quais são os melhores horários para você atender os
            alunos.
          </p>
        </div>
      </PageHeader>

      <main>
        <fieldset>
          <legend>Suas Disponibilidades</legend>
          {scheduleItems.map(scheduleItem => {
            return (
              <div key={scheduleItem.id} id="disponibilidade-content">
                <div id="diasemana-info">
                  <Input
                    name="diasemana"
                    label="Dia da semana"
                    type="text"
                    disabled
                    value={validateDay(scheduleItem.diaSemana)}
                  />
                </div>
                <div id="entrada-info">
                  <Input
                    name="entrada"
                    label="Das"
                    mask="money"
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
                    onClick={() => handleDelete(scheduleItem.id)}
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
                required
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
                required
                name="entrada"
                label="Das"
                type="text"
                pattern="[0-9]*"
                mask="money"
                maxLength={2}
                value={horarioEntrada}
                onChange={e => setHorarioEntrada(e.target.value)}
              />
            </div>
            <div id="saida-info">
              <Input
                mask="money"
                name="saida"
                label="Até"
                pattern="[0-9]*"
                maxLength={2}
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
          </div>
        </fieldset>
        <footer>
          <p>
            <img src={warningIcon} alt="Aviso importante" />
            Importante! Preencha todos os dados
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Disponibilidade;
