import { useEffect, useState } from "react";
import BaseLayout from '../components/layouts/BaseLayout';

import ContactoController from '../controllers/ContactoController'
import ContactoComponent from "../components/ContactoComponent";
import CarouselComponent from "../components/CarouselComponent";

const Contacto = () => {

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

    const [contactos, setContactos] = useState([]);
    const contactoController = new ContactoController();

    useEffect(() => {

        const fetchData = async () => {
            try {
                const listaDeContactos = await contactoController.get();
                setContactos(listaDeContactos);
            } catch (error) {
                console.error("Error al obtener los datos:", error);
            }
        };

        fetchData();
    }, [])


    useEffect(() => {
        console.log(contactos);

        // for (let i = 0; i < 3; i++) {
        //     contactoController.delete(i);
        // }
    }, [contactos])

    return (
        <>
            <BaseLayout>
                <h2>Contacto</h2>
                <CarouselComponent></CarouselComponent>
                {contactos.map((item) => (
                    <div key={item.Id}>
                        <ContactoComponent contacto={item}></ContactoComponent>
                        <br></br>
                    </div>
                ))}
            </BaseLayout>
        </>
    )
}
export default Contacto;