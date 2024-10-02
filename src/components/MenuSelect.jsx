import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";

const MenuSelect = ({ onSubmit, platos, servicios }) => {

    const { register, handleSubmit } = useForm();

    return (
        <form onSubmit={handleSubmit(onSubmit)}>


            <label htmlFor="servicio">Platos</label><br></br>
            <select name="select">

                {platos.map((item) => (
                    <option key={item.Id} value={item.Id}>{item.nombre} - {item.precio} euros</option>

                ))}
            </select>
            <br></br>
            <label htmlFor="servicio">Servicio</label><br></br>
            <select name="select">

                {servicios.map((item) => (
                    <option key={item.Id} value={item.Id}>{item.nombre}</option>

                ))}
            </select>




           


            
        </form>
    )
}

export default MenuSelect;