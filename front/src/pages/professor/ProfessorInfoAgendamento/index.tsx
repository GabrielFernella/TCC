import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast'; // Toast
import { parseISO, format } from 'date-fns';
import { Location } from 'history';
import { useLocation, useHistory } from 'react-router-dom';
import { string } from 'yup';
import { io } from 'socket.io-client';
import ReactDOM from 'react-dom';
import PageHeader from '../../../components/PageHeader';
import backgroundImg from '../../../assets/images/success-background.svg';

import './styles.scss';
import api from '../../../services/api';
import Input from '../../../components/Input';
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

const ProfessorInfoAgendamentos = () => {
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
  const [load, setLoad] = useState(false);
  const [openChat, setOpenChat] = useState(false);
  const [chatStartText, setChatStartText] = useState<string>('');

  const location = useLocation();

  const valor = (location.state as Props) || {};

  // console.log(valor.agendamento_id);

  useEffect(() => {
    if (openChat) {
      startChat();
    }
  }, [openChat]);

  async function updateLink() {
    await api
      .put('/agendamento/link', {
        agendamento_id: agendamentos.agendamento.id,
        link,
      })
      .then(() => {
        toast.success('Link atualizado com sucesso!');
      })
      .catch(() => {
        toast.error(
          'Aldo deu errado ao tentar atualizar o link, tente novamente.',
        );
      });
  }

  let socket: any;

  async function startChat() {
    socket = io('http://localhost:3333');

    console.log(chatStartText);

    socket.on('connect', () => {
      const params = {
        chatStartText,
        professorId: agendamentos.professor.id,
        alunoId: agendamentos.aluno.id,
        agendamentoId: agendamentos.agendamento.id,
        isAluno: false,
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
      console.log(mensagens);

      mensagens.mensagens.forEach(msg => {
        if (msg.isAluno) {
          // eslint-disable-next-line no-param-reassign
          msg.isAluno = false;
        } else {
          // eslint-disable-next-line no-param-reassign
          msg.isAluno = true;
        }
      });

      const element = (
        <ChatComponent
          mensagens={mensagens.mensagens}
          isAluno={false}
          socket={socket}
          chatId={mensagens.chatId}
        />
      );
      ReactDOM.render(element, document.getElementById('chat'));
    });
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

  useEffect(() => {
    getInfo();
  }, [load]);

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

  return (
    <div id="info-professor-agendamentos" className="container">
      <Toaster />
      <PageHeader
        page="Agendamentos"
        background={backgroundImg}
        home="/prof-home"
      >
        <div className="profile-header">
          <h2>Informações do agendamento</h2>
        </div>
      </PageHeader>

      <main>
        <fieldset>
          <div className="filterContent">
            <h2>Informações do agendamento</h2>
          </div>
          <br />
          <hr />

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
            </div>
            {agendamentos.agendamento.status !== 4 && (
              <div>
                <Button
                  name="abrirChat"
                  id="chatOpen"
                  onClick={() => setOpenChat(!openChat)}
                >
                  Abrir Chat
                </Button>
              </div>
            )}
            <div id="chat" />
            <br />
            <div className="link-access">
              <h3>Link de Acesso: </h3>
              <input
                type="text"
                value={link}
                onChange={e => setLink(e.target.value)}
              />
              <Button name="link" type="button" onClick={() => updateLink()}>
                Atualizar
              </Button>
              {agendamentos.agendamento.status !== 4 &&
                agendamentos.agendamento.status !== 5 && (
                  <Button
                    type="button"
                    name="submit"
                    id="deletar"
                    // className="deletar"
                    onClick={() => cancelarAgendamento()}
                  >
                    Cancelar agendamento
                  </Button>
                )}
            </div>
          </div>

          <br />
          <hr />
        </fieldset>

        <footer>
          <p>Alinhe suas expectativas e gerencia seus horários</p>
        </footer>
      </main>
    </div>
  );
};

export default ProfessorInfoAgendamentos;
