import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx'
import { Auth0Provider } from '@auth0/auth0-react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    <Auth0Provider
      domain="devgrids.eu.auth0.com"
      clientId="DP9TpCwlcYoSiPbCh7rf8I9wwY1wmNHO"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <App />
      <ToastContainer
        position="top-right" // Puedes cambiar la posición del toast
        autoClose={3000} // Tiempo en milisegundos antes de cerrar automáticamente
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Auth0Provider>
  </BrowserRouter>
  // <StrictMode>

  // </StrictMode>,
)
