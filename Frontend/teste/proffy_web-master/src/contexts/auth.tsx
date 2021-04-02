import React, { createContext, useState, useEffect } from 'react'
import * as auth from '../services/auth'
import api from '../services/api'
import { UserData } from '../services/auth'
import FlashMessage from '../components/FlashMessage'

interface AuthContextData {
  signed: boolean
  user: UserData
  signIn(params: { password: string; email: string }): Promise<UserData>

  register(params: {
    password: string
    email: string
    name: string
    surname: string
  }): Promise<UserData>
  signOut(): void
  emitMessage(text: string, type?: string, time?: number): void
  setLocalUser(param: UserData): void
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const AuthProvider: React.FunctionComponent = ({ children }) => {
  api.interceptors.response.use(
    function (response) {
      return response
    },
    async function (error) {
      if (401 === error.response.status) {
        signIn({
          email: '',
          password: '',
          refresh_token: JSON.parse(
            localStorage.getItem('@proffy:refresh_token') as string,
          ),
        })
      } else if (403 === error.response.status) {
        emitMessage(
          'Você não tem permissão para acessar os dados desta página.',
          'error',
        )
      } else if (404 === error.response.status) {
        emitMessage('Esta página não foi encontrada.', 'error')
      } else {
        return Promise.reject(error)
      }
    },
  )

  const [user, setUser] = useState<UserData | null>(null)
  const [flash, setFlash] = useState<{
    text: string
    type: string
    time: number | undefined
  }>({ text: '', type: 'success', time: undefined })

  function setLocalUser(userData: UserData) {
    setUser(userData)
    localStorage.setItem('@proffy:user', JSON.stringify(userData))
  }

  function setLocalToken(tokenData: string, refreshTokenData: string) {
    // setToken(tokenData)
    api.defaults.headers['Authorization'] = `Bearer ${tokenData}`
    localStorage.setItem('@proffy:token', JSON.stringify(tokenData))
    localStorage.setItem(
      '@proffy:refresh_token',
      JSON.stringify(refreshTokenData),
    )
  }

  async function signIn(params: {
    email: string
    password: string
    refresh_token?: string
  }) {
    await auth
      .authenticate(params)
      .then((response) => {
        const { token, refresh_token, user } = response.data
        setLocalToken(token, refresh_token)
        setLocalUser(user)
        api.defaults.headers['Authorization'] = `Bearer ${token}`
      })
      .catch(() => {
        signOut()
      })
  }

  function signOut() {
    localStorage.removeItem('@proffy:user')
    localStorage.removeItem('@proffy:token')
    localStorage.removeItem('@proffy:refresh_token')

    setUser(null)
  }

  async function register(params: {
    email: string
    password: string
    name: string
    surname: string
  }) {
    await auth.register(params)
    return
    // setLocalToken(response.token, response.refresh_token)
    // setLocalUser(response.user)
  }

  function emitMessage(text: string, type: string = 'success', time?: number) {
    setFlash({ text, type, time })
  }

  useEffect(
    // @ts-ignore
    () => {
      setUser(JSON.parse(localStorage.getItem('@proffy:user') as string))
      setLocalToken(
        JSON.parse(localStorage.getItem('@proffy:token') as string),
        JSON.parse(localStorage.getItem('@proffy:refresh_token') as string),
      )

      let refresh_token = localStorage.getItem(
        '@proffy:refresh_token',
      ) as string

      if (typeof refresh_token === 'undefined' || refresh_token === 'null' || refresh_token === '') {
        signOut()
      } else {
        refresh_token = JSON.parse(refresh_token)
        signIn({ email: '', password: '', refresh_token }).then()
      }
    },
    // eslint-disable-next-line
    [],
  )

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        // @ts-ignore
        user,
        // @ts-ignore
        signIn,
        signOut,
        // @ts-ignore
        register,
        setLocalUser,
        emitMessage,
      }}
    >
      <FlashMessage text={flash.text} type={flash.type} time={flash.time} />
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
