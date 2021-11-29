import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import toast, { Toaster } from 'react-hot-toast'; // Toast
import PageHeader from '../../../components/PageHeader';
import backgroundImg from '../../../assets/images/success-background.svg';

import './styles.scss';
import api from '../../../services/api';
import Input from '../../../components/Input';

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
      diaSemana: number;
      horarioEntrada: string;
      horarioSaida: string;
    },
  ];
}

const ListDisciplina: React.FC = () => {
  const history = useHistory();
  const [disciplina, setDisciplina] = useState<IResponse[]>([]);

  const listagem: IResponse[] = [];
  const [find, setFind] = useState('');

  // Carregar todas as disciplinas
  useEffect(() => {
    listDisciplinas();
  }, []);

  function listDisciplinas() {
    api
      .get('disciplina/list')
      .then(response => {
        const disciplinas = response.data;
        setDisciplina(
          disciplinas.sort((list: IResponse, list2: IResponse) => {
            const a = list.disciplina.titulo.toUpperCase();
            const b = list2.disciplina.titulo.toUpperCase();
            if (a > b) {
              return 1;
            }
            if (b > a) {
              return -1;
            }
            return 0;
          }),
        );
      })
      .catch(() => {
        toast.error('Não foi possível carregar as disciplinas');
      });
  }

  // Find disciplina
  function findDisciplina(finds: string) {
    disciplina.filter(value => {
      if (
        value.disciplina.titulo.toLocaleLowerCase() ===
        finds.toLocaleLowerCase()
      ) {
        listagem.push(value);
      } else {
        value.disciplina.tag.filter(tags => {
          // const newTag = tags.replace(/\s/g, ''); // Alterar para pegar o espaço antes do string
          const newTag = tags.trim();
          if (newTag.toLowerCase() === finds.toLocaleLowerCase()) {
            return listagem.push(value);
          }
          return '';
        });
      }

      return '';
    });

    if (listagem.length !== 0) {
      setDisciplina(listagem);
    } else {
      listDisciplinas();
    }
  }

  function clearFind() {
    setFind('');
    // setDisciplina([]);
    listDisciplinas();
  }

  // Validações
  function validateDay(day: number) {
    switch (day) {
      case 0:
        return 'Domingo';
      case 1:
        return 'Segunda-feira';
      case 2:
        return 'Terça-feira';
      case 3:
        return 'Quarta-feira';
      case 4:
        return 'Quinta-feira';
      case 5:
        return 'Sexta-feira';
      case 6:
        return 'Sábado';
      default:
        return 'Inválido';
    }
  }

  function select(dados: IResponse) {
    history.push({
      pathname: '/agendar',
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
          <h2>Faça seu cadastro e junte-se a outros professores!</h2>
          <p>Escolha uma disciplina</p>
        </div>
      </PageHeader>

      <main>
        <fieldset>
          <div id="list-info">
            <div id="searchButton">
              <Input
                // label="Find"
                name="name"
                maxLength={255}
                value={find || ''}
                onChange={e => setFind(e.target.value)}
              />
              <button type="button" id="clear" onClick={clearFind}>
                Limpar
              </button>
              <button type="button" onClick={() => findDisciplina(find)}>
                Procurar
              </button>
            </div>

            {disciplina.map(list => (
              <div key={list.disciplina.id} id="card">
                <h2>{list.disciplina.titulo}</h2>

                <h3>
                  <img src={list.professor.avatar} alt="" /> +{' '}
                  {list.professor.nome}
                </h3>

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
                  {list.disponibilidade.map(dispo => (
                    <span key={dispo.id}>
                      {validateDay(dispo.diaSemana)} &nbsp;{' '}
                    </span>
                  ))}
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
