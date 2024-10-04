import { useState } from "react";
import BaseLayout from '../components/layouts/BaseLayout';
import ReservaController from "../controllers/ReservaController";
import ReservaForm from "../components/ReservaForm";
import { format } from 'date-fns';
import { toast } from 'react-toastify';

import ConfirmationModal from "../components/ConfirmationModal";

const Reserva = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataReserva, setDataReserva] = useState(null);

    const reservaController = new ReservaController();

    const handleAddReserva = async () => {
        if (!dataReserva) return;
        await reservaController.add(dataReserva);
        setIsModalOpen(false);
        toast.success('¡Operación realizada correctamente!');
    };

    const handleFormSubmit = (data) => {
        const formattedStartDate = format(data.fecha, 'dd/MM/yyyy HH:mm');
        const reservaData = { ...data, fecha: formattedStartDate };
        setDataReserva(reservaData);
        setIsModalOpen(true);
    };

    return (
        <BaseLayout>
            <ReservaForm onSubmit={handleFormSubmit} />
            <ConfirmationModal

                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleAddReserva}
                message="¿Estás seguro de que deseas hacer una reserva?"
            />
        </BaseLayout>
    );
};

export default Reserva;
