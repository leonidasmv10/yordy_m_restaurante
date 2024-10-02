import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";

const VisitaForm = ({ onSubmit }) => {

    const { register, handleSubmit } = useForm();

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
                <label htmlFor="texto">Opinión</label>
                <input
                    {...register("texto")}
                    name="texto"
                    type="text"
                    className="form-control"
                    id="texto" />
            </div>

            <br></br>
            <div className="form-group">
                <button
                    type="submit"
                    className="btn btn-primary">Subir Opinión
                </button>
            </div>
        </form>
    )
}

export default VisitaForm;