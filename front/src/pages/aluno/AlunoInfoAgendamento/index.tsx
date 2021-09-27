import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast'; // Toast
import { parseISO, format } from 'date-fns';
import { Location } from 'history';
import { useLocation } from 'react-router-dom';
import { string } from 'yup';
import PageHeader from '../../../components/PageHeader';
import backgroundImg from '../../../assets/images/success-background.svg';

import './styles.scss';
import api from '../../../services/api';
import Input from '../../../components/Input';
import Button from '../../../components/Button';

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

  const [link, setLink] = useState('');
  const [load, setLoad] = useState(false);

  const location = useLocation();

  const valor = (location.state as Props) || {};

  // console.log(valor.agendamento_id);

  async function getLink() {
    navigator.clipboard.writeText(agendamentos.agendamento.link);
    toast.success('Link copiado!');
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
            <span>Valor: {agendamentos.pagamento.valor} </span>
            <span>
              Status Pagamento:
              {agendamentos.pagamento.statusPagamento === 0 && (
                <b> Em espera </b>
              )}
              {agendamentos.pagamento.statusPagamento === 1 && (
                <b> Processando </b>
              )}
              {agendamentos.pagamento.statusPagamento === 2 && <b> Negado </b>}
              {agendamentos.pagamento.statusPagamento === 3 && (
                <b> Cancelado </b>
              )}
              {agendamentos.pagamento.statusPagamento === 4 && (
                <b> Concluido </b>
              )}
            </span>
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
                COPIAR
              </Button>
            </div>
          </div>

          <br />
          <br />
          <h3>Alinhe algumas expectativas</h3>
          <div className="chat">
            <span>Chat</span>
          </div>
          <br />
          <hr />
        </fieldset>

        <footer>
          <p>Alinhe suas expectativas e fique de olho no horário!</p>
        </footer>
      </main>
    </div>
  );
};

export default AlunoInfoAgendamentos;
