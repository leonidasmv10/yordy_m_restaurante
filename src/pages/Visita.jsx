import BaseLayout from '../components/layouts/BaseLayout';
import React, { useEffect, useState } from 'react';
import OpinionController from '../controllers/OpinionController'
import VisitaForm from '../components/VisitaForm'

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Visita = () => {

    const [visitas, setVisitas] = useState([]);
    const opinionController = new OpinionController();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const listaDeVisitas = await opinionController.get();
                setVisitas(listaDeVisitas);
            } catch (error) {
                console.error("Error al obtener los datos:", error);
            }
        };

        fetchData();
    }, [])

    useEffect(() => {
        console.log(visitas);
    }, [visitas])

    const handleFormSubmit = (data) => {
        data = { ...data, active: 0 }
        console.log("Datos del formulario:", data);

        opinionController.add(data);
    };

    return (
        <>
            <BaseLayout>

                <Button variant="primary" onClick={handleShow}>
                    Registra tu opinión
                </Button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Formulario</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <VisitaForm onSubmit={handleFormSubmit} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cerrar
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Subir Opinión
                        </Button>
                    </Modal.Footer>
                </Modal>

                <h2>Visita</h2>

                {visitas.map(item => {
                    if (item.active == 1) {
                        return <p>{item.nombre}</p>;
                    }
                    return null;
                })}
            </BaseLayout>
        </>
    )
}
export default Visita;