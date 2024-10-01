import BaseLayout from '../components/layouts/BaseLayout';
import React, { useEffect, useState } from 'react';

import LoginButton from '../components/LoginButton';

import PlatoController from '../controllers/PlatoController';
import CategoriaPlatoController from '../controllers/CategoriaPlatoController';

const Carta = () => {

    const [platos, setPlatos] = useState([]);
    const [categoriaPlatos, setCategoriaPlatos] = useState([]);

    const platoController = new PlatoController();
    const categoriaPlatoController = new CategoriaPlatoController();

    async function fetchDataDishWithIdCategory(id_category) {
        const listaDePlatos = await platoController.get_by_id_category(id_category);
        setDishWithCategory(prevState => [...prevState, listaDePlatos]);
    }

    useEffect(() => {

        const fetchData = async () => {
            try {
                const listaDeCategoriaPlatos = await categoriaPlatoController.get();
                setCategoriaPlatos(listaDeCategoriaPlatos);

                const listaDePlatos = await platoController.get();
                setPlatos(listaDePlatos);

                // for (let i = 0; i < categoriaPlatos.length; i++) {
                //     console.log("ID: " + listaDeCategoriaPlatos[i].Id);
                //     fetchDataDishWithIdCategory(listaDeCategoriaPlatos[i].Id);
                // }

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

    return (
        <>
            <BaseLayout>
                <h2>Carta</h2>

                <h3>--- Categoria Platos ---</h3>


                {categoriaPlatos.map(categoria => (
                    <li key={categoria.id}>
                        <h2>{categoria.nombre}</h2>
                        <ul>
                            {platos.map(plato => {
                                if (plato.id_categoria_plato === categoria.Id) {
                                    return <li key={plato.Id}>{plato.nombre} - Precio: {plato.precio} euros</li>;
                                }
                                return null;
                            })}
                        </ul>
                    </li>
                ))}


                <LoginButton></LoginButton>
            </BaseLayout>
        </>
    )
}
export default Carta;