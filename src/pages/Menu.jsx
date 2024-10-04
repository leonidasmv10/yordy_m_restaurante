import { useEffect, useState } from "react";
import BaseLayout from '../components/layouts/BaseLayout';
import PlatoController from '../controllers/PlatoController';
import CategoriaPlatoController from '../controllers/CategoriaPlatoController';
import ServicioController from '../controllers/ServicioController';
import ListaServicioController from "../controllers/ListaServicioController";
import PlatoCard from '../components/PlatoCard';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Menu = () => {
    const [platos, setPlatos] = useState([]);
    const [categoriaPlatos, setCategoriaPlatos] = useState([]);
    const [servicios, setServicios] = useState([]);
    const [listaDeServicios, setListaDeServicios] = useState([]);

    const platoController = new PlatoController();
    const categoriaPlatoController = new CategoriaPlatoController();
    const servicioController = new ServicioController();
    const listaServicioController = new ListaServicioController();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [listaDePlatos, listaDeCategoriaPlatos, listaDeServicios, listaContenedorDeServicios] = await Promise.all([
                    platoController.get(),
                    categoriaPlatoController.get(),
                    servicioController.get(),
                    listaServicioController.get(),
                ]);

                setPlatos(listaDePlatos);
                setCategoriaPlatos(listaDeCategoriaPlatos);
                setServicios(listaDeServicios);
                setListaDeServicios(listaContenedorDeServicios);
            } catch (error) {
                console.error("Error al obtener los datos:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <BaseLayout>
            <Container>
                {categoriaPlatos.length === 0 ? (
                    <li>No hay categorías disponibles.</li>
                ) : (
                    categoriaPlatos.map((categoria) => {
                        const platosFiltrados = platos.filter((plato) => plato.activo === 1 && plato.categoria_plato_id === categoria.Id);
                        
                        return (
                            <div key={categoria.Id}>
                                <h2>{categoria.nombre}</h2>
                                {platosFiltrados.length === 0 ? (
                                    <p>No hay platos disponibles en esta categoría.</p> // Mensaje si no hay platos
                                ) : (
                                    <Row>
                                        {platosFiltrados.map((plato) => (
                                            <Col xs={6} sm={4} md={3} lg={3} key={plato.Id}>
                                                <PlatoCard plato={plato}>
                                                    <p><strong>Servicios:</strong></p>
                                                    <ul>
                                                        {listaDeServicios
                                                            .filter((listaDeServicio) => listaDeServicio.plato_id === plato.Id)
                                                            .flatMap((listaDeServicio) =>
                                                                servicios
                                                                    .filter(servicio => listaDeServicio.servicio_id === servicio.Id)
                                                                    .map(servicio => <li key={servicio.Id}>{servicio.nombre}</li>)
                                                            )}
                                                    </ul>
                                                </PlatoCard>
                                            </Col>
                                        ))}
                                    </Row>
                                )}
                                <br />
                            </div>
                        );
                    })
                )}
            </Container>
        </BaseLayout>
    );
};

export default Menu;
