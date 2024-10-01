import BaseLayout from '../../components/layouts/BaseLayout';
import React, { useEffect, useState } from 'react';

import Form from 'react-bootstrap/Form';

import OpinionController from '../../controllers/OpinionController';

const OpinionAdmin = () => {

    const [checkboxes, setCheckboxes] = useState({});

    const handleCheckboxChange = (id) => (e) => {
        setCheckboxes((prev) => ({
            ...prev,
            [id]: e.target.checked,
        }));
    };


    const [visitas, setVisitas] = useState([]);
    const opinionController = new OpinionController();

    useEffect(() => {

        const fetchData = async () => {
            try {
                const listaDeVisitas = await opinionController.get();
                setVisitas(listaDeVisitas);
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
                            checked={item.active == 1 ? true : false}
                            onChange={handleCheckboxChange(item.Id)}
                        />

                    </div>

                ))}
            </BaseLayout>
        </>
    )
}
export default OpinionAdmin;