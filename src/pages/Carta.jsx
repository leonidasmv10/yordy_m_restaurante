import BaseLayout from '../components/layouts/BaseLayout';
import React, { useEffect, useState } from 'react';
import PlatoController from '../controllers/PlatoController';
import CategoriaPlatoController from '../controllers/CategoriaPlatoController';
import PlatoCard from '../components/PlatoCard';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Carta = () => {
    const [platos, setPlatos] = useState([]);
    const [categoriaPlatos, setCategoriaPlatos] = useState([]);

    const platoController = new PlatoController();
    const categoriaPlatoController = new CategoriaPlatoController();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [listaDeCategoriaPlatos, listaDePlatos] = await Promise.all([
                    categoriaPlatoController.get(),
                    platoController.get(),
                ]);

                setCategoriaPlatos(listaDeCategoriaPlatos);
                setPlatos(listaDePlatos);
            } catch (error) {
                console.error("Error al obtener los datos:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <BaseLayout>
            {categoriaPlatos.map(categoria => (
                <div key={categoria.Id}>
                    <h2>{categoria.nombre}</h2>
                    <Row>
                        {platos
                            .filter(plato => plato.categoria_plato_id === categoria.Id)
                            .map(plato => (
                                <Col xs={6} sm={4} md={3} lg={3} key={plato.Id}>
                                    <PlatoCard plato={plato} />
                                </Col>
                            ))}
                    </Row>
                    <br></br>
                </div>
            ))}
        </BaseLayout>
    );
};

export default Carta;
