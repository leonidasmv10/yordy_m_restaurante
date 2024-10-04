import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";

const LoginForm = ({ onSubmit }) => {

    const { register, handleSubmit } = useForm();

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
                <label htmlFor="user">Usuario</label>
                <input
                    {...register("user")}
                    name="user"
                    type="text"
                    className="form-control"
                    id="user" />
            </div>

            <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <input
                    {...register("password")}
                    name="password"
                    type="password"
                    className="form-control"
                    id="password" />
            </div>

            <br></br>
            <div className="form-group">
                <button
                    type="submit"
                    className="btn btn-primary">Iniciar Sesión
                </button>
            </div>
        </form>
    )
}

export default LoginForm;