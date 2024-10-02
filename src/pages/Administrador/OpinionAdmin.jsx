import BaseLayout from '../../components/layouts/BaseLayout';
import React, { useEffect, useState } from 'react';

import Form from 'react-bootstrap/Form';

import OpinionController from '../../controllers/OpinionController';

const OpinionAdmin = () => {

    const [visitas, setVisitas] = useState([]);
    const opinionController = new OpinionController();

    const [checkboxes, setCheckboxes] = useState({});

    const handleCheckboxChange = (item) => (e) => {
        item.active = e.target.checked == true ? 1 : 0;

        setCheckboxes((prev) => ({
            ...prev,
            [item.Id]: item.active,
        }));

        opinionController.set_active(item.Id, item.active);
    };



    useEffect(() => {

        const fetchData = async () => {
            try {
                const listaDeVisitas = await opinionController.get();
                setVisitas(listaDeVisitas);

                const initialCheckboxes = listaDeVisitas.reduce((acc, visita) => {
                    acc[visita.Id] = visita.active == 1 ? true : false; // Aquí asignas el estado a cada checkbox
                    return acc;
                }, {});

                setCheckboxes(initialCheckboxes); // Actualiza el estado

            } catch (error) {
                console.error("Error al obtener los datos:", error);
            }
        };

        fetchData();
    }, [])

    useEffect(() => {
        console.log(visitas);
    }, [visitas])

    return (
        <>
            <BaseLayout>



                <h2>Opiniones</h2>
                {visitas.map(item => (

                    <div key={item.Id}>


                        <p>{item.nombre} </p>

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
export default OpinionAdmin;