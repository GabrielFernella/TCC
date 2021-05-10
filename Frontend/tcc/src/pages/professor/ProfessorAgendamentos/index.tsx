import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast'; // Toast
import PageHeader from '../../../components/PageHeader';
import backgroundImg from '../../../assets/images/success-background.svg';

import './styles.scss';
import api from '../../../services/api';

interface IResponse {
  id: string;
  date: Date;
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

const ProfessorAgendamentos: React.FC = () => {
  const [agendamentos, setAgendamentos] = useState<IResponse[]>([]);

  // Carregar todas as disciplinas
  useEffect(() => {
    api
      .get('disciplina/list')
      .then(response => {
        // console.log(response.data);
        setAgendamentos(response.data);
      })
      .catch(() => {
        toast.error('Não foi possível carregar os agendamentos');
      });
  }, []);

  function select(disciplina_id: string) {
    toast.success(`Você escolheu uma opção:  ${disciplina_id}`);
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
          <div id="list-info">
            {agendamentos.map(list => (
              <div key={list.id} id="card">
                <h2>Disciplina: {list.disciplina.titulo}</h2>
                <h2>Data: {list.date}</h2>
                <h2>Aluno: {list.aluno.nome}</h2>

                <div>
                  <h4>Tags:</h4>
                  <p>
                    {list.disciplina.tag.map(t => (
                      <i key={t.toString()}>{t.toString()},&nbsp;</i>
                    ))}
                  </p>
                </div>

                <h4>Descrição:</h4>
                <p id="desc">{list.disciplina.descricao}</p>

                <div>
                  <h4>Valor: R$ {list.disciplina.valor} /hora</h4>
                </div>

                <button
                  type="button"
                  onClick={() => select(list.disciplina.titulo)}
                >
                  Alterar
                </button>

                <button type="button" onClick={() => select(list.id)}>
                  Deletar
                </button>
              </div>
            ))}
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

export default ProfessorAgendamentos;
