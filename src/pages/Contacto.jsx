import { useEffect, useState } from "react";
import BaseLayout from '../components/layouts/BaseLayout';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
import ContactoController from '../controllers/ContactoController';
import ContactoComponent from "../components/ContactoComponent";

import '../styles/Contacto.css';

const Contacto = () => {
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
    }, []);

    return (
        <BaseLayout>
            <h2>Contacto</h2>

            <Carousel className="mb-4">
                {['./images/foto1.webp', './images/foto2.webp', './images/foto3.webp'].map((src, index) => (
                    <Carousel.Item key={index}>
                        <Image src={src} className="carousel-image" />
                        <Carousel.Caption>
                            <h3>{index === 0 ? "Entrada" : index === 1 ? "Experiencia" : "Estilo"}</h3>
                            <p>{index === 0 ? "Bienvenido" : index === 1 ? "Sumergete" : "Nro 1"}</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>

            <Row className="mb-4">
                {contactos.length === 0 ? (
                    <p>No hay información de contacto disponible.</p>
                ) : (
                    contactos.map(item => (
                        <Col key={item.Id} xs={12} md={3} className="mb-4">
                            <ContactoComponent contacto={item}>
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2993.068820409715!2d2.177942575918727!3d41.39431177129892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4a3cf16b4191b%3A0x465d881ae4585611!2z5rid56KX6aaZLVJlc3RhdXJhbnQgeGluZXMgbm9yZA!5e0!3m2!1ses-419!2sus!4v1727803126926!5m2!1ses-419!2sus"
                                    width="100%"
                                    height="400"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </ContactoComponent>
                        </Col>
                    ))
                )}
            </Row>
        </BaseLayout>
    );
};

export default Contacto;
