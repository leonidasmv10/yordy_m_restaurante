import DatePicker from "react-datepicker";
import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";

const ReservaForm = ({ onSubmit }) => {
    const [startDate, setStartDate] = useState(new Date());
    const { register, handleSubmit, setValue } = useForm();

    register("fecha");

    const handleDateChange = (dateType, setDate) => date => {
        setValue(dateType, date);
        setDate(date);
    }

    const filterTime = (time) => {
        const hours = time.getHours();
        return hours >= 11 && hours <= 22;
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
                <label htmlFor="nombre">Nombre</label>
                <input
                    {...register("nombre")}
                    name="nombre"
                    type="text"
                    className="form-control"
                    id="nombre" />
            </div>

            <div className="form-group">
                <label htmlFor="correo">Correo eléctronico</label>
                <input
                    {...register("correo")}
                    name="correo"
                    type="text"
                    className="form-control"
                    id="correo" />
            </div>

            <div className="form-group">
                <label htmlFor="telefono">Telefono</label>
                <input
                    {...register("telefono")}
                    name="telefono"
                    type="text"
                    className="form-control"
                    id="telefono" />
            </div>





            <div className="form-group">
                <label htmlFor="fecha">Hora de Entrada</label>
                <div>
                    <DatePicker
                        showYearDropdown
                        selected={startDate}
                        onChange={handleDateChange('fecha', setStartDate)}
                        filterTime={filterTime}
                        showTimeSelect
                        dateFormat="Pp"
                    />
                </div>
            </div>

            <br></br>

            <div className="form-group">
                <button
                    type="submit"
                    className="btn btn-primary">Crear reserva
                </button>
            </div>
        </form>
    )
}

export default ReservaForm;