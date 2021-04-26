import React, { FormEvent, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { FormHandles } from '@unform/core';
import PageHeader from '../../../components/PageHeader';
import Input from '../../../components/Input';
import Textarea from '../../../components/Textarea';
import warningIcon from '../../../assets/images/icons/warning.svg';
import './styles.scss';
import backgroundImg from '../../../assets/images/success-background.svg';
import api from '../../../services/api';
import { useAuth } from '../../../hooks/auth';

function Disciplina() {
  const history = useHistory();
  const auth = useAuth();

  // Deve ser alterado
  const [titulo, setTitulo] = useState('');
  const [tag, setTag] = useState<string[]>([]);
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');

  // Chamando a API Cadastro
  async function handleCreateDisciplina(e: FormEvent) {
    e.preventDefault();

    const newValue = parseInt(valor, 10);
    console.log(`Bearer ${localStorage.getItem('@WebEduca:token')}`);
    console.log(`${auth.user.name}`);

    await api
      .post('disciplina/create', {
        titulo,
        tag,
        descricao,
        valor: newValue,
      })
      .then(() => {
        alert('Cadastro realizado com sucesso');

        history.push('/');
      })
      .catch(() => {
        alert('Erro no cadastro');
      });
  }

  // Adicionando Tags
  const changeHandler = (e: FormEvent, value: string) => {
    e.preventDefault();

    const resultado = value.split(',');
    setTag(resultado);
  };

  return (
    <div id="page-disciplina" className="container">
      <PageHeader page="Meu perfil" background={backgroundImg}>
        <div className="profile-header">
          <h2>Mostre para seus alunos do que você manja!</h2>
          <p>Adicione aqui a disciplina que deseja atuar.</p>
        </div>
      </PageHeader>

      <main>
        <form onSubmit={handleCreateDisciplina}>
          <fieldset>
            <legend>Dados Disciplina</legend>
            <div id="disciplina-content">
              <div id="titulo-info">
                <Input
                  label="Disciplina"
                  name="disciplina"
                  value={titulo || ''}
                  onChange={e => setTitulo(e.target.value)}
                />
              </div>

              <div id="tag-info">
                <Input
                  label="Tag"
                  name="tag"
                  value={tag || ''}
                  onChange={e => {
                    changeHandler(e, e.target.value);
                  }}
                />
              </div>

              <div id="descricao-info">
                <Textarea
                  label="Descricao"
                  name="descricao"
                  value={descricao || ''}
                  onChange={e => setDescricao(e.target.value)}
                />
              </div>

              <div id="valor-info">
                <Input
                  label="Valor"
                  name="valor"
                  value={valor || ''}
                  pattern="[0-9]*"
                  onChange={e => setValor(e.target.value)}
                />
              </div>
            </div>
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
              Importante! <br />
              Preencha todos os dados
            </p>
            <button type="submit">Salvar disciplina</button>
          </footer>
        </form>
      </main>
    </div>
  );
}

export default Disciplina;
