import React, { useContext } from 'react'
import whatsappIcon from '../../assets/images/icons/whatsapp.svg'
import editIcon from '../../assets/images/icons/edit.svg'
import api from '../../services/api'
import './styles.scss'
import GridSchedule from '../GridSchedule'
import { AuthContext } from '../../contexts/auth'
import { Link } from 'react-router-dom'
import { ClassItemInterace, SubjectInterface } from '../../interfaces'
import { findSubjectName } from '../../utils'
import { adorableImage } from '../../services/auth'

export interface ClassItemProps {
  classesLabel: SubjectInterface[]
  classItem: ClassItemInterace
}

const ClassItem: React.FunctionComponent<ClassItemProps> = ({
  classItem,
  classesLabel,
}) => {
  function createNewConnection() {
    api.post('connections', { class_id: classItem.id }).then()
  }
  const { user } = useContext(AuthContext)
  return (
    <article className="teacher-item">
      <header>
        <div className="teacher-info">
          <img
            src={
              classItem.teacher.avatar || adorableImage(classItem.teacher.name)
            }
            alt={classItem.teacher.name}
          />
          <div>
            <strong>{classItem.teacher.name}</strong>
            <span>{findSubjectName(classItem.subject_id, classesLabel)}</span>
          </div>
        </div>
        {
          // @ts-ignore
          classItem.teacher.id === user.id && (
            <Link
              to={`/give-classes?edit=${classItem.id}`}
              className="class-edit"
            >
              <img src={editIcon} alt="edit" />
            </Link>
          )
        }
      </header>
      <p>{classItem.summary}</p>
      <GridSchedule schedules={classItem.schedules} />
      <footer>
        <p>
          Preço/hora
          <strong>R$ {classItem.cost}</strong>
        </p>
        <a
          href={`https://wa.me/${classItem.teacher.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={createNewConnection}
        >
          <img src={whatsappIcon} alt="WhatsApp" />
          Entrar em contato
        </a>
      </footer>
    </article>
  )
}

export default ClassItem
