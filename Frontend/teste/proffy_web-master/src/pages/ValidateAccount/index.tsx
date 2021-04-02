import React, {useEffect, useState} from 'react'
import FullContent from '../../components/FullContent'
import { useLocation } from 'react-router-dom'
import api from '../../services/api'

const ValidateAccount: React.FunctionComponent = () => {
  function useQuery() {
    return new URLSearchParams(useLocation().search)
  }

  const query = useQuery()
  const [validated, setValidated] = useState(false)
  useEffect(() => {
    api.post('validate-account', {token: query.get('token')}).then(() => {
      setValidated(true)
    })
  },
    // eslint-disable-next-line
    [])

  return (
    <FullContent
      title={validated ? 'Conta Validada' : 'Verificando Token'}
      disabled={!validated}
      message={
        validated
          ? 'Sua conta foi validada, agora você já pode logar a acessar a plataforma Proffy!'
          : 'Aguarde enquanto verificamos seu token e validamos sua conta!'
      }
      link={{
        url: '/',
        text: 'Login',
      }}
    />
  )
}

export default ValidateAccount
