import React, { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast'; // Toast

import PageHeader from '../../../components/PageHeader';
import Input from '../../../components/Input';
import Textarea from '../../../components/Textarea';
import warningIcon from '../../../assets/images/icons/warning.svg';

import './styles.scss';
import backgroundImg from '../../../assets/images/success-background.svg';
// import { AuthContext } from '../../contexts/auth';
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
  const [biografia, setBiografia] = useState('');

  async function handleCreateProfile(e: FormEvent) {
    e.preventDefault();

    if (!(password === passwordConf)) {
      toast.error('Password não confere');
    }

    if (avatar.trim() === '') {
      setAvatar(
        'https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?b=1&k=20&m=1300845620&s=170667a&w=0&h=JbOeyFgAc6-3jmptv6mzXpGcAd_8xqkQa_oUK2viFr8=',
      );
    }

    if (
      name &&
      cpf &&
      email &&
      password &&
      passwordConf &&
      avatar &&
      pix &&
      biografia
    ) {
      await api
        .post('professor/create', {
          name,
          cpf: cpf.replace(/\D/g, ''),
          email,
          password,
          avatar,
          pix,
          biografia,
        })
        .then(() => {
          toast.success('Cadastro realizado com sucesso!');
          history.push('/prof-login');
        })
        .catch(error => {
          toast.error(
            `Não foi possível efetuar o cadastro, tente novamente. Error: ${error.response.data.message}`,
          );
        });
    } /* else {
      toast.error(
        'Não foi possível efetuar o cadastro, um ou mais campos devem estar faltando. Tente novamente',
      );
    } */
  }

  return (
    <div id="page-teacher-form" className="container">
      <Toaster />

      <PageHeader page="Cadastro Professor" background={backgroundImg}>
        <div className="profile-header">
          <h2>Dar aulas particulares ficou ainda mais fácil!</h2>
          <p>
            Anuncie suas aulas particulares para encontre milhares de potenciais
            alunos próximos de sua casa ou de seu local de trabalho.
          </p>
        </div>
      </PageHeader>

      <main>
        <form onSubmit={handleCreateProfile}>
          <fieldset>
            <legend>Cadastro Professor</legend>
            <div id="form-content">
              <div id="name-info">
                <Input
                  required
                  placeholder="Nome"
                  label="Nome *"
                  name="name"
                  maxLength={120}
                  value={name || ''}
                  onChange={e => setName(e.target.value)}
                />
              </div>
              <div id="cpf-info">
                <Input
                  required
                  placeholder="999.999.999-99"
                  label="CPF *"
                  name="cpf"
                  mask="cpf"
                  maxLength={14}
                  // minLength={10}
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
                  placeholder="email@email.com"
                  label="E-mail *"
                  name="email"
                  value={email || ''}
                  maxLength={100}
                  type="email"
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div id="password-info">
                <Input
                  required
                  label="Senha *"
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
                  label="Confirmar senha *"
                  name="confirmation"
                  type="password"
                  maxLength={32}
                  value={passwordConf || ''}
                  onChange={e => setPasswordConf(e.target.value)}
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
                  required
                  placeholder="E-mail ou Telefone ou CPF"
                  label="PIX * (Chave PIX )"
                  name="pix"
                  value={pix || ''}
                  maxLength={100}
                  onChange={e => setPix(e.target.value)}
                />
              </div>

              <div id="biografia-info">
                <Textarea
                  required
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
              preencha todos os dados obrigatorios
            </p>
            <button type="submit">Salvar cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  );
};

export default Profile;
