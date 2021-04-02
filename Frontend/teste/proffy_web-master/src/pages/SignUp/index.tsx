import React, { FormEvent, useContext, useState } from 'react'
import Input from '../../components/Input'
import WrapperContent from '../../components/WrapperContent'
import LogoContainer from '../../components/LogoContainer'
import './styles.scss'
import { AuthContext } from '../../contexts/auth'

function SignUp() {
  const { register } = useContext(AuthContext)

  const [name, setName] = useState<string>('')
  const [surname, setSurname] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  async function handleCreateUser(e: FormEvent) {
    e.preventDefault()
    if (isAble()) {
      console.log(password)
      await register({ name, email, password, surname })
      const msg = `Agora você faz parte da plataforma da Proffy. Mas antes é nessário que você valide sua conta. Enviamos um token para seu e-mail!`
      window.location.href = `/notify?title=Valide sua conta&msg=${msg}&url=/&text=Página Inicial`
    }
  }

  function isAble() {
    return name !== '' && surname !== '' && email !== '' && password !== ''
  }

  return (
    <div id="page-signup">
      <WrapperContent className="page-content-left">
        <LogoContainer />
        <div className="signup-container">
          <form
            className="form-80"
            onSubmit={(event) => handleCreateUser(event)}
          >
            <fieldset>
              <legend>
                <p>Cadastro</p>
              </legend>
              <span>Preencha os dados abaixo para começar.</span>
              <Input
                name="name"
                placeholder="Nome"
                stacked={true}
                value={String(name)}
                onChange={(e) => {
                  setName(e.target.value)
                }}
              />
              <Input
                name="surname"
                placeholder="Sobrenome"
                stacked={true}
                value={String(surname)}
                onChange={(e) => {
                  setSurname(e.target.value)
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
              <button
                className={`login-submit ${isAble() && 'login-submit-active'}`}
                disabled={!isAble()}
                type="submit"
              >
                Concluir cadastro
              </button>
            </fieldset>
          </form>
        </div>
      </WrapperContent>
    </div>
  )
}

export default SignUp
