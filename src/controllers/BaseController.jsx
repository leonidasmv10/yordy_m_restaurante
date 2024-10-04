class BaseController {
    constructor(table_id) {
        this.url_nocodb = `https://app.nocodb.com/api/v2/tables/${table_id}/records`;
        this.token = import.meta.env.VITE_NOCODB_TOKEN;
    }

    async add(data) {
        const options = {
            method: "POST",
            headers: {
                "xc-token": this.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        try {
            const response = await fetch(this.url_nocodb, options);
            const result = await response.json();
            console.log("id rebut: ", result.Id);
        } catch (e) {
            console.error("Error al agregar:", e);
        }
    }

    async get() {
        const options = {
            method: "GET",
            headers: {
                "xc-token": this.token,
                'Content-Type': 'application/json'
            }
        };

        try {
            const response = await fetch(this.url_nocodb, options);
            const result = await response.json();
            return result.list || []; // Asegúrate de devolver una lista vacía si no hay resultados
        } catch (e) {
            console.error("Error al obtener datos:", e);
            return []; // Devuelve una lista vacía en caso de error
        }
    }

    async delete(id) {
        const json_id = { "Id": id };

        const options = {
            method: "DELETE",
            headers: {
                "xc-token": this.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json_id)
        };

        try {
            const response = await fetch(this.url_nocodb, options);
            const result = await response.json();
            console.log(result);
        } catch (e) {
            console.error("Error al eliminar:", e);
        }
    }
}

export default BaseController;
