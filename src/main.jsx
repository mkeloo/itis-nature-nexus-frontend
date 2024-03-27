import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import App from './App.jsx';
import './index.css';

// Find the root element in your HTML
const rootElement = document.getElementById('root');
// Create a root for the ReactDOM
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      {' '}
      {/* Wrap the App component with BrowserRouter */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
