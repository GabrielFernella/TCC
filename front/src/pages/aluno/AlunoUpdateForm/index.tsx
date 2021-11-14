import React, { FormEvent, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast'; // Toast

import PageHeader from '../../../components/PageHeader';
import Input from '../../../components/Input';
import warningIcon from '../../../assets/images/icons/warning.svg';
import backgroundImg from '../../../assets/images/success-background.svg';

import './styles.scss';

import api from '../../../services/api';

const AlunoUpdateForm: React.FC = () => {
  const history = useHistory();
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConf, setPasswordConf] = useState('');
  const [avatar, setAvatar] = useState('');
  const [pix, setPix] = useState('');

  useEffect(() => {
    handleShowProfile();
  }, []);

  function handleShowProfile() {
    api
      .get(`aluno/show`)
      .then(response => {
        setName(response.data.name);
        setCpf(response.data.cpf);
        setEmail(response.data.email);
        setAvatar(response.data.avatar);
        setPix(response.data.pix);
      })
      .catch(() => {
        toast.error('Ocorreu um erro ao carregar seus dados');
      });
  }

  function handleUpdateProfile(e: FormEvent) {
    e.preventDefault();
    if (avatar && pix) {
      api
        .put('aluno/update', {
          avatar,
          pix,
        })
        .then(() => {
          toast.success(
            'Atualização realizada com sucesso! Para efetivar algumas alterações é necessário que entre no sistema novamente',
          );
        })
        .catch(() => {
          toast.error(
            'Não foi possível efetuar a atualização, tente novamente',
          );
        });
    } else {
      toast.error(
        'Não foi possível efetuar a atualização, um ou mais campos devem estar faltando. Tente novamente',
      );
    }
  }

  return (
    <div id="page-aluno-profile" className="container">
      <Toaster />
      <PageHeader
        page="Meu perfil"
        background={backgroundImg}
        home="/aluno-home"
      >
        <div className="profile-header">
          <h2>Perfil Aluno</h2>
        </div>
      </PageHeader>

      <main>
        <form onSubmit={handleUpdateProfile}>
          <fieldset>
            <legend>Dados cadastrados</legend>
            <div id="cad-aluno">
              <div id="name-info">
                <Input
                  required
                  placeholder="Ricardo"
                  label="Nome"
                  name="name"
                  maxLength={255}
                  value={name || ''}
                  onChange={e => setName(e.target.value)}
                  disabled
                />
              </div>
              <div id="cpf-info">
                <Input
                  required
                  placeholder="999.999.999-99"
                  label="CPF"
                  name="cpf"
                  mask="money"
                  maxLength={11}
                  minLength={10}
                  value={cpf || ''}
                  onChange={e => setCpf(e.target.value)}
                  disabled
                />
              </div>
              <div id="email-info">
                <Input
                  required
                  placeholder="ricardo@email.com"
                  label="E-mail"
                  name="email"
                  value={email || ''}
                  maxLength={255}
                  type="email"
                  onChange={e => setEmail(e.target.value)}
                  disabled
                />
              </div>

              <div id="avatar-info">
                <Input
                  required
                  placeholder="http://avatar.com/myavatar"
                  label="Avatar (URL)"
                  name="avatar"
                  value={avatar || ''}
                  onChange={e => setAvatar(e.target.value)}
                />
              </div>
              <div id="pix-info">
                <Input
                  required
                  placeholder="E-mail ou Telefone ou CPF"
                  label="PIX"
                  name="pix"
                  value={pix || ''}
                  onChange={e => setPix(e.target.value)}
                />
              </div>
            </div>
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
              Importante! <br />
              Preencha todos os dados
            </p>
            <button type="submit">Atualizar perfil</button>
          </footer>
        </form>
      </main>
    </div>
  );
};

export default AlunoUpdateForm;

/*
   <div id="password-info">
                <Input
                  required
                  label="Password"
                  name="password"
                  type="password"
                  maxLength={32}
                  value={password || ''}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              <div id="password-confirmation">
                <Input
                  required
                  label="Confirmation Pass."
                  name="confirmation"
                  type="password"
                  maxLength={32}
                  value={passwordConf || ''}
                  onChange={e => setPasswordConf(e.target.value)}
                />
              </div>
*/
