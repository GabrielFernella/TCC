import React, { FormEvent, useState, useContext } from 'react'
import Input from '../../components/Input'
import WrapperContent from '../../components/WrapperContent'
import LogoContainer from '../../components/LogoContainer'
import './styles.scss'
import { useLocation, useHistory } from 'react-router-dom'
import api from '../../services/api'
import { AuthContext } from '../../contexts/auth'

function ResetPassword() {
  const { emitMessage } = useContext(AuthContext)

  function useQuery() {
    return new URLSearchParams(useLocation().search)
  }

  const history = useHistory()

  const [token, setToken] = useState<string>(useQuery().get('token') || '')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')

  async function handleResetPassword(e: FormEvent) {
    e.preventDefault()
    if (isAble() && password === confirmPassword) {
      api.post('reset-password', { token, password, email }).then(() => {
        const msg = `Sua senha acaba de ser redefinida. Clique no botão abaixo para acessar a plataforma.`
        history.push(
          `/notify?title=Senha Redefinida&msg=${msg}&url=/login&text=Login`,
        )
      })
    } else {
      emitMessage("Suas senhas não batem.", 'error')
    }
  }

  function isAble() {
    return token !== '' && email !== '' && password !== '' && confirmPassword
  }

  return (
    <div id="page-signup">
      <WrapperContent className="page-content-left">
        <LogoContainer />
        <div className="signup-container">
          <form className="form-80" onSubmit={handleResetPassword}>
            <fieldset>
              <legend>
                <p>Redefinição de Senha</p>
              </legend>
              <span>Preencha os dados abaixo para redefinir sua senha.</span>
              <Input
                name="token"
                placeholder="Token"
                // stacked={false}
                value={String(token)}
                onChange={(e) => {
                  setToken(e.target.value)
                }}
              />
              <Input
                name="email"
                placeholder="E-mail"
                stacked={true}
                value={String(email)}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
              />
              <Input
                name="password"
                placeholder="Senha"
                type="password"
                stacked={true}
                value={String(password)}
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
              />
              <Input
                name="confirm-password"
                placeholder="Confirme a senha"
                type="password"
                stacked={true}
                value={String(confirmPassword)}
                onChange={(e) => {
                  setConfirmPassword(e.target.value)
                }}
              />
              <button
                className={`login-submit ${isAble() && 'login-submit-active'}`}
                disabled={!isAble()}
                type="submit"
              >
                Resetar senha
              </button>
            </fieldset>
          </form>
        </div>
      </WrapperContent>
    </div>
  )
}

export default ResetPassword
