import BaseLayout from '../components/layouts/BaseLayout';
import React, { useEffect, useState } from 'react';
import OpinionController from '../controllers/OpinionController'
import VisitaForm from '../components/VisitaForm'

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Card from 'react-bootstrap/Card';
import ConfirmationModal from "../components/ConfirmationModal";

import { toast } from 'react-toastify';

const Visita = () => {

    const [visitas, setVisitas] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataVisita, setDataVisita] = useState(null);
    const [show, setShow] = useState(false);

    const opinionController = new OpinionController();

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

    const handleAddOpinion = async () => {
        if (!dataVisita) return;
        await opinionController.add(dataVisita);
        setIsModalOpen(false);
        handleClose();
        toast.success('¡Operación realizada correctamente!');
    };

    const handleFormSubmit = (data) => {
        data = { ...data, active: 0 }
        setDataVisita(data);
        setIsModalOpen(true);
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
                <Row>
                    {visitas.map(item => {
                        if (item.active == 1) {
                            return <Col xs={6} sm={4} md={3} lg={3} key={item.Id}>
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

                <ConfirmationModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onConfirm={handleAddOpinion}
                    message="¿Estás seguro de que quiere subir su opinión?"
                />
            </BaseLayout>
        </>
    )
}
export default Visita;