import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// import GlobalStyle from './styles/globals';
import './styles/globals.css';

// import AppProvider from './hooks';

import Routes from './routes';

const App: React.FC = () => {
  return (
    <Router>
      <Routes />
    </Router>
  );
};

export default App;
