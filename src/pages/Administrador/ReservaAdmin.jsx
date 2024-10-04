import BaseLayout from '../../components/layouts/BaseLayout';
import React, { useEffect, useState } from 'react';

import ReservaController from '../../controllers/ReservaController';
import Table from 'react-bootstrap/Table';

const ReservaAdmin = () => {

    const [reservas, setReservas] = useState([]);
    const reservaController = new ReservaController();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const listaDeReservas = await reservaController.get();
                setReservas(listaDeReservas);
            } catch (error) {
                console.error("Error al obtener los datos:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <BaseLayout>
            <h2>Reservas</h2>
            {reservas.length === 0 ? (
                <p>No hay reservas disponibles.</p>
            ) : (
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Correo</th>
                            <th>Teléfono</th>
                            <th>Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservas.map((item) => (
                            <tr key={item.Id}>
                                <td>{item.nombre}</td>
                                <td>{item.correo}</td>
                                <td>{item.telefono}</td>
                                <td>{item.fecha}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </BaseLayout>
    );
};

export default ReservaAdmin;
