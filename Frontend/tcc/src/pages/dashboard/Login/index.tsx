import React, { FormEvent, useCallback, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import { useAuth } from '../../../hooks/auth';

import WrapperContent from '../../../components/WrapperContent';
import LogoContainer from '../../../components/LogoContainer';
import Input from '../../../components/Input';

import './styles.scss';

/* interface SignInFormData {
  email: string;
  password: string;
} */

const Login: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const history = useHistory();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  /* const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        await signIn({ email, password });

        history.push('/prof-home');
      } catch (err) {
        formRef.current?.setErrors(err);
      }
    },
    [signIn, history],
  ); */

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const provider = 'alunosession';
    if (isAble()) {
      await signIn({ email, password, provider });
      history.push('/');
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
          <form onSubmit={handleSubmit}>
            <fieldset>
              <legend>
                <p>Fazer login</p>
                <Link to="/signup">Criar uma conta</Link>
              </legend>

              <Input
                name="email"
                placeholder="E-mail"
                value={email || ''}
                onChange={e => setEmail(e.target.value)}
              />
              <Input
                name="password"
                type="password"
                placeholder="Senha"
                value={password || ''}
                onChange={e => setPassword(e.target.value)}
              />

              <div className="login-tools">
                <div />
                <Link to="/forgot-password">Esqueci minha senha</Link>
              </div>
              <button
                className={`login-submit ${'login-submit-active'}`}
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
};

export default Login;
