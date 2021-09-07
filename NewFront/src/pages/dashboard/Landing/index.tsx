import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import api from '../../../services/api';
import landingImg from '../../../assets/images/landing.svg';
import studyIcon from '../../../assets/images/icons/study.svg';
import giveClassesIcon from '../../../assets/images/icons/give-classes.svg';
import LogoContainer from '../../../components/LogoContainer';

import { Container } from './styles';

const Landing: React.FC = () => {
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    api
      .get('notification/echo')
      .then(() => {
        toast.success('Server Connected');
      })
      .catch(() => {
        toast.error('Server disconnected');

        // 'Estamos com algum problema com a conexão dos nossos servidores, recarregue a página ou tente mais tarde.',
        setDisable(true);
      });
  }, []);

  return (
    <Container>
      <Toaster />

      <div id="page-landing">
        <div id="page-landing-content" className="container">
          <LogoContainer background={false} />

          <img
            src={landingImg}
            alt="Plataforma de estudos"
            className="hero-image"
          />

          {disable === true ? (
            <div className="buttons-container">
              <Link to="/" className="btnAluno">
                <img src={studyIcon} alt="Aluno" />
                Aluno
              </Link>
              <Link to="/" className="btnProfessor">
                <img src={giveClassesIcon} alt="Professor" />
                Professor
              </Link>
            </div>
          ) : (
            <div className="buttons-container">
              <Link to="/aluno-login" className="btnAluno">
                <img src={studyIcon} alt="Aluno" />
                Aluno
              </Link>
              <Link to="/prof-login" className="btnProfessor">
                <img src={giveClassesIcon} alt="Professor" />
                Professor
              </Link>
            </div>
          )}

          <span className="total-connections">
            Venha se juntar a centenas de alunos e professores e faça parte
            dessa equipe.
          </span>
        </div>
      </div>
    </Container>
  );
};

export default Landing;
