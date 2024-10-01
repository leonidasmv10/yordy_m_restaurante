import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import BaseLayout from '../components/layouts/BaseLayout';

import ReservaController from "../controllers/ReservaController";

import ReservaForm from "../components/ReservaForm";
import { format } from 'date-fns';


const Reserva = () => {

    const [reservas, setReservas] = useState([]);
    const reservaController = new ReservaController();

    const handleFormSubmit = (data) => {
        const formattedStartDate = format(data.fecha, 'dd/MM/yyyy HH:mm');
        data = { ...data, fecha: formattedStartDate }
        console.log("Datos del formulario:", data);

        reservaController.add(data);
    };


    useEffect(() => {

        const fetchData = async () => {
            try {
                const listaDeReservas = await reservaController.get();
                setReservas(listaDeReservas);
            } catch (error) {
                console.error("Error al obtener los datos:", error);
            }
        };

        fetchData();
    }, [])


    useEffect(() => {
        console.log(reservas);
    }, [reservas])

    return (
        <>
            <BaseLayout>
                <h2>Reserva</h2>

                <ReservaForm onSubmit={handleFormSubmit} />


                {reservas.map((item) => (
                    <h3 key={item.Id} >{item.nombre}</h3>
                ))}
            </BaseLayout>
        </>
    )
}
export default Reserva;