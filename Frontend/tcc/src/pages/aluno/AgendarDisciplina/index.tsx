import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import PageHeader from '../../../components/PageHeader';
import backgroundImg from '../../../assets/images/success-background.svg';

import './styles.scss';
import Input from '../../../components/Input';
import Select from '../../../components/Select';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
      text: {
        // Algum CSS
        color: 'white',
        fontSize: 34,
        size: 'medium',
      },
    },
  }),
);

function ListDisciplina() {
  function select() {
    alert('teste');
  }

  const classes = useStyles();
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
        <form onSubmit={ListDisciplina}>
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
                <form className={classes.container} noValidate>
                  <TextField
                    id="datetime-local"
                    label="Next appointment"
                    type="datetime-local"
                    defaultValue="2017-05-24T10:30"
                    size="medium"
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </form>
              </div>
              <button type="submit" onClick={select}>
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
}

export default ListDisciplina;
