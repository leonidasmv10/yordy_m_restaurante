import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BaseLayout from './components/layouts/BaseLayout';
import Header from './components/shared/Header';
import Inicio from './pages/Inicio';
import Contacto from './pages/Contacto';
import Carta from './pages/Carta';
import Menu from './pages/Menu';
import Reserva from './pages/Reserva';
import Visitas from './pages/Visita';


const App = () => {
  return (
    <>

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/carta" element={<Carta />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/reserva" element={<Reserva />} />
        <Route path="/visitas" element={<Visitas />} />
      </Routes>
    </>
  );
}

export default App;
