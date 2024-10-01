import { useEffect, useState } from "react";
import BaseLayout from '../components/layouts/BaseLayout';

import ReservaController from "../controllers/ReservaController";

const Reserva = () => {
    const [reservas, setReservas] = useState([]);
    const reservaController = new ReservaController();

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
                {reservas.map((item) => (
                    <h3 key={item.Id} >{item.nombre}</h3>
                ))}
            </BaseLayout>
        </>
    )
}
export default Reserva;