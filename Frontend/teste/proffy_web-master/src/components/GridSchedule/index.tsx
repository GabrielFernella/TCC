import React from 'react'

import './styles.scss'
import { ScheduleInterface } from '../../interfaces'

export interface GridScheduleProps {
  schedules: ScheduleInterface[]
}

const GridSchedule: React.FunctionComponent<GridScheduleProps> = ({
  schedules,
}) => {
  function numberToWeekDay(index: string | number) {
    return [
      'Domingo',
      'Segunda',
      'Terça',
      'Quarta',
      'Quinta',
      'Sexta',
      'Sábado',
    ][Number(index)]
  }

  return (
    <section className="schedule-items">
      {schedules.map((schedule) => (
        <div className="schedule-block" key={schedule.id}>
          <div>
            <span>Dia</span>
            <strong>{numberToWeekDay(schedule.week_day)}</strong>
          </div>
          <div>
            <span>Horário</span>
            <strong>
              {schedule.from} - {schedule.to}
            </strong>
          </div>
        </div>
      ))}
    </section>
  )
}

export default GridSchedule
