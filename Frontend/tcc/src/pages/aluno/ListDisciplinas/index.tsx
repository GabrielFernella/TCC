import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import toast, { Toaster } from 'react-hot-toast'; // Toast
import PageHeader from '../../../components/PageHeader';
import backgroundImg from '../../../assets/images/success-background.svg';

import './styles.scss';
import api from '../../../services/api';

interface IResponse {
  disciplina: {
    id: string;
    titulo: string;
    tag: string[];
    descricao: string;
    valor: string;
  };
  professor: {
    id: string;
    nome: string;
    avatar: string;
    email: string;
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

const ListDisciplina: React.FC = () => {
  const history = useHistory();
  const [disciplina, setDisciplina] = useState<IResponse[]>([]);

  // Carregar todas as disciplinas
  useEffect(() => {
    api
      .get('disciplina/list')
      .then(response => {
        // console.log(response.data);
        setDisciplina(response.data);
      })
      .catch(() => {
        toast.error('Não foi possível carregar as disciplinas');
      });
  }, []);

  // Validações
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

  function select(dados: IResponse) {
    history.push({
      pathname: '/agendamento',
      // search: '?query=abc',
      state: { dados },
    });
  }

  return (
    <div id="page-teacher-profile" className="container">
      <Toaster />
      <PageHeader
        page="Diciplinas"
        background={backgroundImg}
        home="/aluno-home"
      >
        <div className="profile-header">
          <h2>Vamos estudar e se aperfeiçoar ainda mais!</h2>
          <p>Escolha uma das disciplinas</p>
        </div>
      </PageHeader>

      <main>
        <fieldset>
          <div id="list-info">
            {disciplina.map(list => (
              <div key={list.disciplina.id} id="card">
                <h2>{list.disciplina.titulo}</h2>

                <h3> + {list.professor.nome}</h3>

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

                <h4>Disponibilidades:</h4>
                <p>
                  {list.disponibilidade.map(dispo =>
                    validateDay(dispo.diaSemana),
                  )}
                </p>

                <div>
                  <h4>Valor: R$ {list.disciplina.valor} /hora</h4>
                </div>

                <button type="button" onClick={() => select(list)}>
                  Ver disponibilidade
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

export default ListDisciplina;
