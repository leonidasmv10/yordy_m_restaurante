import BaseController from "./BaseController";

class OpinionController extends BaseController {
    constructor() {
        super("me7zuonslh07acf");
    }

    async set_active(id, activeUpdate) {

        const url = "https://app.nocodb.com/api/v2/tables/me7zuonslh07acf/records";

        const updatedData = {
            Id: id,
            active: activeUpdate
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

export default OpinionController;
