import React, { useEffect, useState } from 'react'
import PageHeader from '../../components/PageHeader'
import Input from '../../components/Input'
import Select from '../../components/Select'
import api from '../../services/api'
import './styles.scss'
import ClassItem from '../../components/ClassItem'
import { ClassItemInterace, SubjectInterface } from '../../interfaces'

function Study() {
  const [classes, setClasses] = useState([])

  const [storedSubjects, setStoredSubjects] = useState<SubjectInterface[]>([])

  const [subject, setSubject] = useState('')
  const [week_day, setWeekDay] = useState('')
  const [time, setTime] = useState('')

  function searchClasses() {
    api
      .get(
        'classes',
        subject !== '' && time !== '' && week_day !== ''
          ? {
              params: {
                subject_id: subject,
                week_day,
                time,
              },
            }
          : {},
      )
      .then((response) => {
        const { data } = response
        setClasses(data)
      })
  }

  useEffect(
    () => {
      searchClasses()
      if (storedSubjects.length === 0) {
        api.get('subjects').then((response) => {
          setStoredSubjects(response.data)
        })
      }
    },
    // eslint-disable-next-line
    [subject, week_day, time, storedSubjects.length],
  )

  return (
    <div>
      <div id="page-teacher-list" className="container">
        <PageHeader page="Estudar" title="Estes são os proffys disponíveis.">
          <form id="search-teachers">
            <Select
              label="Matéria"
              name="subject"
              options={storedSubjects.map((subject) => {
                return {
                  value: subject.id,
                  label: subject.name,
                }
              })}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <Select
              label="Dia da Semana"
              name="week_day"
              options={[
                { value: 0, label: 'Domingo' },
                { value: 1, label: 'Segunda-feira' },
                { value: 2, label: 'Terça-feira' },
                { value: 3, label: 'Quarta-feira' },
                { value: 4, label: 'Quinta-feira' },
                { value: 5, label: 'Sexta-feira' },
                { value: 6, label: 'Sábado' },
              ]}
              value={week_day}
              onChange={(e) => setWeekDay(e.target.value)}
            />
            <Input
              label="Hora"
              name="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </form>
        </PageHeader>

        <main>
          {classes.map((classItem: ClassItemInterace) => (
            <ClassItem
              classesLabel={storedSubjects}
              key={classItem.id}
              classItem={classItem}
            />
          ))}
        </main>

      </div>

    </div>
  )
}

export default Study
