import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ClubsProvider from './context';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ClubsProvider>
    <App />
    </ClubsProvider>
  </React.StrictMode>
);
