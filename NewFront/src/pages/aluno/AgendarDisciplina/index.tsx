import React, { FormEvent, useEffect, useState } from 'react';

import 'moment/locale/pt-br';
import './styles.scss';
import DatePicker from 'react-date-picker';

import toast, { Toaster } from 'react-hot-toast';

import PageHeader from '../../../components/PageHeader';
import backgroundImg from '../../../assets/images/success-background.svg';

import Input from '../../../components/Input';
import api from '../../../services/api';

interface IProps {
  location: {
    state: {
      dados: IResponse;
    };
  };
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

interface IDia {
  dia: Date;
}

/* function parseDate(dateString: string, format: string, locale: string) {
  const parsed = dateFnsParse(dateString, format, new Date());
  if (DateUtils.isDate(parsed)) {
    return parsed;
  }

  alert('parsed');
  return undefined;
}

function formatDate(date: Date, format: string, locale?: string) {
  return dateFnsFormat(date, format);
}


formatDate?: (date: Date, format: string, locale: string) => string;
  parseDate?: (str: string, format: string, locale: string) => Date | void;

*/

const ListDisciplina: React.FC<IProps> = (props: IProps) => {
  const [data, setData] = useState<IResponse>();
  const [hora, setHora] = useState('');
  const [dia, setDia] = useState<IDia>();

  const [value, onChange] = useState(new Date());

  useEffect(() => {
    try {
      const { dados } = props.location.state;

      setData(dados);
      console.log(dados);
    } catch (error) {
      toast.error(
        'Parametros não puderam ser carregados, volte a pagina e tente novamente',
      );
    }
  }, []);

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

  function handleCreateProfile(e: FormEvent) {
    alert('teste');
  }

  const [dateState, setDateState] = useState(new Date());
  const changeDate = (e: any) => {
    setDateState(e);
  };

  useEffect(() => {
    console.log(dia?.dia.getDay);
  }, [dia]);

  // 58 min
  // rever parte que mostra as disponibilidades
  return (
    <div id="page-agendar-disciplina" className="container">
      <Toaster />
      <PageHeader
        page="Agendar Disciplina"
        background={backgroundImg}
        home="/aluno-home"
      >
        <div className="profile-header">
          <h2>Verifique as disponibilidades desta disciplina e agende já!</h2>
          <h3>
            Você está a alguns passos de conhecer alguém que possa impulsionar
            sua carreira
          </h3>
        </div>
      </PageHeader>

      <main>
        <form onSubmit={handleCreateProfile}>
          <fieldset>
            <div id="disciplina">
              <h2>{data?.disciplina.titulo || 'Valor não encontrado'}</h2>

              <h3> + {data?.professor.nome || 'Valor não encontrado'}</h3>

              <div>
                <h4>Tags:</h4>
                <p>{data?.disciplina.tag || 'Valor não encontrado'}</p>
              </div>

              <h4>Descrição:</h4>
              <p id="desc">
                {data?.disciplina.descricao || 'Valor não encontrado'}
              </p>

              <div>
                <h3>Valor: R$ {data?.disciplina.valor || '0'} /hora</h3>
              </div>
            </div>
            <div className="agendar">
              <h3>Disponibilidades:</h3>
              <div id="dia-disponibilidade">
                {data?.disponibilidade.map(list => (
                  <div>
                    <h4>{validateDay(list.diaSemana)}</h4>
                    <p>
                      das {list.horarioEntrada || '00'}h até{' '}
                      {list.horarioSaida || '00'}h
                    </p>
                  </div>
                ))}
              </div>
              <br />

              <div id="btn-agendar">
                <Input
                  name="data"
                  type="date"
                  label="Data"
                  // onChange={e => console.log(e.target.value.substr(-2))}
                  // onChange={e => setDia(e.target.value)}
                />

                <Input
                  name="saida"
                  label="Até"
                  value={hora}
                  mask="money"
                  maxLength={2}
                  onChange={e => setHora(e.target.value)}
                />
              </div>
              <button className="button" type="submit">
                Agendar
              </button>
            </div>
          </fieldset>

          <footer>
            <p>
              Selecione uma das disciplinas e veja a disponibilidade para
              agendamento!
            </p>
          </footer>
        </form>
      </main>
    </div>
  );
};

export default ListDisciplina;

/*

<DayPickerInput
                  formatDate={formatDate}
                  format={FORMAT}
                  parseDate={parseDate}
                  placeholder={`${dateFnsFormat(new Date(), FORMAT)}`}
                /> */
