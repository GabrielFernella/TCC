import React, { FormEvent, useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import WrapperContent from '../../../components/WrapperContent';
import LogoContainer from '../../../components/LogoContainer';
import Input from '../../../components/Input';
// import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';
// import { AuthContext } from '../../contexts/auth';
import './styles.scss';

function Login() {
  // const { signIn } = useContext(AuthContext);
  const history = useHistory();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  async function handleSignIn(e: FormEvent) {
    e.preventDefault();
    if (isAble()) {
      // await signIn({ email, password });
      history.push('/professor');
    }
  }

  function isAble() {
    return email !== '' && password !== '';
  }

  return (
    <div id="page-login">
      <WrapperContent className="page-content-right">
        <LogoContainer />
        <div className="login-container">
          <form className="form-80" onSubmit={e => handleSignIn(e)}>
            <fieldset>
              <legend>
                <p>Fazer login</p>
                <Link to="/signup">Criar uma conta</Link>
              </legend>
              <Input
                name="email"
                placeholder="E-mail"
                stacked
                value={String(email)}
                onChange={e => {
                  setEmail(e.target.value);
                }}
              />
              <Input
                name="password"
                type="password"
                placeholder="Senha"
                stacked
                value={String(password)}
                onChange={e => {
                  setPassword(e.target.value);
                }}
              />
              <div className="login-tools">
                <div />
                <Link to="/forgot-password">Esqueci minha senha</Link>
              </div>
              <button
                className={`login-submit ${isAble() && 'login-submit-active'}`}
                disabled={!isAble()}
                type="submit"
              >
                Entrar
              </button>
            </fieldset>
            <div className="login-footer">
              <div className="signup">
                <p>Não tem conta?</p>
                <Link to="/form-professor">Cadastre-se como professor</Link>
              </div>
            </div>
          </form>
        </div>
      </WrapperContent>
    </div>
  );
}

export default Login;
