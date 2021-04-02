import React, { FormEvent, useContext, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import PageHeader from '../../components/PageHeader'
import Input from '../../components/Input'
import Select from '../../components/Select'
import warningIcon from '../../assets/images/icons/warning.svg'
import api from '../../services/api'
import './styles.scss'
import Textarea from '../../components/Textarea'
import { ScheduleInterface, SubjectInterface } from '../../interfaces'
import { AuthContext } from '../../contexts/auth'

function GiveClasses() {
  const history = useHistory()
  const { emitMessage } = useContext(AuthContext)

  function useQuery() {
    return new URLSearchParams(useLocation().search)
  }

  const [scheduleItems, setScheduleItems] = useState<ScheduleInterface[]>([
    { week_day: '', from: '', to: '' },
  ])

  const [storedSubjects, setStoredSubjects] = useState<SubjectInterface[]>([])

  const [subject, setSubject] = useState('')
  const [summary, setSummary] = useState('')
  const [cost, setCost] = useState('')

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const classID = useQuery().has('edit') ? useQuery().get('edit') : null

  function validForm() {
    if (subject === '') return false
    if (cost === '' || Number(cost) < 0) return false
    if (summary === '') return false
    for (let index in scheduleItems) {
      let scheduleItem = scheduleItems[index]
      if (scheduleItem.from >= scheduleItem.to) {
        return false
      }
    }
    return true
  }

  async function addNewScheduleItem() {
    if (!!classID) {
      return api
        .post('/class-schedule', {
          class_id: classID,
        })
        .then((response) => {
          const scheduleItem = response.data
          return setScheduleItems([scheduleItem, ...scheduleItems])
        })
        .catch(() => {
          emitMessage('Não foi possível adicionar um novo horário.', 'error')
        })
    }

    return setScheduleItems([
      { week_day: '', from: '', to: '' },
      ...scheduleItems,
    ])
  }

  function handleCreateOrUpdateClass(e: FormEvent) {
    e.preventDefault()
    if (!validForm()) {
      emitMessage('Seu formulário de cadastro está incorreto!', 'error')
    }
    if (!classID) {
      api
        .post('classes', {
          subject_id: subject,
          cost: Math.abs(Number(cost)),
          summary,
          schedule: scheduleItems,
        })
        .then(() => {
          emitMessage('Sua aula foi cadastrada!')
          history.push('/')
        })
        .catch(() => {
          emitMessage('Não foi possível cadastrar sua aula!', 'error')
        })
    } else {
      api
        .put('classes', {
          id: classID,
          subject_id: subject,
          cost: Math.abs(Number(cost)),
          summary,
          schedule: scheduleItems,
        })
        .then(() => {
          emitMessage('Sua aula atualizada com sucesso!')
        })
        .catch(() => {
          emitMessage('Não foi possível atualizar sua aula!', 'error')
        })
    }
  }

  function setScheduleItemValue(
    position: number,
    field: string,
    value: string,
  ) {
    const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if (index === position) {
        return {
          ...scheduleItem,
          [field]: value,
        }
      }
      return scheduleItem
    })
    setScheduleItems(updatedScheduleItems)
  }

  function handleDeleteClassSchedule(index: number) {
    if (scheduleItems.length > 1) {
      if (!!classID) {
        let initialSchedule = [...scheduleItems]
        return api
          .delete('/class-schedule', {
            params: {
              // @ts-ignore
              id: initialSchedule[index]['id'],
            },
          })
          .then(() => {
            initialSchedule.splice(index, 1)
            return setScheduleItems(initialSchedule)
          })
          .catch(() => {
            emitMessage('Não foi possível apagar este horário.', 'error')
          })
      } else {
        let initialSchedule = [...scheduleItems]
        initialSchedule.splice(index, 1)
        return setScheduleItems(initialSchedule)
      }
    }
  }

  useEffect(
    () => {
      api
        .get('subjects')
        .then((response) => {
          setStoredSubjects(response.data)
        })
        .catch((error) => {
          if (error.response.status === 403) {
            emitMessage('Você não tem permissão para acessar essa página.')
            history.push('/')
          } else if (error.response.status === 404) {
            emitMessage('O conteúdo desta página não foi encontrado.', 'error')
            history.push('/')
          }
        })

      if (!!classID) {
        api
          .get('classes', {
            params: {
              id: classID,
            },
          })
          .then((response) => {
            const classItem = response.data
            setSubject(classItem.subject_id)
            setSummary(classItem.summary)
            setCost(classItem.cost)
            setScheduleItems(classItem.schedules)
          })
          .catch(() => {
            emitMessage('O conteúdo desta página não foi encontrado.', 'error')
            history.push('/give-classes')
          })
      }
    },
    // eslint-disable-next-line
    [classID, history],
  )

  function handleDeleteClass() {
    api
      .delete('/classes', {
        params: {
          id: classID,
        },
      })
      .then(() => {
        emitMessage('Sua aula foi apagada!')
        history.push('/')
      })
      .catch(() => {
        emitMessage('Não foi possível apagar esta aula!')
      })
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        page="Dar aulas"
        title="Que incrível que você quer dar aulas."
        description="O primeiro passo é preencher esse formulário de inscrição"
      />

      <main>
        <form onSubmit={handleCreateOrUpdateClass}>
          <fieldset>
            <legend>
              Sobre a aula{' '}
              {!!classID ? (
                <button
                  type="button"
                  style={{ color: 'var(--color-danger)' }}
                  onClick={handleDeleteClass}
                >
                  - Deletar aula
                </button>
              ) : (
                ''
              )}
            </legend>
            <div id="subject-info">
              <div>
                <Select
                  label="Matéria"
                  name="subject"
                  required
                  options={storedSubjects.map((subject) => {
                    return {
                      value: subject.id,
                      label: subject.name,
                    }
                  })}
                  value={subject}
                  onChange={(e) =>
                    setSubject(e.target.options[e.target.selectedIndex].value)
                  }
                />
              </div>
              <div>
                <Input
                  label="Custo da sua hora por aula"
                  name="cost"
                  min="0"
                  type="number"
                  value={cost}
                  required
                  onChange={(e) => {
                    setCost(e.target.value);
                  }}
                />
              </div>
            </div>
            <Textarea
              label="Sumário"
              name="summary"
              value={summary}
              required
              onChange={(e) => {
                setSummary(e.target.value)
              }}
            />
          </fieldset>
          <fieldset>
            <legend>
              Horários disponíveis
              <button type="button" onClick={addNewScheduleItem}>
                + Novo horário
              </button>
            </legend>
            {scheduleItems.map((scheduleItem, index) => {
              return (
                <div key={index}>
                  <div className="schedule-item">
                    <Select
                      label="Dia da Semana"
                      name="week_day"
                      options={[
                        {
                          value: 0,
                          label: 'Domingo',
                        },
                        {
                          value: 1,
                          label: 'Segunda-feira',
                        },
                        {
                          value: 2,
                          label: 'Terça-feira',
                        },
                        {
                          value: 3,
                          label: 'Quarta-feira',
                        },
                        {
                          value: 4,
                          label: 'Quinta-feira',
                        },
                        {
                          value: 5,
                          label: 'Sexta-feira',
                        },
                        { value: 6, label: 'Sábado' },
                      ]}
                      value={scheduleItem.week_day}
                      required
                      onChange={(e) =>
                        setScheduleItemValue(index, 'week_day', e.target.value)
                      }
                    />
                    <div className="schedule-time">
                      <Input
                        label="Das"
                        name="from"
                        type="time"
                        value={scheduleItem.from}
                        required
                        onChange={(e) =>
                          setScheduleItemValue(index, 'from', e.target.value)
                        }
                      />
                      <Input
                        label="Até"
                        name="to"
                        type="time"
                        value={scheduleItem.to}
                        required
                        onChange={(e) =>
                          setScheduleItemValue(index, 'to', e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="schedule-item-delete">
                    <hr />
                    <span onClick={() => handleDeleteClassSchedule(index)}>
                      Excluir horário
                    </span>
                    <hr />
                  </div>
                </div>
              )
            })}
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
  )
}

export default GiveClasses
