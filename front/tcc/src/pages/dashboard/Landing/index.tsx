import React from 'react';
import { Link } from 'react-router-dom';
import landingImg from '../../../assets/images/landing.svg';
import studyIcon from '../../../assets/images/icons/study.svg';
import giveClassesIcon from '../../../assets/images/icons/give-classes.svg';
import './styles.scss';
import LogoContainer from '../../../components/LogoContainer';

const Landing: React.FC = () => {
  // const [totalConnections, setTotalConnections] = useState(0);

  return (
    <div>
      <div id="page-landing">
        <div id="page-landing-content" className="container">
          <LogoContainer background={false} />

          <img
            src={landingImg}
            alt="Plataforma de estudos"
            className="hero-image"
          />

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

          <span className="total-connections">
            Venha se juntar a centenas de alunos e professores e faça parte
            dessa equipe.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Landing;
