import BaseController from "./BaseController";

class PlatoController extends BaseController {
    constructor() {
        super("mi17olylaa46vqw");
    }

    agregar(plato) {

        const options = {
            method: "POST",
            headers: {
                "xc-token": this.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contacto)
        }

        fetch(this.url_nocodb, options)
            .then(z => z.json())
            .then(x => {
                console.log("id rebut: ", x.Id);
            })
            .catch(e => console.log(e))
    }

    
}

export default PlatoController;
