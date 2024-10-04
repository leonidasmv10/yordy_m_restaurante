import BaseController from "./BaseController";

class PlatoController extends BaseController {
    constructor() {
        super("mi17olylaa46vqw");
    }

    async get_by_id_category(id_category) {
        const url = `${this.url_nocodb}?where=(categoria_plato_id,eq,${id_category})`;

        const options = {
            method: "GET",
            headers: {
                "xc-token": this.token,
                'Content-Type': 'application/json'
            }
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json();
            return data.list;
        } catch (e) {
            console.error("Error al obtener los datos:", e);
            return []; 
        }
    }

    async set_active(id, update) {
        const url = this.url_nocodb;

        const updatedData = {
            Id: id,
            activo: update
        };

        try {
            const response = await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'xc-token': this.token
                },
                body: JSON.stringify(updatedData)
            });

            const data = await response.json();
            console.log("Registro actualizado:", data);
        } catch (error) {
            console.error("Error al actualizar el registro:", error);
        }
    }
}

export default PlatoController;
