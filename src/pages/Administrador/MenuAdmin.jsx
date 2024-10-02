import { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
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
        setSelectedOptions((prevOptions) => {
            const previousSelected = prevOptions[platoId] || [];
            const updatedOptions = {
                ...prevOptions,
                [platoId]: selected || [],
            };

            // Detectar los IDs eliminados comparando `previousSelected` y `selected`
            const previousValues = previousSelected.map((option) => option.value);
            const currentValues = (selected || []).map((option) => option.value);

            const removedValues = previousValues.filter((value) => !currentValues.includes(value));
            if (removedValues.length > 0) {
                console.log(`Opciones eliminadas para el plato con ID ${platoId}:`, removedValues);
            }

            // Imprimir opciones actuales
            console.log(`Opciones seleccionadas para el plato con ID ${platoId}:`, currentValues);

            return updatedOptions;
        });
    };


    const handleCheckboxChange = (item) => (e) => {
        item.activo = e.target.checked == true ? 1 : 0;

        setCheckboxes((prev) => ({
            ...prev,
            [item.Id]: item.activo,
        }));

        platoController.set_active(item.Id, item.activo);
    };

    const handleFormSubmit = (data) => {

        console.log("Datos del formulario:", data);
    };


    useEffect(() => {

        const fetchData = async () => {
            try {
                const listaDePlatos = await platoController.get();
                setPlatos(listaDePlatos);

                const initialCheckboxes = listaDePlatos.reduce((acc, plato) => {
                    acc[plato.Id] = plato.activo == 1 ? true : false; // Aquí asignas el estado a cada checkbox
                    return acc;
                }, {});

                setCheckboxes(initialCheckboxes); // Actualiza el estado

                const listaDeCategoriaPlatos = await categoriaPlatoController.get();
                setCatetoriaPlatos(listaDeCategoriaPlatos);

                const listaDeServicios = await servicioController.get();
                setServicios(listaDeServicios);

                for (const element of listaDeServicios) {
                    // console.log(element);
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

                        <Form.Check
                            key={item.Id}
                            type={'checkbox'}
                            id={`${item.Id}`}
                            label={item.nombre}
                            checked={checkboxes[item.Id] || false}
                            onChange={handleCheckboxChange(item)}

                        />

                    </div>

                ))}


            </BaseLayout>
        </>
    )
}
export default MenuAdmin;