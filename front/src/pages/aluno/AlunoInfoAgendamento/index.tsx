import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import ReactDOM from 'react-dom';
import toast, { Toaster } from 'react-hot-toast'; // Toast
import { useLocation, useHistory } from 'react-router-dom';
import PageHeader from '../../../components/PageHeader';
import backgroundImg from '../../../assets/images/success-background.svg';

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
  const [load, setLoad] = useState(false);
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
      console.log(mensagens);

      const element = (
        <ChatComponent
          mensagens={mensagens.mensagens}
          isAluno
          socket={socket}
          chatId={mensagens.chatId}
        />
      );

      ReactDOM.render(element, document.getElementById('chat'));
    });
  }

  function efetuarPagamento() {
    history.push(`/aluno/financeiro`);
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

  async function cancelarAgendamento() {
    const resultado = window.confirm('Você deseja realmente cancelar?');
    if (resultado) {
      await api
        .put(`/agendamento/status`, {
          agendamento_id: agendamentos.agendamento.id,
          status: 4,
        })
        .then(() => {
          toast.success('Agendamento cancelado');
          setLoad(true);
        })
        .catch(() => {
          toast.error('Não foi possível carregar o agendamento');
        });
    }
  }

  useEffect(() => {
    getInfo();
  }, [load]);

  return (
    <div id="info-professor-agendamentos" className="container">
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
            <h3>Status Agendamento:</h3>
            {agendamentos.agendamento.status === 0 && <span> Agendado</span>}
            {agendamentos.agendamento.status === 1 && <span> Confirmado </span>}
            {agendamentos.agendamento.status === 2 && (
              <span> Em processo </span>
            )}
            {agendamentos.agendamento.status === 3 && <span> Concluido </span>}
            {agendamentos.agendamento.status === 4 && <span> Cancelado </span>}
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
                agendamentos.pagamento.statusPagamento === 2 ||
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
                Abrir no navegador
              </Button>
            </div>
          </div>

          <br />
          <br />

          {agendamentos.agendamento.status !== 4 && (
            <div>
              <h3>Alinhe algumas expectativas</h3>

              <div className="chat">
                <textarea
                  rows={10}
                  cols={30}
                  onChange={e => setChatStartText(e.target.value)}
                />
                <Button name="enviarMsg" onClick={() => startChat()}>
                  Enviar Mensagem
                </Button>
              </div>

              <Button name="abrirChat" onClick={() => startChat()}>
                Abrir Chat
              </Button>
            </div>
          )}

          <br />
          <hr />
        </fieldset>

        <footer>
          <p>Alinhe suas expectativas e fique de olho no horário!</p>
          {agendamentos.agendamento.status !== 4 && (
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
