import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import backIcon from '../../assets/images/icons/back.svg';
import leaveIcon from '../../assets/images/icons/leave.svg';
import logoImg from '../../assets/images/logoprincipal.png'; // logo.svg

import './styles.scss';
// import { AuthContext } from '../../contexts/auth';

interface TopBarContainerProps {
  profile?: boolean;
  title?: string;
  transparent?: boolean;
  // to?: string;
  home?: string;
}

/* function validPath(path?: string) {
  if (path) {
    return path;
  }
  return '/';
} */

function HomePath(home?: string) {
  if (home) {
    return home;
  }
  return '/';
}

const TopBarContainer: React.FunctionComponent<TopBarContainerProps> = ({
  profile = false,
  title,
  transparent = false,
  home,
}) => {
  const history = useHistory();
  return (
    <div
      className={`holder-top-bar ${!profile || (transparent && 'holder-dark')}`}
    >
      {profile ? (
        <div className="top-bar-container">
          <Link to="/profile" className="profile-button">
            <img src="" alt="Perfil" />
          </Link>
          <p>{title}</p>
          <img src={leaveIcon} alt="Sair" />
        </div>
      ) : (
        <div className="top-bar-container">
          <button type="button" onClick={() => history.goBack()}>
            <img src={backIcon} alt="Voltar" />
          </button>
          <p>{title}</p>
          <Link to={HomePath(home)}>
            <img id="imgWeb" src={logoImg} alt="Web Educa" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default TopBarContainer;
