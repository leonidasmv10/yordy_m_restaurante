class BaseController {
    constructor(table_id) {
        this.token = import.meta.env.VITE_TOKEN;
        this.url_nocodb = "https://app.nocodb.com/api/v2/tables/" + table_id + "/records";
    }
}

export default BaseController;
