import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast'; // Toast
import { useAuth } from '../../../hooks/auth';

import PageHeader from '../../../components/PageHeader';
import backgroundImg from '../../../assets/images/success-background.svg';

import Input from '../../../components/Input';

import './styles.scss';
import api from '../../../services/api';

interface IResponse {
  id: string;
  titulo: string;
  tag: string[];
  descricao: string;
  valor: string;
}

const ProfessorListDisciplina: React.FC = () => {
  const history = useHistory();
  const { user } = useAuth();

  const listagem: IResponse[] = [];
  const [find, setFind] = useState('');

  const [disciplina, setDisciplina] = useState<IResponse[]>([]);

  // Find disciplina
  function findDisciplina(finds: string) {
    disciplina.filter(async value => {
      if (value.titulo.toLocaleLowerCase() === finds.toLocaleLowerCase()) {
        listagem.push(value);
      }

      value.tag.filter(tags => {
        const newTag = tags.replace(/\s/g, '');
        if (newTag.toLowerCase() === finds.toLocaleLowerCase()) {
          listagem.push(value);
        }
        return '';
      });

      return '';
    });

    if (listagem.length !== 0) {
      setDisciplina(listagem);
    } else {
      listDisciplinas();
      listagem.length = 0;
    }
  }

  function clearFind() {
    setFind('');
    listDisciplinas();
  }

  // Listar todas as disciplinas do Professor
  useEffect(() => {
    listDisciplinas();
  }, []);

  function listDisciplinas() {
    api
      .get('disciplina/list/prof')
      .then(response => {
        const disciplinas = response.data;

        setDisciplina(
          disciplinas.sort(function (list: IResponse, list2: IResponse) {
            const a = list.titulo.toUpperCase();
            const b = list2.titulo.toUpperCase();
            // return a === b ? 0 : a > b ? 1 : -1;
            if (a === b) {
              return 0;
            }
            if (a > b) {
              return 1;
            }
            return -1;
          }),
        );
      })
      .catch(() => {
        toast.error('Não foi possível carregar as disciplinas');
      });
  }

  function select(disciplina_id: string) {
    history.push({
      pathname: '/prof-up-disciplina',
      // search: '?query=abc',
      state: { flag: true, disciplina_id },
    });
  }

  function deleted(disciplina_id: string) {
    console.log(disciplina_id);

    api
      .delete(`disciplina/delete/${disciplina_id}`)
      .then(() => {
        toast.success('Disciplina excluída');
        listDisciplinas();
      })
      .catch(() => {
        toast.error('Não foi possível carregar as disciplinas');
      });
  }

  return (
    <div id="list-disciplina-professor" className="container">
      <Toaster />
      <PageHeader
        page="Diciplinas"
        background={backgroundImg}
        home="/prof-home"
      >
        <div className="profile-header">
          <h2>Essas são todas as suas disciplinas</h2>
        </div>
        <p>Aqui iremos mostrar todas as disciplinas cadastradas em seu nome</p>
      </PageHeader>

      <main>
        <fieldset>
          <div id="list-info">
            <p>
              Filtre por título ou por tag que melhor se encaixe com o que
              procura
            </p>
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
              <div key={list.id} id="card">
                <h2>{list.titulo}</h2>

                <div>
                  <h4>Tags:</h4>
                  <p>
                    {list.tag.map(t => (
                      <i key={t.toString()}>{t.toString()},&nbsp;</i>
                    ))}
                  </p>
                </div>

                <h4>Descrição:</h4>
                <p id="desc">{list.descricao}</p>

                <div>
                  <h4>Valor: R$ {list.valor} /hora</h4>
                </div>

                <div id="btns">
                  <button type="button" onClick={() => select(list.id)}>
                    Alterar
                  </button>

                  <button type="button" onClick={() => deleted(list.id)}>
                    Deletar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </fieldset>

        <footer>
          <p>
            Selecione alguma opção para poder alterar ou crie uma nova
            disciplina.
          </p>

          <Link to="/prof-cad-disciplina">
            <button type="button">Nova disciplina</button>
          </Link>
        </footer>
      </main>
    </div>
  );
};

export default ProfessorListDisciplina;

/*
Formas de mandar parametros

history.push({
          pathname: '/secondpage',
          search: '?query=abc',
          state: { detail: 'some_value' }
      });

    <Link
              to={{
                pathname: '/prof-cad-disciplina',
                state: { variaveis: 'Id dessa porra', flag: true },
              }}
            >


*/

/*
//Teste 2
const titulo = disciplina.map(procura => {
      return procura.titulo === find ? add(procura) : 0;
    });

    function add(value: IResponse) {
      listagem.push(value);
    }

    if (listagem.length >= 1) {
      setDisciplina(listagem);
    }

    if (titulo[0] === 0) {
      listDisciplinas();
    }
*/
