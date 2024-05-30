import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GlobalStyle } from './styles/GlobalStyle';
import { GlobalProvider } from './context/globalContext';
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <GlobalStyle />
        <GlobalProvider>
          <App />
        </GlobalProvider>
    </Router>
  </React.StrictMode>
);