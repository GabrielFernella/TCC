import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import backIcon from '../../assets/images/icons/back.svg'
import leaveIcon from '../../assets/images/icons/leave.svg'
import logoImg from '../../assets/images/logo.svg'

import './styles.scss'
import { AuthContext } from '../../contexts/auth'

interface TopBarContainerProps {
  profile?: boolean
  title?: string
  transparent?: boolean
}

const TopBarContainer: React.FunctionComponent<TopBarContainerProps> = ({
  profile = false,
  title,
  transparent= false
}) => {
  const { signOut, user } = useContext(AuthContext)

  function handleSignOut() {
    signOut()
  }

  return (
    <div className={`holder-top-bar ${!profile || (transparent && 'holder-dark')}`}>
      {profile ? (
        <div className="top-bar-container">
          <Link to="/profile" className="profile-button">
            <img src={user.avatar} alt="Perfil" />
            <p>{[user.name, user.surname].join(' ')}</p>
          </Link>
          <p>{title}</p>
          <img onClick={(e) => handleSignOut()} src={leaveIcon} alt="Sair" />
        </div>
      ) : (
        <div className="top-bar-container">
          <Link to="/">
            <img src={backIcon} alt="Voltar" />
          </Link>
          <p>{title}</p>

          <img src={logoImg} alt="Proffy" />
        </div>
      )}
    </div>
  )
}

export default TopBarContainer
