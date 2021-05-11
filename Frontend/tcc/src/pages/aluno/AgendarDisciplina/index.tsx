import React, { FormEvent, useEffect, useState } from 'react';

import 'moment/locale/pt-br';
import { DatePicker, DatePickerInput } from 'rc-datepicker';

// import DayPickerInput from 'react-day-picker/DayPickerInput';
import { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import toast, { Toaster } from 'react-hot-toast';
// import Calendar from 'react-calendar';
// import moment from 'moment';
import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';
import PageHeader from '../../../components/PageHeader';
import backgroundImg from '../../../assets/images/success-background.svg';

// calender
// import 'react-calendar/dist/Calendar.css';

import './styles.scss';
import Input from '../../../components/Input';
import Select from '../../../components/Select';
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
      diaSemana: string;
      horarioEntrada: string;
      horarioSaida: string;
    },
  ];
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
  const [dia, setDia] = useState(0);

  const date = '2015-06-26';

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

  function handleCreateProfile(e: FormEvent) {
    alert('teste');
  }

  const [dateState, setDateState] = useState(new Date());
  const changeDate = (e: any) => {
    setDateState(e);
  };

  const FORMAT = 'MM/dd/yyyy';

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
              <br />
              <div id="btn-agendar">
                <DatePickerInput
                  onChange={e => setDia(e.getDay())}
                  value={date}
                  className="my-custom-datepicker-component"
                />

                <Input
                  name="saida"
                  // label="Até"
                  value={hora}
                  mask="money"
                  maxLength={2}
                  onChange={e => setHora(e.target.value)}
                  required
                />
              </div>
              <button type="submit">Agendar</button>
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
