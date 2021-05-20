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
  function findDisciplina() {
    disciplina.filter(value => {
      if (value.titulo.toLocaleLowerCase() === find.toLocaleLowerCase()) {
        listagem.push(value);
      }

      value.tag.filter(tags => {
        const newTag = tags.replace(/\s/g, '');
        if (newTag === find) {
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
        // console.log(response.data);
        setDisciplina(response.data);
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
            <div id="searchButton">
              <Input
                // label="Find"
                name="name"
                maxLength={255}
                value={find || ''}
                onChange={e => setFind(e.target.value.toLocaleLowerCase())}
              />
              <button type="button" id="clear" onClick={clearFind}>
                Clear
              </button>
              <button type="button" onClick={findDisciplina}>
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
            Importante! <br />
            Preencha todos os dados
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
