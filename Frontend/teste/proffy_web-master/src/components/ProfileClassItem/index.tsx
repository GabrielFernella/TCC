import React from 'react'
import editIcon from '../../assets/images/icons/edit.svg'
import './styles.scss'
import GridSchedule from '../GridSchedule'
import { Link } from 'react-router-dom'
import { ClassItemInterace, SubjectInterface } from '../../interfaces'
import { findSubjectName } from '../../utils'

export interface ClassItemProps {
  classesLabel: SubjectInterface[]
  classItem: ClassItemInterace
}

const ProfileClassItem: React.FunctionComponent<ClassItemProps> = ({
  classItem,
  classesLabel,
}) => {
  return (
    <article className="profile-class-item">
      <header>
        <div className="teacher-info">
          <div>
            <strong>
              {findSubjectName(classItem.subject_id, classesLabel)}
            </strong>
            <span>R$ {classItem.cost}</span>
          </div>
        </div>

        <Link to={`/give-classes?edit=${classItem.id}`} className="class-edit">
          <img src={editIcon} alt="edit" />
        </Link>
      </header>
      <p>{classItem.summary}</p>
      <GridSchedule schedules={classItem.schedules} />
    </article>
  )
}

export default ProfileClassItem
