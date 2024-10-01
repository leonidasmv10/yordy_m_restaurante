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
}

export default PlatoController;
