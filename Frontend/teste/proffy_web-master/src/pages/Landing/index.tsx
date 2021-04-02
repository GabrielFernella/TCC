import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import LogoContainer from '../../components/LogoContainer'
import landingImg from '../../assets/images/landing.svg'
import studyIcon from '../../assets/images/icons/study.svg'
import giveClassesIcon from '../../assets/images/icons/give-classes.svg'
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg'
import api from '../../services/api'
import './styles.scss'
import TopBarContainer from '../../components/TopBarContainer'

function Landing() {
  const [totalConnections, setTotalConnections] = useState(0)

  useEffect(() => {
    api.get('connections').then((response) => {
      const { total } = response.data
      setTotalConnections(total)
    })
  }, [])

  return (
    <div>
      <div id="page-landing">
        <TopBarContainer profile={true} />
        <div id="page-landing-content" className="container">
          <LogoContainer background={false} />

          <img
            src={landingImg}
            alt="Plataforma de estudos"
            className="hero-image"
          />

          <div className="buttons-container">
            <Link to="/study" className="study">
              <img src={studyIcon} alt="Estudar" />
              Estudar
            </Link>
            <Link to="give-classes" className="give-classes">
              <img src={giveClassesIcon} alt="Estudar" />
              Dar Aulas
            </Link>
          </div>

          <span className="total-connections">
          Total de {totalConnections} conexões já realizadas{' '}
            <img src={purpleHeartIcon} alt="Coração Roxo" />
        </span>
        </div>
      </div>
    </div>

  )
}

export default Landing
