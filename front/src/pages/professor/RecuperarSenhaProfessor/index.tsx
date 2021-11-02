import React, { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast'; // Toast

import Input from '../../../components/Input';
import WrapperContent from '../../../components/WrapperContent';
import LogoContainer from '../../../components/LogoContainer';
import './styles.scss';
import api from '../../../services/api';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const history = useHistory();

  function handleForgotPassword(e: FormEvent) {
    e.preventDefault();
    api
      .post('profpass/forgot', {
        email,
      })
      .then(() => {
        toast.success('E-mail enviado com sucesso!');
        history.push('/prof-login');
      })
      .catch(err => {
        toast.error(
          'Ocorreu um erro ao tentar recuperar a senha desse e-mail!',
        );
      });
  }

  return (
    <div id="page-login">
      <Toaster />

      <WrapperContent className="page-content-left">
        <LogoContainer />
        <div className="signup-container">
          <form className="form-80" onSubmit={handleForgotPassword}>
            <fieldset>
              <legend>
                <p>Eita, esqueceu sua senha?</p>
              </legend>
              <span>Não esquenta, vamos dar um jeito nisso.</span>
              <Input
                name="email"
                placeholder="E-mail"
                value={email}
                onChange={e => {
                  setEmail(e.target.value);
                }}
              />
              <button className="login-submit" type="submit">
                Enviar
              </button>
            </fieldset>
            <Link to="/prof-login">Voltar pata login</Link>
          </form>
        </div>
      </WrapperContent>
    </div>
  );
};

export default ForgotPassword;