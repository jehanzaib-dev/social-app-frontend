import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/authContext.js';
import {SidebarProvider} from './context/sidebarContext.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
    <SidebarProvider>
    <App />
    </SidebarProvider>
    </AuthContextProvider>
  </React.StrictMode>
);