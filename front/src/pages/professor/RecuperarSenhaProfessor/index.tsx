import React, { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast'; // Toast

import Input from '../../../components/Input';
import WrapperContent from '../../../components/WrapperContent';
import LogoContainer from '../../../components/LogoContainer';
import './styles.scss';
import api from '../../../services/api';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [emailReset, setEmailReset] = useState('');
  const [key, setKey] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('');

  const history = useHistory();

  const [openReset, setOpenReset] = useState(true);

  async function handleForgotPassword(e: FormEvent) {
    e.preventDefault();
    await api
      .post('profpass/forgot', {
        email,
      })
      .then(() => {
        toast.success('E-mail enviado com sucesso!');
        setOpenReset(!openReset);
        setEmail('');
        // history.push('/prof-login');
      })
      .catch(err => {
        toast.error(
          'Ocorreu um erro ao tentar recuperar a senha desse e-mail!',
        );
      });
  }

  async function handleResetPassword(e: FormEvent) {
    e.preventDefault();

    if (newPassword !== newPasswordConfirmation) {
      toast.error('As senhas se diferem!');
    } else {
      await api
        .post('/profpass/reset', {
          email: emailReset,
          key,
          password: newPassword,
        })
        .then(() => {
          toast.success(
            'Senha alterada com sucesso, volte para o login e teste a nova senha!',
          );
          setEmailReset('');
          setKey('');
          setNewPassword('');
          setNewPasswordConfirmation('');

          // setOpenReset(!openReset);
          // history.push('/prof-login');
        })
        .catch(err => {
          toast.error(err.response.data.message);
        });
    }
  }

  return (
    <div id="page-login">
      <Toaster />

      <WrapperContent className="page-content-left">
        <LogoContainer />
        <div className="signup-container">
          {openReset ? (
            <form className="form-80" onSubmit={handleForgotPassword}>
              <fieldset>
                <legend>
                  <p>Eita, esqueceu sua senha?</p>
                </legend>
                <span>
                  Não esquenta, vamos dar um jeito nisso. Podemos emitir uma
                  chave de alteração para seu e-mail para ter mais segurança.
                </span>
                <Input
                  name="email"
                  placeholder="E-mail"
                  value={email}
                  onChange={e => {
                    setEmail(e.target.value);
                  }}
                />
                <button className="login-submit" type="submit">
                  Solicitar chave de alteração
                </button>
              </fieldset>
              <span
                className="openReset"
                onClick={() => setOpenReset(!openReset)}
              >
                Entrar com chave de alteração de senha
              </span>
            </form>
          ) : (
            <form className="form-80" onSubmit={handleResetPassword}>
              <fieldset>
                <legend>
                  <p>Mandamos uma chave de alteração para seu e-mail!</p>
                </legend>
                <Input
                  name="emailReset"
                  placeholder="E-mail"
                  value={emailReset}
                  onChange={e => {
                    setEmailReset(e.target.value);
                  }}
                />
                <Input
                  name="key"
                  placeholder="Chave de alteração"
                  value={key}
                  onChange={e => {
                    setKey(e.target.value);
                  }}
                />
                <Input
                  name="password"
                  type="password"
                  placeholder="Nova senha"
                  value={newPassword}
                  onChange={e => {
                    setNewPassword(e.target.value);
                  }}
                />
                <Input
                  name="passwordConfirmation"
                  type="password"
                  placeholder="Confirmar Senha"
                  value={newPasswordConfirmation}
                  onChange={e => {
                    setNewPasswordConfirmation(e.target.value);
                  }}
                />
                <button className="login-submit" type="submit">
                  Alterar
                </button>
              </fieldset>
              <span
                // type="button"
                className="openReset"
                onClick={() => setOpenReset(!openReset)}
              >
                Requisitar chave de ativação
              </span>
            </form>
          )}
          <div className="footer">
            <Link to="/prof-login">Voltar para login</Link>
          </div>
        </div>
      </WrapperContent>
    </div>
  );
};

export default ForgotPassword;
