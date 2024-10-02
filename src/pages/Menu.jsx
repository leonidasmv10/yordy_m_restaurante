import { useEffect, useState } from "react";
import BaseLayout from '../components/layouts/BaseLayout';

import PlatoController from '../controllers/PlatoController'
import CategoriaPlatoController from '../controllers/CategoriaPlatoController'
import ServicioController from '../controllers/ServicioController'

const Menu = () => {

    const [platos, setPlatos] = useState([]);
    const [categoriaPlatos, setCatetoriaPlatos] = useState([]);
    const [servicios, setServicios] = useState([]);

    const platoController = new PlatoController();
    const categoriaPlatoController = new CategoriaPlatoController();
    const servicioController = new ServicioController();

    useEffect(() => {

        const fetchData = async () => {
            try {
                const listaDePlatos = await platoController.get();
                setPlatos(listaDePlatos);

                const listaDeCategoriaPlatos = await categoriaPlatoController.get();
                setCatetoriaPlatos(listaDeCategoriaPlatos);

                const listaDeServicios = await servicioController.get();
                setServicios(listaDeServicios);

            } catch (error) {
                console.error("Error al obtener los datos:", error);
            }
        };

        fetchData();
    }, [])

    useEffect(() => {
        console.log(platos);
    }, [platos])

    useEffect(() => {
        console.log(categoriaPlatos);
    }, [categoriaPlatos])

    useEffect(() => {
        console.log(servicios);
    }, [servicios])


    return (
        <>
            <BaseLayout>
                <h2>Menu</h2>

                <h3>--- Platos ---</h3>
                {platos.map((item) => (
                    <h3 key={item.Id} >{item.nombre} - {item.categoria_plato_id} - {item.lista_servicio_id}</h3>
                ))}

                <h3>--- Categoria Platos ---</h3>
                {categoriaPlatos.map((item) => (
                    <h3 key={item.Id} >{item.nombre}</h3>
                ))}

                <h3>--- Servicios ---</h3>
                {servicios.map((item) => (
                    <h3 key={item.Id} >{item.nombre}</h3>
                ))}

            </BaseLayout>
        </>
    )
}
export default Menu;