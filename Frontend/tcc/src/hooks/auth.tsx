import { AxiosResponse } from 'axios';
import React, { createContext, useCallback, useContext, useState } from 'react';

import api from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
  provider: string;
}

interface AuthContextData {
  user: User;
  response: AxiosResponse | undefined;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [rest, setRest] = useState<AxiosResponse>();
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@WebEduca:token');
    const user = localStorage.getItem('@WebEduca:user');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password, provider }) => {
    const response = await api.post(provider, {
      email,
      password,
    });
    setRest(response);

    console.log('Salvando no Storage');

    const { token, user } = response.data;

    localStorage.setItem('@WebEduca:token', token);
    localStorage.setItem('@WebEduca:user', JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@WebEduca:token');
    localStorage.removeItem('@WebEduca:user');

    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    (user: User) => {
      localStorage.setItem('@WebEduca:user', JSON.stringify(user));

      setData({
        token: data.token,
        user,
      });
    },
    [data.token],
  );

  return (
    <AuthContext.Provider
      value={{ user: data.user, response: rest, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
