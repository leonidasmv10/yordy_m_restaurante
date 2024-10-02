import BaseController from "./BaseController";

class PlatoController extends BaseController {
    constructor() {
        super("mi17olylaa46vqw");
    }

    async get_by_id_category(id_category) {

        const url = this.url_nocodb + "?where=(categoria_plato_id,eq," + id_category + ")";

        let list;

        const options = {
            method: "GET",
            headers: {
                "xc-token": this.token,
                'Content-Type': 'application/json'
            }
        }

        await fetch(url, options)
            .then(z => z.json())
            .then(x => {
                list = x.list;
            })
            .catch(e => console.log(e))

        return list;
    }

    async set_active(id, update) {

        const url = "https://app.nocodb.com/api/v2/tables/mi17olylaa46vqw/records";

        const updatedData = {
            Id: id,
            activo: update
        };



        fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'xc-token': this.token
            },
            body: JSON.stringify(updatedData)
        })
            .then(response => response.json())
            .then(data => console.log("Registro actualizado:", data))
            .catch(error => console.error("Error al actualizar el registro:", error));
    }
}

export default PlatoController;
