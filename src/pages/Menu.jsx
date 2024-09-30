import { useEffect, useState } from "react";
import BaseLayout from '../components/layouts/BaseLayout';

import PlatoController from '../controllers/ContactoController'
import CategoriaPlatoController from '../controllers/CategoriaPlatoController'
import TipoPlatoController from '../controllers/TipoPlatoController'

const Menu = () => {

    const [platos, setPlatos] = useState([]);
    const [categoriaPlatos, setCatetoriaPlatos] = useState([]);
    const [tipoPlatos, setTipoPlatos] = useState([]);

    const platoController = new PlatoController();
    const categoriaPlatoController = new CategoriaPlatoController();
    const tipoPlatoController = new TipoPlatoController();

    useEffect(() => {

        const fetchData = async () => {
            try {
                const listaDePlatos = await platoController.get();
                setPlatos(listaDePlatos);

                console.log("URL: " + platoController.url_nocodb);
                console.log(listaDePlatos);

                const listaDeCategoriaPlatos = await categoriaPlatoController.get();
                setCatetoriaPlatos(listaDeCategoriaPlatos);

                const listaDeTipoPlatos = await tipoPlatoController.get();
                setTipoPlatos(listaDeTipoPlatos);
            } catch (error) {
                console.error("Error al obtener los datos:", error);
            }
        };

        fetchData();
    }, [])

    return (
        <>
            <BaseLayout>
                <h2>Menu</h2>
                {platos.map((item, index) => (
                    <>
                        <h3 key={item.Id} >{item.nombre} - {item.id_categoria_plato} - {item.id_tipo_plato}</h3>
                    </>
                ))}
            </BaseLayout>
        </>
    )
}
export default Menu;