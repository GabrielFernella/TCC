import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast'; // Toast
import PageHeader from '../../../components/PageHeader';
import backgroundImg from '../../../assets/images/success-background.svg';

import './styles.scss';
// import api from '../../../services/api';

interface IResponse {
  id: string;
  date: string;
  link: string;
  status: string;
  nota: string;
  opiniao: string;

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
    nome?: string;
    avatar?: string;
    email?: string;
  };
  disponibilidade: [
    {
      id: string;
      diaSemana: string;
      horarioEntrada: string;
      horarioSaida: string;
    },
  ];
}

const AlunoAgendamentos: React.FC = () => {
  const [agendamentos, setAgendamentos] = useState<IResponse>({
    id: '101010',
    date: '20/10/2021',
    link: 'http://link.com',
    nota: '10',
    opiniao: 'Aula muito legal',
    status: 'pendente',
    disciplina: {
      id: '66666',
      titulo: 'guitar',
      tag: ['teste', 'teste'],
      descricao: 'string',
      valor: '100',
    },
    professor: {
      id: 'string',
      nome: 'string',
      avatar: 'string',
      email: 'string',
    },
    aluno: {
      id: 'string',
      nome: 'Fulano da silva',
      avatar: 'string',
      email: 'string',
    },
    disponibilidade: [
      {
        id: 'string',
        diaSemana: 'string',
        horarioEntrada: 'string',
        horarioSaida: 'string',
      },
    ],
  });

  // const teste: IResponse =

  // Carregar todas as disciplinas
  useEffect(() => {
    /* api
      .get('disciplina/list')
      .then(response => {
        // console.log(response.data);
        setAgendamentos(response.data);

      })
      .catch(() => {
        toast.error('Não foi possível carregar os agendamentos');
      }); */
    // setAgendamentos(teste);
  }, []);

  function alterColor(value: string) {
    if (value === 'pendente') {
      return { color: '#6C3CDD' };
    }
    if (value === 'cancelado') {
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
        home="/aluno-home"
      >
        <div className="profile-header">
          <h2>Essas são todos os seus agendamentos</h2>
        </div>
      </PageHeader>

      <main>
        <fieldset>
          <div id="list-info">
            <div key={agendamentos.id} id="card">
              <div className="states">
                <h2>Data: {agendamentos.date}</h2>&ensp;&ensp;
                <h2>
                  Status:
                  <span style={alterColor(agendamentos.status)}>
                    {agendamentos.status}
                  </span>
                </h2>
              </div>

              <h3>Disciplina: {agendamentos.disciplina.titulo}</h3>
              <h3>Aluno: {agendamentos.aluno.nome}</h3>

              <h3>Link de acesso: {agendamentos.link}</h3>

              <h3>Valor: R$ {agendamentos.disciplina.valor} /hora</h3>

              <div className="buttons">
                {agendamentos.status === 'pendente' ? (
                  <button
                    type="button"
                    id="aceitar"
                    onClick={() => aceitar(agendamentos.disciplina.titulo)}
                  >
                    Aceitar
                  </button>
                ) : null}

                <button
                  type="button"
                  id="alterar"
                  onClick={() => select(agendamentos.disciplina.titulo)}
                >
                  Visualizar
                </button>

                {agendamentos.status === 'pendente' ? (
                  <button
                    type="button"
                    id="deletar"
                    onClick={() => cancelar(agendamentos.disciplina.titulo)}
                  >
                    Cancelar
                  </button>
                ) : null}
              </div>
            </div>
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

export default AlunoAgendamentos;
