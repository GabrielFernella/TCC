import React, { FormEvent, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast'; // Toast
import WrapperContent from '../../../components/WrapperContent';
import LogoContainer from '../../../components/LogoContainer';
import Input from '../../../components/Input';

// import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';
// import { AuthContext } from '../../contexts/auth';
import './styles.scss';
import { useAuth } from '../../../hooks/auth';
import api from '../../../services/api';

const Login: React.FC = () => {
  const { signIn, user, providers } = useAuth();
  const history = useHistory();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // Carregar todos os horários do professor
  useEffect(() => {
    console.log(providers);
    if (user) {
      history.push('/prof-home');
    }
    // toast('Tente se autenticar');

    /* api
      .get('profsession')
      .then(res => {
        return history.push('/prof-home');
      })
      .catch(() => {
        toast('Tente se autenticar');
      }); */
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const provider = 'profsession';

    if (isAble()) {
      // Autenticando
      await api
        .post(provider, {
          email,
          password,
        })
        .then(async () => {
          await signIn({ email, password, provider });

          history.push('/prof-home');
        })
        .catch(() => {
          toast.error('Usuário ou senha inválidos');
        });
    } else {
      toast.error('Usuário ou senha inválidos');
    }
  }

  function isAble() {
    return email !== '' && password !== '';
  }

  return (
    <div id="page-login">
      <Toaster />
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
                required
                type="email"
                name="email"
                placeholder="E-mail"
                value={email || ''}
                onChange={e => setEmail(e.target.value)}
              />
              <Input
                required
                name="password"
                type="password"
                placeholder="Senha"
                value={password || ''}
                onChange={e => setPassword(e.target.value)}
              />

              <div className="login-tools">
                <div />
                <Link to="/professor/forgot">Esqueci minha senha</Link>
              </div>
              <button
                className={`login-submit ${'login-submit-active'}`}
                // disabled={!isAble()}
                type="submit"
              >
                Entrar
              </button>
            </fieldset>
            <div className="login-footer">
              <div className="signup">
                <p>Não tem conta?</p>
                <Link to="/prof-form">Cadastre-se como professor</Link>
              </div>
            </div>
          </form>
        </div>
      </WrapperContent>
    </div>
  );
};

export default Login;
