import BaseController from "./BaseController";

class ListaServicioController extends BaseController {
    constructor() {
        super("m9z1mpqi1nvneth");
    }

    async get_services_id_by_dish_id(id) {
        const url = `${this.url_nocodb}?where=(plato_id,eq,${id})`; // Uso de plantillas de cadena
        let servicesIds = [];

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
            servicesIds = data.list.map(item => item.servicio_id);
        } catch (e) {
            console.error("Error al obtener los IDs de servicios:", e);
        }

        return servicesIds; // Devuelve la lista de IDs de servicios
    }
}

export default ListaServicioController;
