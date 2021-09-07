import React, { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast'; // Toast

import PageHeader from '../../../components/PageHeader';
import Input from '../../../components/Input';
import warningIcon from '../../../assets/images/icons/warning.svg';
import backgroundImg from '../../../assets/images/success-background.svg';

import './styles.scss';

import api from '../../../services/api';

const Profile: React.FC = () => {
  const history = useHistory();
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConf, setPasswordConf] = useState('');
  const [avatar, setAvatar] = useState('');
  const [pix, setPix] = useState('');

  async function handleCreateProfile(e: FormEvent) {
    e.preventDefault();

    if (!(password === passwordConf)) {
      toast.error('Password não confere');
    } else if (
      name &&
      cpf &&
      email &&
      password &&
      passwordConf &&
      avatar &&
      pix
    ) {
      await api
        .post('aluno/create', {
          name,
          cpf: cpf.replace(/\D/g, ''),
          email,
          password,
          avatar,
          pix,
        })
        .then(() => {
          toast.success('Cadastro realizado com sucesso!');
          history.push('/aluno-login');
        })
        .catch(error => {
          toast.error(
            `Não foi possível efetuar o cadastro, tente novamente${error.response.data.message}`,
          );
        });
    } else {
      toast.error(
        'Não foi possível efetuar o cadastro, um ou mais campos devem estar faltando. Tente novamente',
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
          <h2>Vamos estudar e se aperfeiçoar ainda mais!</h2>
          <p>
            Faça seu cadastro e junte-se a uma comunidade incrível de
            professores e alunos.
          </p>
        </div>
      </PageHeader>

      <main>
        <form onSubmit={handleCreateProfile}>
          <fieldset>
            <legend>Cadastro Aluno</legend>
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
                />
              </div>
              <div id="cpf-info">
                <Input
                  required
                  placeholder="999.999.999-99"
                  label="CPF"
                  name="cpf"
                  mask="cpf"
                  maxLength={11}
                  minLength={10}
                  value={cpf || ''}
                  onChange={e => {
                    setCpf(
                      e.target.value.replace(
                        /(\d{3})(\d{3})(\d{3})(\d{2})/,
                        '$1.$2.$3-$4',
                      ),
                    );
                  }}
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
                />
              </div>
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
            <button type="submit">Salvar cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  );
};

export default Profile;
