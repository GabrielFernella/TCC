import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast'; // Toast
import { parseISO, format } from 'date-fns';
import PageHeader from '../../../components/PageHeader';
import backgroundImg from '../../../assets/images/success-background.svg';

import './styles.scss';
import api from '../../../services/api';
import Input from '../../../components/Input';
import Button from '../../../components/Button';

/*
Agendada = 0,
  Confirmada = 1,
  EmProgresso = 2,
  Efetivada = 3,
  Canceladas = 4,
*/

interface IResponse {
  appointment: {
    agendamento: {
      id: string;
      data: Date;
      entrada: number;
      saida: number;
      link: string;
      status: number;
      nota: string;
      opiniao: string;
    };
    disciplina: {
      id: string;
      titulo: string;
      tag: string[];
      descricao: string;
      valor: string;
    };
    professor: {
      id?: string;
      nome?: string;
      avatar?: string;
      email?: string;
    };
    aluno: {
      id?: string;
      name?: string;
      avatar?: string;
      email?: string;
    };
  };
}

const ProfessorListAgendamentos: React.FC = () => {
  const [agendamentos, setAgendamentos] = useState<IResponse[]>([
    {
      appointment: {
        agendamento: {
          id: '',
          data: new Date(),
          entrada: 0,
          saida: 0,
          link: '',
          status: 0,
          nota: '',
          opiniao: '',
        },
        disciplina: {
          id: '',
          titulo: '',
          tag: [''],
          descricao: '',
          valor: '',
        },
        professor: {
          id: '',
          nome: '',
          avatar: '',
          email: '',
        },
        aluno: {
          id: '',
          name: '',
          avatar: '',
          email: '',
        },
      },
    },
  ]);

  const [date, setDate] = useState('');

  const [load, setLoad] = useState(false);

  useEffect(() => {
    const newDate = new Date();

    const newDate2 = `${newDate.getDate()}-${
      newDate.getMonth() + 1
    }-${newDate.getFullYear()}`;

    getAppointments(newDate2);
  }, []);

  async function getAppointments(findData: string) {
    const newDate = findData;
    console.log(newDate);

    await api
      .post('/professor/agendamentos', {
        date: newDate,
      })
      .then(async response => {
        setAgendamentos(await response.data);
      })
      .catch(() => {
        toast.error('Não foi possível carregar os agendamentos');
      });
  }

  // Carregar todas as disciplinas

  // setAgendamentos(teste);

  function alterColor(value: number) {
    if (value === 1) {
      return { color: '#6C3CDD' };
    }
    if (value === 2) {
      return { color: 'red' };
    }
    return { color: 'green' };
  }

  function select(disciplina_id: string) {
    toast.success(`Você escolheu uma opção: Visualizar  ${disciplina_id}`);
  }

  function cancelar(disciplina_id: string) {
    toast.success(`Você escolheu uma opção: Cancelar  ${disciplina_id}`);
  }

  function aceitar(disciplina_id: string) {
    toast.success(`Você escolheu uma opção: Aceitar  ${disciplina_id}`);
  }

  return (
    <div id="list-professor-agendamentos" className="container">
      <Toaster />
      <PageHeader
        page="Agendamentos"
        background={backgroundImg}
        home="/prof-home"
      >
        <div className="profile-header">
          <h2>Essas são todos os seus agendamentos</h2>
        </div>
      </PageHeader>

      <main>
        <fieldset>
          <div className="filterContent">
            <h2>Agendamentos</h2>
            <div className="inputContent">
              <Input
                type="date"
                name="data"
                label="Data"
                onChange={e => getAppointments(e.target.value)}
              />
            </div>

            <div className="buttonsContent">
              <Button id="alterar" name="handleFilter">
                Pendente
              </Button>
              <Button id="deletar" name="handleFilter">
                Cancelados
              </Button>
              <Button id="aceitar" name="handleFilter">
                Concluídos
              </Button>
            </div>
          </div>
          <br />
          <hr />

          <div id="list-info">
            {agendamentos.map(item => {
              return (
                <div key={item.appointment.agendamento.id} id="card">
                  <div className="states">
                    <h2>
                      Data:{' '}
                      {format(
                        new Date(item.appointment.agendamento.data),
                        'dd-MM-yyyy',
                      )}
                    </h2>
                    &ensp;&ensp;
                    <h2>
                      Status:
                      <span
                        style={alterColor(item.appointment.agendamento.status)}
                      >
                        {item.appointment.agendamento.status}
                      </span>
                    </h2>
                  </div>

                  <h3>Disciplina: {item.appointment.disciplina.titulo}</h3>
                  <h3>Aluno: {item.appointment.aluno.name}</h3>

                  <h3>Link de acesso: {item.appointment.agendamento.link}</h3>

                  <h3>Valor: R$ {item.appointment.disciplina.valor} /hora</h3>

                  <div className="buttons">
                    {item.appointment.agendamento.status === 1 ? (
                      <button
                        type="button"
                        id="aceitar"
                        onClick={() => {
                          aceitar(item.appointment.disciplina.titulo);
                        }}
                      >
                        Aceitar
                      </button>
                    ) : null}

                    <button
                      type="button"
                      id="alterar"
                      onClick={() => select(item.appointment.disciplina.titulo)}
                    >
                      Visualizar
                    </button>

                    {item.appointment.agendamento.status === 2 ? (
                      <button
                        type="button"
                        id="deletar"
                        onClick={() => {
                          cancelar(item.appointment.disciplina.titulo);
                        }}
                      >
                        Cancelar
                      </button>
                    ) : null}
                  </div>
                </div>
              );
            })}
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

export default ProfessorListAgendamentos;
