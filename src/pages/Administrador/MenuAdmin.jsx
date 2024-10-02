import { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import Select from 'react-select';
import BaseLayout from '../../components/layouts/BaseLayout';

import PlatoController from "../../controllers/PlatoController";
import ServicioController from '../../controllers/ServicioController';
import ListaServicioController from "../../controllers/ListaServicioController";

const MenuAdmin = () => {
    const [platos, setPlatos] = useState([]);
    const [servicios, setServicios] = useState([]);
    const [listaDeServicios, setListaDeServicios] = useState([]);
    const [checkboxes, setCheckboxes] = useState({});
    const [selectedOptions, setSelectedOptions] = useState({});
    const [options, setOptions] = useState([]);

    const platoController = new PlatoController();
    const servicioController = new ServicioController();
    const listaServicioController = new ListaServicioController();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Cargar la lista de platos
                const listaDePlatos = await platoController.get();
                setPlatos(listaDePlatos);

                // // Inicializar checkboxes
                if (listaDePlatos && listaDePlatos.length > 0) {
                    const initialCheckboxes = listaDePlatos.reduce((acc, plato) => {
                        acc[plato.Id] = plato.activo == 1;
                        return acc;
                    }, {});
                    setCheckboxes(initialCheckboxes);
                }


                // Cargar los servicios disponibles y crear las opciones para el select
                const listaDeServicios = await servicioController.get();
                setServicios(listaDeServicios);


                // Cargar los servicios disponibles y crear las opciones para el select
                const listaContenedorDeServicios = await listaServicioController.get();
                setListaDeServicios(listaContenedorDeServicios);
                // console.log(listaContenedorDeServicios);

                // await new Promise(resolve => setTimeout(resolve, 200))

                // Añadir servicios como opciones en el select
                const nuevasOpciones = listaDeServicios.map(element => ({
                    value: element.Id,
                    label: element.nombre
                }));
                setOptions(nuevasOpciones);

                // 3. Asignar los servicios seleccionados a `selectedOptions`
                const initialSelectedOptions = {};

                // for (const plato of listaDePlatos) {

                //     const servicesIds = await listaServicioController.get_services_id_by_dish_id(plato.Id);
                //     console.log(servicesIds);
                //     await new Promise(resolve => setTimeout(resolve, 200))

                //     if (servicesIds) {
                //         initialSelectedOptions[plato.Id] = nuevasOpciones.filter(option =>
                //             servicesIds.includes(option.value)
                //         );
                //     }
                // }

                for (const plato of listaDePlatos) {
                    // console.log(plato.nombre + " - ID: " + plato.Id);
                    let servicesIds = [];
                    for (const listaServicio of listaContenedorDeServicios) {
                        if (plato.Id == listaServicio.plato_id) {
                            // console.log(listaServicio.servicio_id);
                            servicesIds.push(listaServicio.servicio_id);
                        }
                    }
                    if (servicesIds) {
                        // console.log(servicesIds);
                        initialSelectedOptions[plato.Id] = nuevasOpciones.filter(option =>
                            servicesIds.includes(option.value)
                        );
                    }
                }

                setSelectedOptions(initialSelectedOptions);
            } catch (error) {
                console.error("Error al obtener los datos:", error);
            }
        };

        fetchData();
    }, []);

    const handleChange = (platoId) => (selected) => {
        setSelectedOptions((prevOptions) => {
            const previousSelected = prevOptions[platoId] || [];
            const currentValues = (selected || []).map((option) => option.value);

            // Detectar los IDs eliminados
            const previousValues = previousSelected.map((option) => option.value);
            const removedValues = previousValues.filter((value) => !currentValues.includes(value));
            if (removedValues.length > 0) {
                console.log(`Opciones eliminadas para el plato con ID ${platoId}:`, removedValues);
                for (const serviceId of removedValues) {
                    for (const listaServicio of listaDeServicios) {
                        if (serviceId == listaServicio.servicio_id) {
                            listaServicioController.delete(listaServicio.Id);
                        }
                    }
                }
            }

            else if (currentValues.length > 0) {
                // Imprimir opciones actuales
                console.log(`Opciones seleccionadas para el plato con ID ${platoId}:`, currentValues);

                const newService = {
                    "plato_id": platoId,
                    "servicio_id": currentValues[currentValues.length - 1]
                }
                listaServicioController.add(newService);
            }

            return {
                ...prevOptions,
                [platoId]: selected || [],
            };
        });
    };

    const handleCheckboxChange = (item) => (e) => {
        const activo = e.target.checked ? 1 : 0;

        setCheckboxes((prev) => ({
            ...prev,
            [item.Id]: e.target.checked,
        }));

        platoController.set_active(item.Id, activo);
    };

    return (
        <BaseLayout>
            <h2>Admin Menú</h2>
            <label htmlFor="servicio">Platos</label><br />

            {platos && platos.length > 0 && platos.map((item) => (
                <div key={item.Id}>
                    <h4>{item.nombre}</h4>
                    <label htmlFor="servicio">Servicio</label><br />

                    <Select
                        isMulti
                        options={options}
                        value={selectedOptions[item.Id] || []}
                        onChange={handleChange(item.Id)}
                        placeholder="Seleccione una o más opciones"
                    />

                    <Form.Check
                        type={'checkbox'}
                        id={`${item.Id}`}
                        label="Activar a la carta"
                        checked={checkboxes[item.Id] || false}
                        onChange={handleCheckboxChange(item)}
                    />
                    <br />
                </div>
            ))}

        </BaseLayout>
    );
};

export default MenuAdmin;
