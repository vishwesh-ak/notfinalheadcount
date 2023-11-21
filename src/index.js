import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HashRouter as Router } from 'react-router-dom';

 ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <App />
  </Router>
);
 
reportWebVitals();
