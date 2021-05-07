import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast'; // Toast
import { useAuth } from '../../../hooks/auth';
import PageHeader from '../../../components/PageHeader';
import backgroundImg from '../../../assets/images/success-background.svg';

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

  const [teste, setTeste] = useState('Teste');
  const [disciplina, setDisciplina] = useState<IResponse[]>([]);

  // Carregar todas as disciplinas
  useEffect(() => {
    api
      .get('disciplina/list/prof')
      .then(response => {
        console.log(response.data);
        setDisciplina(response.data);
      })
      .catch(() => {
        toast.error('Não foi possível carregar as disciplinas');
      });
  }, []);

  function select(disciplina_id: string) {
    history.push({
      pathname: '/prof-cad-disciplina',
      // search: '?query=abc',
      state: { disciplina: disciplina_id },
    });
  }

  function deleted(disciplina_id: string) {
    console.log(disciplina_id);

    api
      .delete('disciplina/delete', {
        params: {
          disciplina_id,
        },
      })
      .then(() => {
        return toast.success('Disciplina excluída');
      })
      .catch(() => {
        return toast.error('Não foi possível carregar as disciplinas');
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
      </PageHeader>

      <main>
        <fieldset>
          <div id="list-info">
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

                <button type="button" onClick={() => select(list.id)}>
                  Alterar
                </button>

                <button type="button" onClick={() => deleted(list.id)}>
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
