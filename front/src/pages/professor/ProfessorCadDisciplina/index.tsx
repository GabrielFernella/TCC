import React, { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';

// recursos
import toast, { Toaster } from 'react-hot-toast'; // Toast

import PageHeader from '../../../components/PageHeader';
import Input from '../../../components/Input';
import Textarea from '../../../components/Textarea';
import api from '../../../services/api';
// import { useAuth } from '../../../hooks/auth';
import warningIcon from '../../../assets/images/icons/warning.svg';
import backgroundImg from '../../../assets/images/success-background.svg';

import './styles.scss';

const Disciplina: React.FC = () => {
  const history = useHistory();

  // Deve ser alterado
  const [titulo, setTitulo] = useState('');
  const [tag, setTag] = useState<string[]>([]);
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');

  // Chamando a API Cadastro
  async function handleCreateDisciplina(e: FormEvent) {
    e.preventDefault();

    if (titulo && tag && descricao && valor) {
      const newValue = parseInt(valor.replace(/\D/g, ''), 10);

      await api
        .post('disciplina/create', {
          titulo,
          tag,
          descricao,
          valor: newValue,
        })
        .then(() => {
          toast.success('Disciplina cadastrada com sucesso!');
          // setInterval(toast, 1000);
          history.push('/prof-list-disciplina');
        })
        .catch(() => {
          toast.error('Erro so cadastrar disciplina.');
        });
    } else {
      toast.error('Confira de todos os campos estão devidamente preenchidos.');
    }
  }

  // Adicionando Tags
  const changeHandler = (e: FormEvent, value: string) => {
    e.preventDefault();
    const resultado = value.split(',');
    setTag(resultado);
  };

  return (
    <div id="page-disciplina" className="container">
      <Toaster />
      <PageHeader
        page="Cadastro Disciplina"
        background={backgroundImg}
        home="/prof-home"
      >
        <div className="profile-header">
          <h2>Adicione aqui a disciplina que deseja ministrar</h2>
          <p>
            capriche na descrição quanto mais aulas vc adicionar na descrição,
            mais chance do aluno querer mais aulas suas.
          </p>
        </div>
      </PageHeader>

      <main>
        <form onSubmit={handleCreateDisciplina}>
          <fieldset>
            <legend>Cadastro Disciplina</legend>
            <div id="disciplina-content">
              <div id="titulo-info">
                <Input
                  required
                  label="Título disciplina *"
                  name="disciplina"
                  placeholder="Desenvolvimento"
                  value={titulo || ''}
                  onChange={e => setTitulo(e.target.value)}
                />
              </div>

              <div id="tag-info">
                <Input
                  required
                  label="Tag *"
                  name="tag"
                  placeholder="tag , tag (palavras chave relacionado a disciplina, separar por vírgula, não repetir)"
                  value={tag || ''}
                  onChange={e => {
                    changeHandler(e, e.target.value);
                  }}
                />
              </div>

              <div id="descricao-info">
                <Textarea
                  required
                  label="Descricao *"
                  name="descricao"
                  placeholder="Deixe aqui uma descrição bem detalhada da disciplina"
                  value={descricao || ''}
                  onChange={e => setDescricao(e.target.value)}
                />
              </div>

              <div id="valor-info">
                <Input
                  required
                  prefix="R$"
                  label="Valor *"
                  name="valor"
                  mask="moeda"
                  placeholder="R$ 30,00"
                  value={valor || ''}
                  onChange={e => {
                    setValor(
                      e.target.value
                        .replace(/\D/g, '')
                        .replace(/(\d)(\d{2})$/, '$1,$2')
                        .replace(/(?=(\d{3})+(\D))\B/g, '.'),
                    );
                  }}
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
};

export default Disciplina;
