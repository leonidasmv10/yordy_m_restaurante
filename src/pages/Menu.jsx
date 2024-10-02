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
                {categoriaPlatos.map(categoria => (
                    <li key={categoria.id}>
                        <h2>{categoria.nombre}</h2>
                        <ul>
                            {platos.map(plato => {
                                if (plato.activo == 1 && plato.categoria_plato_id === categoria.Id) {
                                    return <div>

                                        <li key={plato.Id}>{plato.nombre} - Precio: {plato.precio} euros</li>
                                        <p>Servicios: </p>

                                    </div>
                                }
                                return null;
                            })}
                        </ul>

                    </li>
                ))}


                {/* <h3>--- Categoria Platos ---</h3>
                {categoriaPlatos.map((item) => (
                    <h3 key={item.Id} >{item.nombre}</h3>
                ))}

                <h3>--- Servicios ---</h3>
                {servicios.map((item) => (
                    <h3 key={item.Id} >{item.nombre}</h3>
                ))} */}

            </BaseLayout>
        </>
    )
}
export default Menu;