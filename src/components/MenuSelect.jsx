import { useForm } from "react-hook-form";

const MenuSelect = ({ onSubmit, platos, servicios }) => {
    const { register, handleSubmit } = useForm();

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="plato">Platos</label><br />
            <select {...register("plato")} id="plato" required>
                {platos.map((item) => (
                    <option key={item.Id} value={item.Id}>
                        {item.nombre} - {item.precio} euros
                    </option>
                ))}
            </select>
            <br />
            <label htmlFor="servicio">Servicio</label><br />
            <select {...register("servicio")} id="servicio" required>
                {servicios.map((item) => (
                    <option key={item.Id} value={item.Id}>
                        {item.nombre}
                    </option>
                ))}
            </select>
            <br />
            <button type="submit">Enviar</button>
        </form>
    );
};

export default MenuSelect;
