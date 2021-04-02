import React from 'react'
import FullContent from '../../components/FullContent'
import { useLocation } from 'react-router-dom'

const Notify: React.FunctionComponent = () => {
  function useQuery() {
    return new URLSearchParams(useLocation().search)
  }

  const query = useQuery()

  return (
    <FullContent
      title={(query.get('title') as string) || 'Notificação'}
      message={
        (query.get('msg') as string) || 'Está é uma página de notificação'
      }
      link={{
        url: (query.get('url') as string) || '/',
        text: (query.get('text') as string) || 'Página inicial',
      }}
    />
  )
}

export default Notify
