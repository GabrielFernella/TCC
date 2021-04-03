import React, { useState } from 'react';
import PageHeader from '../../../components/PageHeader';
import Input from '../../../components/Input';
import warningIcon from '../../../assets/images/icons/warning.svg';
import backgroundImg from '../../../assets/images/success-background.svg';

import './styles.scss';

function Profile() {
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState('');
  const [pix, setPix] = useState('');

  function handleUpdateProfile() {}

  return (
    <div id="page-teacher-profile" className="container">
      <PageHeader page="Meu perfil" background={backgroundImg}>
        <div className="profile-header">
          <h2>Vamos estudar e se aperfeiçoar ainda mais!</h2>
          <p>
            Faça seu cadastro e junte-se a uma comunidade incrível de
            professores e alunos.
          </p>
        </div>
      </PageHeader>

      <main>
        <form onSubmit={handleUpdateProfile}>
          <fieldset>
            <legend>Seus dados</legend>
            <div id="personal-info">
              <div id="name-info">
                <Input
                  label="Nome"
                  name="name"
                  value={name || ''}
                  onChange={e => setName(e.target.value)}
                />
              </div>
              <div id="cpf-info">
                <Input
                  label="CPF"
                  name="cpf"
                  value={cpf || ''}
                  onChange={e => setCpf(e.target.value)}
                />
              </div>
              <div id="email-info">
                <Input
                  label="E-mail"
                  name="email"
                  value={email || ''}
                  type="email"
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div id="password-info">
                <Input
                  label="Password"
                  name="password"
                  value={password || ''}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              <div id="avatar-info">
                <Input
                  label="Avatar (URL)"
                  name="avatar"
                  value={avatar || ''}
                  onChange={e => setAvatar(e.target.value)}
                />
              </div>
              <div id="pix-info">
                <Input
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
            <button type="submit">Salvar cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  );
}

export default Profile;
