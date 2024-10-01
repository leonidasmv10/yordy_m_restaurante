import { useEffect, useState } from "react";
import BaseLayout from '../components/layouts/BaseLayout';

import PlatoController from '../controllers/PlatoController'
import CategoriaPlatoController from '../controllers/CategoriaPlatoController'
import TipoPlatoController from '../controllers/TipoPlatoController'
import ServicioController from '../controllers/ServicioController'
import MenuController from '../controllers/MenuController'

const Menu = () => {

    const [platos, setPlatos] = useState([]);
    const [categoriaPlatos, setCatetoriaPlatos] = useState([]);
    const [tipoPlatos, setTipoPlatos] = useState([]);
    const [servicios, setServicios] = useState([]);
    const [menus, setMenus] = useState([]);

    const platoController = new PlatoController();
    const categoriaPlatoController = new CategoriaPlatoController();
    const tipoPlatoController = new TipoPlatoController();
    const servicioController = new ServicioController();
    const menuController = new MenuController();

    useEffect(() => {

        const fetchData = async () => {
            try {
                const listaDePlatos = await platoController.get();
                setPlatos(listaDePlatos);

                console.log(listaDePlatos);

                const listaDeCategoriaPlatos = await categoriaPlatoController.get();
                setCatetoriaPlatos(listaDeCategoriaPlatos);

                const listaDeTipoPlatos = await tipoPlatoController.get();
                setTipoPlatos(listaDeTipoPlatos);

                const listaDeServicios = await servicioController.get();
                setServicios(listaDeServicios);

                const listaDeMenus = await menuController.get();
                setMenus(listaDeMenus);

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
        console.log(tipoPlatos);
    }, [tipoPlatos])

    useEffect(() => {
        console.log(menus);
    }, [menus])

    useEffect(() => {
        console.log(servicios);
    }, [servicios])


    return (
        <>
            <BaseLayout>
                <h2>Menu</h2>

                <h3>--- Platos ---</h3>
                {platos.map((item) => (
                    <h3 key={item.Id} >{item.nombre} - {item.id_categoria_plato} - {item.id_tipo_plato}</h3>
                ))}

                <h3>--- Categoria Platos ---</h3>
                {categoriaPlatos.map((item) => (
                    <h3 key={item.Id} >{item.nombre}</h3>
                ))}

                <h3>--- Tipo Platos ---</h3>
                {tipoPlatos.map((item) => (
                    <h3 key={item.Id} >{item.nombre}</h3>
                ))}

                <h3>--- Servicios ---</h3>
                {servicios.map((item) => (
                    <h3 key={item.Id} >{item.nombre}</h3>
                ))}

                <h3>--- Menu ---</h3>
                {menus.map((item) => (
                    <h3 key={item.Id} >{item.plato_id}</h3>
                ))}
            </BaseLayout>
        </>
    )
}
export default Menu;