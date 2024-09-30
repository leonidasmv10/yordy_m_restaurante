
import { useEffect, useState } from "react";
import BaseLayout from './components/layouts/BaseLayout';

import ContactoController from './controllers/ContactoController'

function App() {

  const contactoController = new ContactoController();


  const contacto_test = {
    "nombre": "El chino X",
    "imagenes": "base64 XXX",
    "ubicacion": "coordenadas X de google maps",
    "instrucciones_destino": "Tomar el metro L3 zona universitaria a Estació Sants",
    "telefono": "632435678",
    "email": "el_chino_x@gmail.com",
    "horario_apertura": "10:00 a.m",
    "horario_cierre": "20:00 p.m",
    "festivos": "domingos"
  }


  // useEffect(() => {

  //   contactoController.agregar(contacto_test);
  // }, [])


  return (
    <>

      {/* HOLAAAAAAA */}
      <BaseLayout>
        <h2>Hola Mundo</h2>
      </BaseLayout>
    </>
  )
}

export default App
