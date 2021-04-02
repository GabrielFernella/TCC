import React from 'react'
import './assets/styles/global.css'
import Routes from './routes'
import AuthProvider from './contexts/auth'
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
