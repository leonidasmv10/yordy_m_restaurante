import BaseController from "./BaseController";

class OpinionController extends BaseController {
    constructor() {
        super("me7zuonslh07acf");
    }

    async set_active(id, activeUpdate) {
        const updatedData = {
            Id: id,
            active: activeUpdate
        };

        try {
            const response = await fetch(this.url_nocodb, {
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

export default OpinionController;
