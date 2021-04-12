import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import PageHeader from '../../../components/PageHeader';
import Input from '../../../components/Input';
import Textarea from '../../../components/Textarea';
import warningIcon from '../../../assets/images/icons/warning.svg';
// import cameraIcon from '../../assets/images/icons/camera.svg';
import './styles.scss';
import backgroundImg from '../../../assets/images/success-background.svg';
// import { AuthContext } from '../../contexts/auth';
// import api from '../../services/api';
// import { ClassItemInterace, SubjectInterface } from '../../interfaces';
// import ProfileClassItem from '../../components/ProfileClassItem';

function Profile() {
  // const { setLocalUser, emitMessage } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState('');
  const [pix, setPix] = useState('');
  const [biografia, setBiografia] = useState('');

  function handleUpdateProfile() {}

  /* async function handleUpdateProfile(e: FormEvent) {
    e.preventDefault();
    await updateProfile({ name, whatsapp, email, bio, surname }).then(() => {
      emitMessage('Seu perfil foi atualizado!');
    });
  }

  function uploadAvatar({ image }: { image: any }) {
    const formData = new FormData();
    formData.append('image', image);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

    return api.post('avatar', formData, config);
  }

  function imageIsLoaded(e: ProgressEvent<FileReader>) {
    // @ts-ignore
    setAvatar(e.target.result);
  }

  /*useEffect(() => {
    api.get('subjects').then(response => {
      setSubjects(response.data);
    });

    getProfile(true).then(response => {
      const {
        name,
        email,
        avatar,
        surname,
        bio,
        whatsapp,
      } = response.data.user;

      const { classes } = response.data;

      setName(name as string);
      setSurname(surname as string);
      setAvatar(avatar as string);
      setBio(bio as string);
      setWhatsapp(whatsapp as string);
      setEmail(email as string);
    });
  }, []); */

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader page="Meu perfil" background={backgroundImg}>
        <div className="profile-header">
          <h2>Que bom que você deseja dar aulas!</h2>
          <p>Faça seu cadastro e junte-se a outros professores.</p>
        </div>
      </PageHeader>

      <main>
        <form onSubmit={handleUpdateProfile}>
          <fieldset>
            <legend>Seus dados</legend>
            <div id="form-content">
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

              <div id="biografia-info">
                <Textarea
                  label="Biografia"
                  name="biografia"
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
            <button type="submit">Salvar cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  );
}

export default Profile;
