import React, { FormEvent, useEffect, useState } from 'react';
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

  useEffect(() => {
    const confirmation = window.confirm(
      'Em observância à Lei nº. 13.709/18 – Lei Geral de Proteção de Dados Pessoais e demais normativas aplicáveis sobre proteção de Dados Pessoais, manifesto-me de forma informada, livre, expressa e consciente, no sentido de autorizar o SISTEMA WebEduca a realizar o tratamento de meus Dados Pessoais para uso na plataforma. Você aceita os termos de uso?',
    );

    if (confirmation === false) {
      history.push('/');
    }
  }, []);

  async function handleCreateProfile(e: FormEvent) {
    e.preventDefault();

    if (!(password === passwordConf)) {
      toast.error('Senha não confere');
    }

    /* if (avatar.trim() === '') {
      setAvatar(
        'https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?b=1&k=20&m=1300845620&s=170667a&w=0&h=JbOeyFgAc6-3jmptv6mzXpGcAd_8xqkQa_oUK2viFr8=',
      );
    } */

    /* const confirmation = window.confirm(
      'Em observância à Lei nº. 13.709/18 – Lei Geral de Proteção de Dados Pessoais e demais normativas aplicáveis sobre proteção de Dados Pessoais, manifesto-me de forma informada, livre, expressa e consciente, no sentido de autorizar o SISTEMA WebEduca a realizar o tratamento de meus Dados Pessoais para as finalidades e de acordo com as condições aqui estabelecidas. , Você aceita os termos de uso?',
    ); */

    if (name && cpf && email && password && passwordConf && avatar && pix) {
      await api
        .post('aluno/create', {
          name,
          cpf: cpf.replace(/\D/g, ''),
          email,
          password,
          avatar:
            avatar === ''
              ? 'https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?b=1&k=20&m=1300845620&s=170667a&w=0&h=JbOeyFgAc6-3jmptv6mzXpGcAd_8xqkQa_oUK2viFr8='
              : avatar,
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
    }
  }

  return (
    <div id="page-aluno-profile" className="container">
      <Toaster />
      <PageHeader page="Meu perfil" background={backgroundImg} home="/">
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
                  label="Senha"
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
                  label="Confirmação senha"
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
