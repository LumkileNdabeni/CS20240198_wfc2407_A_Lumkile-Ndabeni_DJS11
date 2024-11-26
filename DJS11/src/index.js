import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import './styles/App.css'; // Import global styles here

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);