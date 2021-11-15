/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import ReactDOM from 'react-dom';
import toast, { Toaster } from 'react-hot-toast'; // Toast
import { useLocation, useHistory } from 'react-router-dom';
import PageHeader from '../../../components/PageHeader';
import backgroundImg from '../../../assets/images/success-background.svg';

import starBlack from '../../../assets/images/start_black.svg';
import starWhite from '../../../assets/images/start_white.svg';

import './styles.scss';
import api from '../../../services/api';
import Button from '../../../components/Button';

import { ChatComponent } from '../../chat/ChatComponent';

interface IResponse {
  agendamento: {
    id: string;
    data: string;
    entrada: number;
    saida: number;
    link: string;
    status: number;
    nota: string;
    opiniao: string;
  };
  pagamento: {
    id: string;
    title: string;
    emailPagador: string;
    valor: number;
    statusPagamento: number;
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
}

interface Props {
  agendamento_id: string;
}

const AlunoInfoAgendamentos = () => {
  window.onload = function () {
    initBeforeUnLoad();
  };

  const initBeforeUnLoad = () => {
    window.onbeforeunload = event => {
      if (socket) {
        socket.disconnect();
      }
    };
  };

  onbeforeunload = () => {
    if (socket) {
      socket.disconnect();
    }
  };

  const [agendamentos, setAgendamentos] = useState<IResponse>({
    agendamento: {
      id: '',
      data: '',
      entrada: 0,
      saida: 0,
      link: '',
      status: 0,
      nota: '',
      opiniao: '',
    },
    pagamento: {
      id: '',
      title: '',
      emailPagador: '',
      valor: 0,
      statusPagamento: 0,
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
  });
  const history = useHistory();

  const [link, setLink] = useState('');
  const [opiniao, setOpiniao] = useState('');
  const [nota, setNota] = useState('');
  const [stars, setStars] = useState(0);

  const [load, setLoad] = useState(false);
  const [openNota, setOpenNota] = useState(false);

  const [chatStartText, setChatStartText] = useState<string>('');

  const location = useLocation();

  const valor = (location.state as Props) || {};

  async function getLink() {
    // navigator.clipboard.writeText(agendamentos.agendamento.link);
    // toast.success('Link copiado!');

    if (agendamentos.agendamento.link.length === 0) {
      toast.error('Nenhum parametro cadastrado pelo professor até o momento');
    } else {
      history.push(`${agendamentos.agendamento.link}`);
    }
  }

  let socket: any;

  async function startChat() {
    socket = io('http://localhost:3333');

    socket.on('connect', () => {
      const params = {
        chatStartText,
        professorId: agendamentos.professor.id,
        alunoId: agendamentos.aluno.id,
        agendamentoId: agendamentos.agendamento.id,
        isAluno: true,
      };

      socket.emit('create_chat', params, (call, err) => {
        if (err) {
          console.log(err);
        } else {
          console.log(call);
        }
      });
    });

    socket.on('chat_listar_mensagens', mensagens => {
      // console.log(mensagens);

      const element = (
        <ChatComponent
          mensagens={mensagens.mensagens}
          isAluno
          socket={socket}
          chatId={mensagens.chatId}
        />
      );

      // ReactDOM.render(element, document.getElementById('chat'));
    });
  }

  function efetuarPagamento() {
    history.push(`/aluno/pendencia`);
  }

  async function getInfo() {
    await api
      .get(`/agendamento/info/${valor.agendamento_id}`)
      .then(response => {
        setAgendamentos(response.data);
        setLink(agendamentos.agendamento.link);
        setLoad(true);
      })
      .catch(() => {
        toast.error('Não foi possível carregar o agendamento');
      });
  }

  // para computar as estrelas da nota do professor
  function selectStar(starNumber: number) {
    setStars(starNumber);

    setNota(starNumber.toString());
  }

  async function concluirAula(): Promise<void> {
    const numberNota = parseInt(nota, 10);

    if (numberNota > 5) {
      toast.error(`A nota deve ser de 1 a 5`);
    } else {
      await api
        .put(`/agendamento/concluir`, {
          id_agendamento: agendamentos.agendamento.id,
          nota,
          opiniao,
        })
        .then(() => {
          toast.success('Avaliação enviada com sucesso');
          setLoad(true);
        })
        .catch(err => {
          toast.error(`Algo deu errado`);
        });
    }
  }

  async function cancelarAgendamento() {
    const resultado = window.confirm('Você deseja realmente cancelar?');
    if (resultado) {
      await api
        .put(`/agendamento/cancel/${agendamentos.agendamento.id}`)
        .then(() => {
          toast.success('Agendamento cancelado');
          setLoad(true);
        })
        .catch(err => {
          toast.error(`Ocorreu um erro: ${err.data.message}`);
        });
    }
  }

  useEffect(() => {
    getInfo();
  }, [load]);

  return (
    <div id="info-aluno-agendamentos" className="container">
      <Toaster />
      <PageHeader
        page="Agendamentos"
        background={backgroundImg}
        home="/aluno-home"
      >
        <div className="profile-header">
          <h2>Informações agendamento</h2>
        </div>
      </PageHeader>

      <main>
        <fieldset>
          <div className="filterContent">
            <h2>Informações agendamento</h2>
          </div>
          <br />
          <hr />

          <div id="chat" />

          <div id="info">
            <h3>Disciplina: </h3>
            <span>{agendamentos.disciplina.titulo}</span>

            <h3>Data: </h3>
            <span>
              {new Date(agendamentos.agendamento.data).toLocaleDateString()}
            </span>

            <h3>Horário:</h3>
            <span>
              Das {agendamentos.agendamento.entrada}h até{' '}
              {agendamentos.agendamento.entrada + 1}h
            </span>

            <br />
            <h3>
              Status Agendamento:
              {agendamentos.agendamento.status === 0 && (
                <b className="normal"> Agendado</b>
              )}
              {agendamentos.agendamento.status === 1 && (
                <b className="normal"> Confirmado </b>
              )}
              {agendamentos.agendamento.status === 2 && (
                <b className="normal"> Em processo </b>
              )}
              {agendamentos.agendamento.status === 3 && (
                <b className="normal"> Efetivada </b>
              )}
              {agendamentos.agendamento.status === 4 && (
                <b className="red"> Cancelado </b>
              )}
              {agendamentos.agendamento.status === 5 && (
                <b className="green"> Concluido </b>
              )}
            </h3>

            <br />

            <h3>Aluno(a)</h3>
            <span>Aluno: {agendamentos.aluno.name}</span>
            <span>E-mail: {agendamentos.aluno.email}</span>
            <br />

            <h3>Professor(a)</h3>
            <span>Professor: {agendamentos.professor.name}</span>
            <span>E-mail: {agendamentos.professor.email}</span>
            <br />

            <h3>Pagamento</h3>
            <div>
              <span>
                Valor: <b> R${agendamentos.pagamento.valor} </b>
              </span>
              <br />
              <span>
                Status Pagamento:
                {agendamentos.pagamento.statusPagamento === 0 && (
                  <b> Em espera </b>
                )}
                {agendamentos.pagamento.statusPagamento === 1 && (
                  <b> Processando </b>
                )}
                {agendamentos.pagamento.statusPagamento === 2 && (
                  <b> Efetivado </b>
                )}
                {agendamentos.pagamento.statusPagamento === 3 && (
                  <b> Negado </b>
                )}
                {agendamentos.pagamento.statusPagamento === 4 && (
                  <b> Cancelado </b>
                )}
                {agendamentos.pagamento.statusPagamento === 5 && (
                  <b> Concluido </b>
                )}
              </span>
              {(agendamentos.pagamento.statusPagamento === 0 ||
                agendamentos.pagamento.statusPagamento === 1 ||
                agendamentos.pagamento.statusPagamento === 3) && (
                <Button
                  name="link"
                  type="button"
                  onClick={() => efetuarPagamento()}
                >
                  Efetuar pagamento
                </Button>
              )}
            </div>
            {agendamentos.agendamento.status !== 4 && (
              <div>
                <Button
                  name="abrirChat"
                  id="chatOpen"
                  onClick={() => startChat()}
                >
                  Abrir Chat
                </Button>
              </div>
            )}
            <br />
            <br />
            <br />

            <div className="link-access">
              <h3>Link de Acesso: </h3>
              <input
                type="text"
                value={link}
                onChange={e => setLink(e.target.value)}
              />
              <Button name="link" type="button" onClick={() => getLink()}>
                Abrir link no navegador
              </Button>
              <hr />

              <br />
              {agendamentos.agendamento.status !== 4 &&
                agendamentos.agendamento.status !== 5 && (
                  <>
                    {openNota === false ? (
                      <Button
                        name="aceitar"
                        id="aceitar"
                        onClick={() => setOpenNota(true)}
                      >
                        Avaliar e concluir agendamento
                      </Button>
                    ) : (
                      <>
                        <b>Opinião: </b>
                        <textarea
                          // type="text"
                          value={opiniao}
                          onChange={e => setOpiniao(e.target.value)}
                        />

                        <b>Avalie o professor </b>
                        <div>
                          {parseInt(nota, 10) >= 1 ? (
                            <img
                              src={starBlack}
                              alt=""
                              onClick={() => setNota('1')}
                            />
                          ) : (
                            <img
                              src={starWhite}
                              alt=""
                              onClick={() => setNota('1')}
                            />
                          )}

                          {parseInt(nota, 10) >= 2 ? (
                            <img
                              src={starBlack}
                              alt=""
                              onClick={() => setNota('2')}
                            />
                          ) : (
                            <img
                              src={starWhite}
                              alt=""
                              onClick={() => setNota('2')}
                            />
                          )}

                          {parseInt(nota, 10) >= 3 ? (
                            <img
                              src={starBlack}
                              alt=""
                              onClick={() => setNota('3')}
                            />
                          ) : (
                            <img
                              src={starWhite}
                              alt=""
                              onClick={() => setNota('3')}
                            />
                          )}

                          {parseInt(nota, 10) >= 4 ? (
                            <img
                              src={starBlack}
                              alt=""
                              onClick={() => setNota('4')}
                            />
                          ) : (
                            <img
                              src={starWhite}
                              alt=""
                              onClick={() => setNota('4')}
                            />
                          )}

                          {parseInt(nota, 10) >= 5 ? (
                            <img
                              src={starBlack}
                              alt=""
                              onClick={() => setNota('5')}
                            />
                          ) : (
                            <img
                              src={starWhite}
                              alt=""
                              onClick={() => setNota('5')}
                            />
                          )}
                        </div>

                        <Button
                          name="aceitar"
                          id="aceitar"
                          onClick={() => concluirAula()}
                        >
                          Avaliar e concluir agendamento
                        </Button>
                      </>
                    )}
                  </>
                )}
            </div>
          </div>

          <hr />
        </fieldset>

        <footer>
          <p>Alinhe suas expectativas e fique de olho no horário!</p>

          {agendamentos.agendamento.status !== 4 &&
            agendamentos.agendamento.status !== 5 && (
              <Button
                name="submit"
                className="cancelar"
                onClick={() => cancelarAgendamento()}
              >
                Cancelar
              </Button>
            )}
        </footer>
      </main>
    </div>
  );
};

export default AlunoInfoAgendamentos;
