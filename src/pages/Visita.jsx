import BaseLayout from '../components/layouts/BaseLayout';
import React, { useEffect, useState } from 'react';
import OpinionController from '../controllers/OpinionController'
import VisitaForm from '../components/VisitaForm'

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Card from 'react-bootstrap/Card';

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

                </Modal>
                <br></br><br></br><br></br>
                <Container>
                    <Row>
                        {visitas.map(item => {
                            if (item.active == 1) {
                                return <Col>
                                    <Card style={{ width: '18rem' }}>
                                        <Card.Body>
                                            <Card.Title><strong>{item.nombre}</strong> </Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">{item.correo}</Card.Subtitle>
                                            <Card.Text>
                                                {item.texto}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            }
                            return null;
                        })}

                    </Row>
                </Container>
            </BaseLayout>
        </>
    )
}
export default Visita;