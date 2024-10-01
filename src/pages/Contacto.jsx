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

                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2993.068820409715!2d2.177942575918727!3d41.39431177129892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4a3cf16b4191b%3A0x465d881ae4585611!2z5rid56KX6aaZLVJlc3RhdXJhbnQgeGluZXMgbm9yZA!5e0!3m2!1ses-419!2sus!4v1727803126926!5m2!1ses-419!2sus"
                    width="600"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </BaseLayout>
        </>
    )
}
export default Contacto;