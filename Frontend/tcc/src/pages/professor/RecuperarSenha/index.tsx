import React, { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Input from '../../../components/Input';
import WrapperContent from '../../../components/WrapperContent';
import LogoContainer from '../../../components/LogoContainer';
import './styles.scss';
import api from '../../../services/api';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const history = useHistory();

  function handleForgotPassword(e: FormEvent) {
    /*
    e.preventDefault();
    api
      .post('forgot-password', {
        email,
      })
      .then(() => {
        history.push('/professor-login');
      });
      */

    history.push('/professor-login');
  }

  return (
    <div id="page-login">
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
          </form>
        </div>
      </WrapperContent>
    </div>
  );
};

export default ForgotPassword;
