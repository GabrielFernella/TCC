import React from 'react'

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'

import './styles.css';
import api from '../../services/api';

export interface Teacher {
    id: number;
    avatar: string;
    bio: string;
    cost: number;
    name: string;
    subject: string;
    whatsapp: string;
}

export interface TeacherItemProps {
  teacher: Teacher
}


const TeacherItem:React.FC<TeacherItemProps> = ({ teacher }) => {
  function addConnections(){
    api.post('connections', {
      user_id: teacher.id
    })
  }

  function formatReal( int: any ){
    var tmp = int+'';
    tmp = tmp.replace(/([0-9]{2})$/g, ",$1");
    if( tmp.length > 6 )
        tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
    return tmp;
  }

  const costTransform = formatReal(teacher.cost);

  return (
    <article className="teacher-item">
      <header>
        <img src={teacher.avatar} alt={teacher.name}/>
        <div>
          <strong>{teacher.name}</strong>
          <span>{teacher.subject}</span>
        </div>
      </header>

      <p>{teacher.bio}</p>

      <footer>
        <p>
          Preço/Hora
          <strong>R$ {costTransform}</strong>
        </p>
        <a target="_blank" href={`https://wa.me/55${teacher.whatsapp}`} onClick={addConnections}>
          <img src={whatsappIcon} alt="Entrar em contato"/>
          Entrar em contato
        </a>
      </footer>
    </article>
  );
}

export default TeacherItem;