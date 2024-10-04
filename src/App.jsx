import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Inicio from './pages/Inicio';
import Contacto from './pages/Contacto';
import Carta from './pages/Carta';
import Menu from './pages/Menu';
import Reserva from './pages/Reserva';
import Visitas from './pages/Visita';
import MenuAdmin from './pages/Administrador/MenuAdmin'
import ReservaAdmin from './pages/Administrador/ReservaAdmin'
import OpinionAdmin from './pages/Administrador/OpinionAdmin'


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
        <Route path="/admin/menu" element={<MenuAdmin />} />
        <Route path="/admin/reserva" element={<ReservaAdmin />} />
        <Route path="/admin/opiniones" element={<OpinionAdmin />} />
      </Routes>
    </>
  );
}

export default App;
