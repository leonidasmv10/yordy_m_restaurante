import { useEffect, useState } from "react";
import Select from 'react-select';
import BaseLayout from '../../components/layouts/BaseLayout';

import PlatoController from "../../controllers/PlatoController";
import CategoriaPlatoController from '../../controllers/CategoriaPlatoController'
import ServicioController from '../../controllers/ServicioController'

import MenuSelect from "../../components/MenuSelect";

const MenuAdmin = () => {
    const [platos, setPlatos] = useState([]);
    const [categoriaPlatos, setCatetoriaPlatos] = useState([]);
    const [servicios, setServicios] = useState([]);

    const platoController = new PlatoController();
    const categoriaPlatoController = new CategoriaPlatoController();
    const servicioController = new ServicioController();

    const [checkboxes, setCheckboxes] = useState({});

    const [selectedOptions, setSelectedOptions] = useState({});

    const [options, setOptions] = useState([

    ]);

    // Paso 2: Crear una función para añadir más opciones
    const añadirOpción = (nuevaOpción) => {
        setOptions(prevOptions => [...prevOptions, nuevaOpción]);
    };

    const handleChange = (platoId) => (selected) => {
        setSelectedOptions((prevOptions) => ({
            ...prevOptions,
            [platoId]: selected || [],
        }));
    };

    const handleCheckboxChange = (item) => (e) => {
        item.active = e.target.checked == true ? 1 : 0;

        setCheckboxes((prev) => ({
            ...prev,
            [item.Id]: item.active,
        }));

        opinionController.set_active(item.Id, item.active);
    };

    const handleFormSubmit = (data) => {

        console.log("Datos del formulario:", data);
    };


    useEffect(() => {

        const fetchData = async () => {
            try {
                const listaDePlatos = await platoController.get();
                setPlatos(listaDePlatos);

                const listaDeCategoriaPlatos = await categoriaPlatoController.get();
                setCatetoriaPlatos(listaDeCategoriaPlatos);

                const listaDeServicios = await servicioController.get();
                setServicios(listaDeServicios);

                for (const element of listaDeServicios) {
                    console.log(element);
                    añadirOpción({ value: element.Id, label: element.nombre });
                }




            } catch (error) {
                console.error("Error al obtener los datos:", error);
            }
        };

        fetchData();
    }, [])

    useEffect(() => {
        // console.log(platos);
    }, [platos])

    useEffect(() => {
        // console.log(categoriaPlatos);
    }, [categoriaPlatos])

    useEffect(() => {
        // console.log(servicios);
    }, [servicios])

    function obtenerSeleccionados() {
        const selectElement = document.getElementById("miSelect");
        const opcionesSeleccionadas = Array.from(selectElement.selectedOptions).map(option => option.value);
        console.log(opcionesSeleccionadas); // Mostrar los IDs seleccionados
    }


    return (
        <>
            <BaseLayout>
                <h2>Admin Menú</h2>

                <label htmlFor="servicio">Platos</label><br></br>

                {platos.map((item) => (
                    <div>

                        <h4>{item.nombre}</h4>

                        <br></br>
                        <label htmlFor="servicio">Servicio</label><br></br>

                        <Select
                            isMulti
                            options={options}
                            value={selectedOptions[item.Id] || []}
                            onChange={handleChange(item.Id)}
                            placeholder="Seleccione una o más opciones"
                        />
                        <button onClick={() => console.log(selectedOptions[item.Id]?.map(option => option.value))}>
                            Obtener Seleccionados
                        </button>

                    </div>

                ))}


            </BaseLayout>
        </>
    )
}
export default MenuAdmin;