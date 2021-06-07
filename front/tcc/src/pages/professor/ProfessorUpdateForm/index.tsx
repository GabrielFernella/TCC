import React, { FormEvent, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast'; // Toast
import { useAuth } from '../../../hooks/auth';

import PageHeader from '../../../components/PageHeader';
import Input from '../../../components/Input';
import Textarea from '../../../components/Textarea';
import warningIcon from '../../../assets/images/icons/warning.svg';

import './styles.scss';
import backgroundImg from '../../../assets/images/success-background.svg';
// import { AuthContext } from '../../contexts/auth';
import api from '../../../services/api';

interface IUser {
  avatar: string;
  pix: string;
  biografia: string;
}

const UpdateProfessor: React.FC = () => {
  const { user } = useAuth();

  const history = useHistory();
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [pix, setPix] = useState('');
  const [biografia, setBiografia] = useState('');

  console.log(user);

  useEffect(() => {
    handleShowProfile();
  }, []);

  function handleShowProfile() {
    api
      .get(`professor/show/${user.id}`)
      .then(response => {
        // toast.success('Cadastro realizado com sucesso!');

        setName(response.data.name);
        setCpf(response.data.cpf);
        setEmail(response.data.email);
        setAvatar(response.data.avatar);
        setPix(response.data.pix);
        setBiografia(response.data.biografia);
      })
      .catch(() => {
        toast.error('Ocorreu um erro ao carregar seus dados');
      });
  }

  function handleCreateProfile(e: FormEvent) {
    e.preventDefault();

    /* if (!(password === passwordConf)) {
      toast.error('Password não confere');
    } */

    if (avatar && pix && biografia) {
      api
        .put('professor/update', {
          name,
          avatar,
          pix,
          biografia,
        })
        .then(() => {
          toast.success('Atualização realizada com sucesso!');
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
    <div id="page-teacher-form" className="container">
      <Toaster />

      <PageHeader
        page="Meu perfil"
        background={backgroundImg}
        home="/prof-home"
      >
        <div className="profile-header">
          <h2>Que bom que você deseja dar aulas!</h2>
          <p>Faça seu cadastro e junte-se a outros professores.</p>
        </div>
      </PageHeader>

      <main>
        <form onSubmit={handleCreateProfile}>
          <fieldset>
            <legend>Perfil Professor</legend>
            <div id="form-content">
              <div id="name-info">
                <Input
                  disabled
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
                  disabled
                  placeholder="999.999.999-99"
                  label="CPF"
                  name="cpf"
                  mask="money"
                  maxLength={11}
                  minLength={10}
                  value={cpf || ''}
                  onChange={e => setCpf(e.target.value)}
                />
              </div>
              <div id="email-info">
                <Input
                  disabled
                  placeholder="ricardo@email.com"
                  label="E-mail"
                  name="email"
                  value={email || ''}
                  maxLength={255}
                  type="email"
                  onChange={e => setEmail(e.target.value)}
                />
              </div>

              <div id="avatar-info">
                <Input
                  placeholder="http://avatar.com/myavatar"
                  label="Avatar (URL)"
                  name="avatar"
                  value={avatar || ''}
                  onChange={e => setAvatar(e.target.value)}
                />
              </div>
              <div id="pix-info">
                <Input
                  placeholder="E-mail ou Telefone ou CPF"
                  label="PIX"
                  name="pix"
                  value={pix || ''}
                  onChange={e => setPix(e.target.value)}
                />
              </div>

              <div id="biografia-info">
                <Textarea
                  placeholder="Fale um pouco sobre você"
                  label="Biografia"
                  name="biografia"
                  maxLength={500}
                  value={biografia || ''}
                  onChange={e => setBiografia(e.target.value)}
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

export default UpdateProfessor;

/*
  <div id="password-info">
                <Input
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
                  label="Confirmation Pass."
                  name="confirmation"
                  type="password"
                  maxLength={32}
                  value={passwordConf || ''}
                  onChange={e => setPasswordConf(e.target.value)}
                />
              </div>
*/
