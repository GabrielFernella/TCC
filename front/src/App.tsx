import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import io from "socket.io-client";

// import GlobalStyle from './styles/globals';
import './assets/styles/global.css';

import AppProvider from './hooks';

import Routes from './routes';

const App: React.FC = () => {

  return (
    <Router>
      <AppProvider>
        <Routes />
      </AppProvider>
    </Router>
  );
};

export default App;
