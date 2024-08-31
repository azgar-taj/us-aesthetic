import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import '@h0rn0chse/night-sky/dist/bundle'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
