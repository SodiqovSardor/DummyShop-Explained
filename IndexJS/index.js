import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Find the empty <div id="root"> from public/index.html.
// This is the only spot in the real HTML page that React is allowed to control.
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the whole app (starting from <App />) into that div.
// React.StrictMode is a dev-only helper that catches certain bugs early —
// it does nothing in production and is invisible to the user.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Create React App boilerplate for measuring performance metrics.
// Not custom logic — safe to ignore when explaining the app itself.
reportWebVitals();
