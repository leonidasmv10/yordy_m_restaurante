import { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import Select from 'react-select';
import BaseLayout from '../../components/layouts/BaseLayout';

import PlatoController from "../../controllers/PlatoController";
import ServicioController from '../../controllers/ServicioController';
import ListaServicioController from "../../controllers/ListaServicioController";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import PlatoCard from "../../components/PlatoCard";

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

            let currentValuesLenght = currentValues.length;
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
            else if (currentValuesLenght > 0) {
                // Imprimir opciones actuales
                console.log(`Opciones seleccionadas para el plato con ID ${platoId}:`, currentValues);

                const newService = {
                    "plato_id": platoId,
                    "servicio_id": currentValues[currentValuesLenght - 1]
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
            <h2>Gestionar Menú Semanal</h2>

            <Row>
                {platos && platos.length > 0 && platos.map((item) => (


                    <Col xs={6} sm={4} md={3} lg={3} key={item.Id}>

                        <PlatoCard key={item.Id} plato={item}>

                            <Select
                                isMulti
                                options={options}
                                value={selectedOptions[item.Id] || []}
                                onChange={handleChange(item.Id)}
                                placeholder="Seleccione una o más servicios"
                            />

                            <Form.Check
                                type={'checkbox'}
                                id={`${item.Id}`}
                                label="Menú Semanal"
                                checked={checkboxes[item.Id] || false}
                                onChange={handleCheckboxChange(item)}
                            />
                        </PlatoCard>
                        <br></br>
                    </Col>
                ))}
            </Row>
        </BaseLayout>
    );
};

export default MenuAdmin;