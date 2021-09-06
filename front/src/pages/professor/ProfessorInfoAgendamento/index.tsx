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
}

interface Props {
  agendamento_id: string;
}

const ProfessorInfoAgendamentos = () => {
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
  });

  const [link, setLink] = useState('');
  const [load, setLoad] = useState(false);

  const location = useLocation();

  const valor = (location.state as Props) || {};

  // console.log(valor.agendamento_id);

  /* async function updateLink() {
    await api.put('/agendamento/status', {
      "agendamento_id": "bcde4cae-c633-435e-ab03-c023bc882e73",
      "status": 1
    })
  } */

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
        home="/prof-home"
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
            <h3>
              Status Agendamento:
              {agendamentos.agendamento.status === 0 && <span> Agendada</span>}
              {agendamentos.agendamento.status === 1 && (
                <span> Confirmada </span>
              )}
              {agendamentos.agendamento.status === 2 && (
                <span> Em processo </span>
              )}
              {agendamentos.agendamento.status === 3 && (
                <span> Concluida </span>
              )}
              {agendamentos.agendamento.status === 4 && (
                <span> Cancelada </span>
              )}
            </h3>

            <span>Aluno: {agendamentos.aluno.name}</span>
            <span>E-mail: {agendamentos.aluno.email}</span>
            <br />
            <span>Valor: {agendamentos.pagamento.valor} </span>
            <span>
              Status Pagamento:
              {agendamentos.pagamento.statusPagamento === 0 && (
                <span> Em espera </span>
              )}
              {agendamentos.pagamento.statusPagamento === 1 && (
                <span> Processando </span>
              )}
              {agendamentos.pagamento.statusPagamento === 2 && (
                <span> Negado </span>
              )}
              {agendamentos.pagamento.statusPagamento === 3 && (
                <span> Cancelado </span>
              )}
              {agendamentos.pagamento.statusPagamento === 4 && (
                <span> Concluido </span>
              )}
            </span>
            <br />
            <div className="link-access">
              <h3>Link de Acesso: </h3>
              <input
                type="text"
                value={link}
                onChange={e => setLink(e.target.value)}
              />
              <Button name="link" type="button">
                Atualizar
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
          <p>Alinhe suas expectativas e gerencia seus horários</p>
        </footer>
      </main>
    </div>
  );
};

export default ProfessorInfoAgendamentos;
