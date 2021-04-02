import { SubjectInterface } from '../interfaces'

export function findSubjectName(id: number, array: SubjectInterface[]) {
  let label = ''
  array.map((item) => {
    if (item.id === id) {
      label = item.name
    }
    return item
  })
  return label
}

export function convertHourToMinutes(time: String) {
  // 8:00
  const [hour, minutes] = time.split(':').map(Number)
  return hour * 60 + minutes
}

export function convertMinutesToHours(time: number): String {
  // 8:00
  const hours = String(Math.floor(time / 60)).padStart(2, '0')
  const minutes = String(Math.floor(time % 60)).padStart(2, '0')

  return `${hours}:${minutes}`
}
