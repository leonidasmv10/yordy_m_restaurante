import BaseLayout from '../../components/layouts/BaseLayout';
import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import OpinionController from '../../controllers/OpinionController';
import ConfirmationModal from '../../components/ConfirmationModal';
import { Button } from 'react-bootstrap';

import Card from 'react-bootstrap/Card';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const OpinionAdmin = () => {
    const [visitas, setVisitas] = useState([]);
    const opinionController = new OpinionController();
    const [checkboxes, setCheckboxes] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null); // Estado para almacenar el ID seleccionado para eliminar

    const handleCheckboxChange = (item) => (e) => {
        item.active = e.target.checked ? 1 : 0;

        setCheckboxes((prev) => ({
            ...prev,
            [item.Id]: item.active,
        }));

        opinionController.set_active(item.Id, item.active);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const listaDeVisitas = await opinionController.get();
                setVisitas(listaDeVisitas);

                const initialCheckboxes = listaDeVisitas.reduce((acc, visita) => {
                    acc[visita.Id] = visita.active === 1; // Aquí asignas el estado a cada checkbox
                    return acc;
                }, {});

                setCheckboxes(initialCheckboxes); // Actualiza el estado
            } catch (error) {
                console.error("Error al obtener los datos:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        console.log(visitas);
    }, [visitas]);

    const handleDelete = (id) => {
        // Lógica de la acción a realizar
        console.log('Acción confirmada con el ID: ' + id);
        // Aquí podrías llamar a opinionController para eliminar la opinión
        setVisitas((prev) => prev.filter((item) => item.Id !== id)); // Opcional: elimina de la lista

        opinionController.delete(id);
    };

    return (
        <>
            <BaseLayout>
                <h2>Opiniones</h2>

                <Row>
                    {visitas.map(item => {

                        return <Col xs={6} sm={4} md={3} lg={3} key={item.Id}>
                            <Card>
                                <Card.Header>{item.correo}</Card.Header>
                                <Card.Body>
                                    <Card.Title>{item.nombre}</Card.Title>
                                    <Card.Text>
                                        {item.texto}
                                    </Card.Text>
                                    <Form.Check
                                        type={'checkbox'}
                                        id={`${item.Id}`}
                                        label="Mostrar al público"
                                        checked={checkboxes[item.Id] || false}
                                        onChange={handleCheckboxChange(item)}
                                    />
                                    <Button variant="danger" onClick={() => {
                                        setSelectedId(item.Id); // Guardar el ID en el estado
                                        setIsModalOpen(true);
                                    }}>
                                        Eliminar
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    })}

                </Row>

                <ConfirmationModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onConfirm={() => {
                        handleDelete(selectedId); // Llamar a handleDelete con el ID guardado
                        setIsModalOpen(false); // Cerrar el modal después de confirmar
                    }}
                    message="¿Estás seguro de que deseas eliminar esta opinión de forma definitiva?"
                />
            </BaseLayout>
        </>
    );
};

export default OpinionAdmin;
