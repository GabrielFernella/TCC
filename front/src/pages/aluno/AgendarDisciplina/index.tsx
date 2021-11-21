import React, { useEffect, useState } from 'react';

import 'moment/locale/pt-br';
import './styles.scss';
import { useHistory } from 'react-router-dom';

import toast, { Toaster } from 'react-hot-toast';

import PageHeader from '../../../components/PageHeader';
import backgroundImg from '../../../assets/images/success-background.svg';

import Input from '../../../components/Input';
import api from '../../../services/api';
import Button from '../../../components/Button';
import { useAuth } from '../../../hooks/auth';

/*
  TODO: Fazer
  1. pegar a listagem de horas da API
  2. Realizar agendamento com os parametros
  3. Limpar funções 
  4. Alinhar a parte de listagem de agedamento
  5. Cancelamento de agendamento 
  6. Envio de Email para o aluno
  
  */

interface IProps {
  location: {
    state: {
      dados: IResponse;
    };
  };
}

interface IAvaliations {
  opinioes: [];
  nota: number;
}

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
      horarioEntrada: number;
      horarioSaida: number;
    },
  ];
}

const ListDisciplina: React.FC<IProps> = (props: IProps) => {
  const { user } = useAuth();
  const history = useHistory();

  const [data, setData] = useState<IResponse>();
  const [hora, setHora] = useState(0);

  const [date, setDate] = useState(new Date());

  const [listData, setListData] = useState([{ hora: 0, disp: false }]);
  const [avaliation, setAvaliation] = useState<IAvaliations>({
    opinioes: [],
    nota: 0,
  });

  const [dateState, setDateState] = useState(`${new Date()}`);

  useEffect(() => {
    try {
      const { dados } = props.location.state;
      getAvaliation(dados.disciplina.id);

      setData(dados);
      getDisponibilidadeDate(dateState);
    } catch (error) {
      toast.error(
        'Parametros não puderam ser carregados, volte a pagina e tente novamente',
      );
    }
  }, []);

  useEffect(() => {
    getDisponibilidadeDate(dateState);
  }, [dateState]);

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
        return 'Inválid';
    }
  }

  function createDate(dateProps: string): string {
    const teste = new Date(`${dateProps}T00:00:00-03:00`);

    const newvalue = `${teste.getDate()}-${
      teste.getMonth() + 1
    }-${teste.getFullYear()}`;

    return `${newvalue}`;
  }

  async function getDisponibilidadeDate(value: string) {
    await api
      .post('agendamento/prof-horas', {
        data: value,
        professor_id: data?.professor.id,
      })
      .then(response => {
        // toast.success('Cadastro realizado com sucesso!');
        setListData(response.data);
      })
      .catch(error => {
        setListData([{ disp: false, hora: 0 }]);
      });
  }

  async function getAvaliation(disciplina_id: string) {
    await api
      .get(`disciplina/avaliation/${disciplina_id}`)
      .then(response => {
        // toast.success('Cadastro realizado com sucesso!');
        setAvaliation(response.data);
      })
      .catch(error => {
        setAvaliation({ opinioes: [], nota: 0 });
      });
  }

  async function handleAgendamento() {
    const parseDate = dateState.split('-');

    const newDate = new Date(
      Number(parseDate[2]),
      Number(parseDate[1]) - 1,
      Number(parseDate[0]),
    );
    await api
      .post('agendamento/create', {
        data: newDate,
        entrada: hora,
        professor_id: data?.professor.id,
        aluno_id: user.id,
        disciplina_id: data?.disciplina.id,
      })
      .then(response => {
        toast.success('Agendamento realizado com sucesso!');
        history.push('/list-disciplina');
      })
      .catch(err => {
        toast.error(`${err.response.data.message}`);
        setListData([{ disp: false, hora: 0 }]);
      });
  }

  return (
    <div id="page-agendar-disciplina" className="container">
      <Toaster />
      <PageHeader
        page="Agendar Disciplina"
        background={backgroundImg}
        home="/aluno-home"
      >
        <div className="profile-header">
          <h2>Verifique as disponibilidades desta disciplina!</h2>
          <h3>
            Você está prestes a conhecer uma forma de impulsiona sua carreira.
          </h3>
        </div>
      </PageHeader>

      <main>
        {data ? (
          <div className="disciplina-info">
            <h2>{data.disciplina.titulo}</h2>

            <div className="disciplina">
              <img src={data.professor.avatar} alt="AvatarProfessor" />

              <p>
                <b>Professor:</b> {data.professor.nome}
              </p>

              <p>
                <b>Tags:</b> {data.disciplina.tag.map(item => `${item}, `)}
              </p>

              <p>
                <b>Descrição:</b> {data.disciplina.descricao}
              </p>

              <p>
                <b>Valor:</b> R${data.disciplina.valor}/hora
              </p>

              <br />

              <b>Disponibilidades:</b>

              <div className="disponibilidades">
                {data?.disponibilidade.map(list => (
                  <div key={list.id} className="dia-disponibilidade">
                    <h4>{validateDay(list.diaSemana)}</h4>
                    <p>
                      das {list.horarioEntrada || '00'}h até{' '}
                      {list.horarioSaida || '00'}h
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="avaliation">
              <h4>Opiniões de outros alunos</h4>
              <div className="lsitAvaliation">
                {avaliation.opinioes.length === 0 && (
                  <span>Nenhuma nota anterior cadastrada</span>
                )}
                {avaliation.opinioes.map(item => (
                  <>
                    <li>{item}</li>
                  </>
                ))}
              </div>
              <br />
              <h4>Média de notas: {avaliation.nota}/5</h4>
            </div>

            <div className="agendar">
              <div>
                <h4>Selecione uma data:</h4>
                <Input
                  name="data"
                  type="date"
                  // value={dateState.dia.toDateString()}
                  onChange={e => {
                    setDateState(createDate(e.target.value));
                    console.log(e.target.value);
                  }}
                />
              </div>

              {listData.length !== 1 ? (
                <div className="hours">
                  {listData.map(item => (
                    <button
                      type="button"
                      className={item.disp === false ? 'disable' : 'null'}
                      onClick={() => setHora(item.hora)}
                    >
                      {item.hora}h
                    </button>
                  ))}
                </div>
              ) : (
                <span>Nenhum horário disponível para esse dia</span>
              )}
            </div>

            <div className="confirmar">
              <div>
                {listData.length === 1 &&
                listData[0].disp === false &&
                listData[0].hora === 0 ? (
                  <h4>Nenhum horário selecionado</h4>
                ) : (
                  <h4>
                    Agendar para: {dateState} das {hora}h até {hora + 1}h
                  </h4>
                )}

                <span />
              </div>
              <Button name="submit" onClick={handleAgendamento}>
                Agendar
              </Button>
            </div>
          </div>
        ) : (
          <h1>Volte para a tela anterior para selecionar uma disciplina</h1>
        )}
        <footer>
          <p>
            Selecione uma das disciplinas e veja a disponibilidade para
            agendamento!
            <br /> <br />
            Importante! <br />A hora aula equivale a 50 ou 55 min dependendo da
            preferencia do professor
          </p>
        </footer>
      </main>
    </div>
  );
};

export default ListDisciplina;
