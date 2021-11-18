import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast'; // Toast
import { parseISO, format } from 'date-fns';
import { Link } from 'react-router-dom';
import PageHeader from '../../../components/PageHeader';
import backgroundImg from '../../../assets/images/success-background.svg';

import './styles.scss';
import api from '../../../services/api';
import Input from '../../../components/Input';
import Button from '../../../components/Button';

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
      name?: string;
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
          name: '',
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

  interface stateFilter {
    status: 'pendente' | 'cancelado' | 'concluido';
  }

  const [newAgendamento, setNewAgendamento] = useState<IResponse[]>([]);

  const [date, setDate] = useState('');

  const [status, setStatus] = useState<stateFilter>({ status: 'pendente' });

  const [load, setLoad] = useState(false);

  function compare(a: IResponse, b: IResponse) {
    return (
      a.appointment.agendamento.data.getDate() -
      b.appointment.agendamento.data.getDate()
    );
  }

  useEffect(() => {
    const newDate = new Date();

    getAppointments();
    setterStateFilter(status);

    const sortAppointment = agendamentos.sort(compare);
    setAgendamentos(sortAppointment);

    const newDate2 = `${newDate.getDate()}-${
      newDate.getMonth() + 1
    }-${newDate.getFullYear()}`;

    getAppointmentsByDate(newDate2);
  }, []);

  async function getAppointments() {
    await api
      .get('/professor/agendamentos')
      .then(async response => {
        setAgendamentos(await response.data);
        setNewAgendamento(await response.data);
      })
      .catch(() => {
        toast.error('Não foi possível carregar os agendamentos');
      });
  }

  async function getAppointmentsByDate(findData: string) {
    const newDate = findData;

    await api
      .post('/professor/agendamentos', {
        date: newDate,
      })
      .then(async response => {
        setDate(newDate);
        setAgendamentos(await response.data);
        setNewAgendamento(await response.data);
      })
      .catch(() => {
        // toast.error('Não foi possível carregar os agendamentos para essa data');
        getAppointments();
      });
  }

  async function cancelarAgendamento(id: string) {
    const resultado = window.confirm('Você deseja realmente cancelar?');
    if (resultado) {
      await api
        .put(`/agendamento/cancel/${id}`)
        .then(() => {
          toast.success('Agendamento cancelado');
          getAppointments();
          setLoad(true);
        })
        .catch(err => {
          toast.error(err.response.data.message);
        });
    }
  }

  function alterColor(value: number) {
    if (value === 4) {
      return { color: 'red' };
    }
    if (value === 5) {
      return { color: 'green' };
    }
    return { color: '#6C3CDD' };
  }

  function setterStateFilter(value: stateFilter) {
    setStatus(value);

    let result: IResponse[] = [];

    if (value.status === 'cancelado') {
      result = agendamentos.filter(
        item => item.appointment.agendamento.status === 4,
      );
    } else if (value.status === 'concluido') {
      result = agendamentos.filter(
        item => item.appointment.agendamento.status === 5,
      );
    } else {
      result = agendamentos.filter(
        item =>
          item.appointment.agendamento.status === 0 ||
          item.appointment.agendamento.status === 1 ||
          item.appointment.agendamento.status === 2 ||
          item.appointment.agendamento.status === 3,
      );
    }

    setNewAgendamento(result);
  }

  // Fazer a confirmação de aula pelo professor
  async function confirmation(agendamento_id: string) {
    await api
      .put('/agendamento/status', {
        agendamento_id,
        status: 1,
      })
      .then(() => {
        getAppointments();
        toast.success(`Confirmação realizada com sucesso.`);
      })
      .catch(() => {
        toast.error(`Algo deu errado ao mudar o status do Agendamento.`);
      });
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
          <h2>Esses são seus agendamentos</h2>
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
                onChange={e => getAppointmentsByDate(e.target.value)}
              />
            </div>

            <div className="buttonsContent">
              <Button
                id="alterar"
                name="handleFilter"
                onClick={() => setterStateFilter({ status: 'pendente' })}
              >
                Pendente
              </Button>
              <Button
                id="deletar"
                name="handleFilter"
                onClick={() => setterStateFilter({ status: 'cancelado' })}
              >
                Cancelados
              </Button>
              <Button
                id="aceitar"
                name="handleFilter"
                onClick={() => setterStateFilter({ status: 'concluido' })}
              >
                Concluídos
              </Button>
            </div>
          </div>
          <br />
          <hr />

          <div id="list-info">
            {newAgendamento.map(item => {
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
                    <h3>
                      Horario: {item.appointment.agendamento.entrada}h até{' '}
                      {item.appointment.agendamento.saida}h
                    </h3>
                    &ensp;&ensp;
                  </div>
                  <h2>
                    Status:
                    <span
                      style={alterColor(item.appointment.agendamento.status)}
                    >
                      {item.appointment.agendamento.status === 0 && (
                        <span> Agendada</span>
                      )}
                      {item.appointment.agendamento.status === 1 && (
                        <span> Confirmada </span>
                      )}
                      {item.appointment.agendamento.status === 2 && (
                        <span> Em processo </span>
                      )}
                      {item.appointment.agendamento.status === 3 && (
                        <span> Concluida </span>
                      )}
                      {item.appointment.agendamento.status === 4 && (
                        <span> Cancelada </span>
                      )}
                      {item.appointment.agendamento.status === 5 && (
                        <span> Concluida </span>
                      )}
                    </span>
                  </h2>

                  <h3>Disciplina: {item.appointment.disciplina.titulo}</h3>
                  <h3>Professor: {item.appointment.professor.name}</h3>

                  <h3 className="link">
                    Link de acesso: {item.appointment.agendamento.link}
                  </h3>

                  <h3>Valor: R$ {item.appointment.disciplina.valor} /hora</h3>

                  <div className="buttonsCard">
                    <button type="button" id="alterar">
                      <Link
                        className="btnVisualizar"
                        to={{
                          pathname: '/professor/agenda/info',
                          state: {
                            agendamento_id: item.appointment.agendamento.id,
                          },
                        }}
                      >
                        <span className="visualizar">Visualizar</span>
                      </Link>
                    </button>

                    {item.appointment.agendamento.status === 0 && (
                      <button
                        type="button"
                        id="aceitar"
                        onClick={() => {
                          confirmation(item.appointment.agendamento.id);
                        }}
                      >
                        Aceitar
                      </button>
                    )}

                    {item.appointment.agendamento.status !== 4 &&
                    item.appointment.agendamento.status !== 5 ? (
                      <button
                        type="button"
                        id="deletar"
                        onClick={() => {
                          cancelarAgendamento(item.appointment.agendamento.id);
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
          <p>Gerencie o status dos agendamentos através de um clique!</p>
        </footer>
      </main>
    </div>
  );
};

export default ProfessorListAgendamentos;

/*
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

    await api
      .post('/professor/agendamentos', {
        date: newDate,
      })
      .then(async response => {
        setDate(newDate);
        setAgendamentos(await response.data);
      })
      .catch(() => {
        toast.error('Não foi possível carregar os agendamentos');
      });
  }

  function alterColor(value: number) {
    if (value === 4) {
      return { color: 'red' };
    }
    if (value === 3) {
      return { color: 'green' };
    }
    return { color: '#6C3CDD' };
  }

  async function putStatus(agendamento_id: string, status: number) {
    await api
      .put('/agendamento/status', {
        agendamento_id,
        status,
      })
      .then(() => {
        getAppointments(date);
        toast.success(`Alteração do status realizada com sucesso.`);
      })
      .catch(() => {
        toast.error(`Algo deu errado ao mudar o status do Agendamento.`);
      });
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
                    <h3>
                      Horario: {item.appointment.agendamento.entrada}h até{' '}
                      {item.appointment.agendamento.saida}h
                    </h3>
                    &ensp;&ensp;
                  </div>
                  <h2>
                    Status:
                    <span
                      style={alterColor(item.appointment.agendamento.status)}
                    >
                      {item.appointment.agendamento.status === 0 && (
                        <span> Agendada</span>
                      )}
                      {item.appointment.agendamento.status === 1 && (
                        <span> Confirmada </span>
                      )}
                      {item.appointment.agendamento.status === 2 && (
                        <span> Em processo </span>
                      )}
                      {item.appointment.agendamento.status === 3 && (
                        <span> Concluida </span>
                      )}
                      {item.appointment.agendamento.status === 4 && (
                        <span> Cancelada </span>
                      )}
                    </span>
                  </h2>

                  <h3>Disciplina: {item.appointment.disciplina.titulo}</h3>
                  <h3>Aluno: {item.appointment.aluno.name}</h3>

                  <h3 className="link">
                    Link de acesso: {item.appointment.agendamento.link}
                  </h3>

                  <h3>Valor: R$ {item.appointment.disciplina.valor} /hora</h3>

                  <div className="buttons">
                    {item.appointment.agendamento.status === 0 ? (
                      <button
                        type="button"
                        id="aceitar"
                        onClick={() => {
                          putStatus(item.appointment.agendamento.id, 1);
                        }}
                      >
                        Aceitar
                      </button>
                    ) : null}

                    <Link
                      className="btnVisualizar"
                      to={{
                        pathname: '/professor/agenda/info',
                        state: {
                          agendamento_id: item.appointment.agendamento.id,
                        },
                      }}
                    >
                      <button type="button" id="alterar">
                        <span className="visualizar">Visualizar</span>
                      </button>
                    </Link>

                    {item.appointment.agendamento.status !== 4 &&
                    item.appointment.agendamento.status !== 3 ? (
                      <button
                        type="button"
                        id="deletar"
                        onClick={() => {
                          putStatus(item.appointment.agendamento.id, 4);
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
*/
