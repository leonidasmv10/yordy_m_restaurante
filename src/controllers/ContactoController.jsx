import BaseController from "./BaseController";

class ContactoController extends BaseController {
    constructor() {
        super("mclkvmh9ki0ui13");
    }

    agregar(contacto) {

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

export default ContactoController;
