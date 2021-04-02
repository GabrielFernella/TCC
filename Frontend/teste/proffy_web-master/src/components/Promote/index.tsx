import React from "react"
import './styles.scss'

const Promote: React.FunctionComponent<{dark?: boolean}> = ({
  dark= false
                                                            }) => {
  return (
    <div id="ad" className={!dark ? 'dark' : ''}><p className="container">Projeto idealizado pela <a href="https://rocketseat.com.br">Rocketseat</a> para o evendo Next Level Week #2 e implementado por <a
      href="https://baraus.dev">Bruno de Araujo</a></p></div>
  )
}

export default Promote
