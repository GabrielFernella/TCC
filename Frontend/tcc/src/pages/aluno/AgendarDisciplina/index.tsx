import React, { FormEvent, useState } from 'react';

import DayPickerInput from 'react-day-picker/DayPickerInput';
import { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
// import Calendar from 'react-calendar';
// import moment from 'moment';
import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';
import PageHeader from '../../../components/PageHeader';
import backgroundImg from '../../../assets/images/success-background.svg';

// calender
import 'react-calendar/dist/Calendar.css';

import './styles.scss';
import Input from '../../../components/Input';
import Select from '../../../components/Select';

function parseDate(dateString: string, format: string, locale: string) {
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

/*
formatDate?: (date: Date, format: string, locale: string) => string;
  parseDate?: (str: string, format: string, locale: string) => Date | void;

*/

const ListDisciplina: React.FC = () => {
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
      <PageHeader page="Agendar Disciplina" background={backgroundImg}>
        <div className="profile-header">
          <h2>Saiba mais sobre as disciplinas disponíveis!</h2>
          <h3>
            Você está a alguém passos de conhecer alguém que possa impulsionar
            sua carreira
          </h3>
        </div>
      </PageHeader>

      <main>
        <form onSubmit={handleCreateProfile}>
          <fieldset>
            <div id="disciplina">
              <h2>Computação em Nuvem</h2>

              <h3> + Gabriel Oliveira Santos</h3>

              <div>
                <h4>Tags:</h4>
                <p>tags</p>
              </div>

              <h4>Descrição:</h4>
              <p id="desc">
                Nós aproveitamos o poder da mudança para criar novo e
                extraordinário valor, colocando cloud no coração dos seus
                negócios. Nossa abordagem põe as necessidades da sua empresa em
                primeiro lugar. Desenvolvemos soluções específicas de indústria
                para que você migre para a nuvem e usufrua dela agora.
              </p>

              <div>
                <h3>Valor: R$ 30 /hora</h3>
              </div>
            </div>
            <div className="agendar">
              <h3>Disponibilidades:</h3>
              <div id="dia-disponibilidade">
                <div>
                  <h4>Segunda</h4>
                  <p>das 14h até 19h</p>
                </div>
                <div>
                  <h4>Terça</h4>
                  <p>das 14h até 19h</p>
                </div>
                <div>
                  <h4>Segunda</h4>
                  <p>das 14h até 19h</p>
                </div>
                <div>
                  <h4>Terça</h4>
                  <p>das 14h até 19h</p>
                </div>
                <div>
                  <h4>Segunda</h4>
                  <p>das 14h até 19h</p>
                </div>
                <div>
                  <h4>Terça</h4>
                  <p>das 14h até 19h</p>
                </div>
                <div>
                  <h4>Segunda</h4>
                  <p>das 14h até 19h</p>
                </div>
                <div>
                  <h4>Terça</h4>
                  <p>das 14h até 19h</p>
                </div>
              </div>
              <div id="btn-agendar">
                <DayPickerInput
                  formatDate={formatDate}
                  format={FORMAT}
                  parseDate={parseDate}
                  placeholder={`${dateFnsFormat(new Date(), FORMAT)}`}
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
