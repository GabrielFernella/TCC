import React, { FormEvent, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

import PageHeader from '../../../components/PageHeader';
import Input from '../../../components/Input';
import Textarea from '../../../components/Textarea';
import api from '../../../services/api';
// import { useAuth } from '../../../hooks/auth';
import warningIcon from '../../../assets/images/icons/warning.svg';
import backgroundImg from '../../../assets/images/success-background.svg';

import './styles.scss';

interface IDisciplina {
  id: string;
  titulo: string;
  tag: [];
  descricao: string;
  valor: string;
}

interface IProps {
  location: {
    state: {
      flag: boolean;
      disciplina_id: string;
    };
  };
}

const ProfessorUpdateDisciplina: React.FC<IProps> = (props: IProps) => {
  const history = useHistory();

  // Deve ser alterado
  const [titulo, setTitulo] = useState('');
  const [tag, setTag] = useState<string[]>([]);
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');

  const [id, setId] = useState('');
  const [flagin, setFlagin] = useState(false);
  const [updateDisciplina, setUpdateDisciplina] = useState<IDisciplina>();
  // Fazendo um Update se for necessário
  useEffect(() => {
    const { flag, disciplina_id } = props.location.state;
    setFlagin(flag);
    setId(disciplina_id);
    console.log(flag, disciplina_id);

    syncProperties(flag, disciplina_id);
  }, []);

  const syncProperties = async (flag: boolean, disc_id: string) => {
    if (flag) {
      if (flag === true) {
        await api
          .get(`disciplina/find/${disc_id}`, {
            headers: {
              disciplina_id: disc_id,
            },
          })
          .then(response => {
            setUpdateDisciplina(response.data);
            setId(response.data.id);
            setTitulo(response.data.titulo);
            setTag(response.data.tag);
            setDescricao(response.data.descricao);
            setValor(response.data.valor);
          })
          .catch(() => {
            toast.error('Não foi possível identificar suas disponibilidades');
          });
      }
    } else {
      toast.error(
        'Nenhuma Flag passada por parâmetro ou flag inválida, volte a lista e tente novamente ',
      );
      history.push('/prof-list-disciplina');
    }
  };

  // Chamando API de Update
  async function handleUpdateDisciplina(e: FormEvent) {
    e.preventDefault();

    const newValue = parseInt(valor.replace(/\D/g, ''), 10);

    await api
      .put('disciplina/update', {
        disciplina_id: id,
        titulo,
        tag,
        descricao,
        valor: newValue,
      })
      .then(() => {
        toast.success('Atualização realizada com sucesso!');
        history.push('/prof-list-disciplina');
      })
      .catch(() => {
        toast.error(
          'Não foi possível atualizar sua disciplina, tente novamente.',
        );
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
      <PageHeader
        page="Meu perfil"
        background={backgroundImg}
        home="/prof-home"
      >
        <div className="profile-header">
          <h2>Mostre para seus alunos do que você manja!</h2>
          <p>Adicione aqui a disciplina que deseja atuar.</p>
        </div>
      </PageHeader>

      <main>
        <form onSubmit={handleUpdateDisciplina}>
          <fieldset>
            <legend>Dados Disciplina</legend>
            <div id="disciplina-content">
              <div id="titulo-info">
                <Input
                  required
                  label="Disciplina"
                  name="disciplina"
                  placeholder={updateDisciplina?.titulo}
                  value={titulo || ''}
                  onChange={e => setTitulo(e.target.value)}
                />
              </div>

              <div id="tag-info">
                <Input
                  required
                  label="Tag"
                  name="tag"
                  placeholder={updateDisciplina?.tag.toString()}
                  value={tag || ''}
                  onChange={e => {
                    changeHandler(e, e.target.value);
                  }}
                />
              </div>

              <div id="descricao-info">
                <Textarea
                  required
                  label="Descricao"
                  name="descricao"
                  placeholder={updateDisciplina?.descricao}
                  value={descricao || ''}
                  onChange={e => setDescricao(e.target.value)}
                />
              </div>

              <div id="valor-info">
                <Input
                  required
                  label="Valor"
                  name="valor"
                  placeholder={updateDisciplina?.valor}
                  value={valor || ''}
                  mask="moeda"
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

export default ProfessorUpdateDisciplina;
