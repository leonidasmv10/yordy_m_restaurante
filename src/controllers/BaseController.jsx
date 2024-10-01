class BaseController {
    constructor(table_id) {
        this.url_nocodb = "https://app.nocodb.com/api/v2/tables/" + table_id + "/records";
        this.token = import.meta.env.VITE_NOCODB_TOKEN;
    }
    
    add(data) {

        const options = {
            method: "POST",
            headers: {
                "xc-token": this.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        fetch(this.url_nocodb, options)
            .then(z => z.json())
            .then(x => {
                console.log("id rebut: ", x.Id);
            })
            .catch(e => console.log(e))
    }

    async get() {

        let list;

        const options = {
            method: "GET",
            headers: {
                "xc-token": this.token,
                'Content-Type': 'application/json'
            }
        }

        await fetch(this.url_nocodb, options)
            .then(z => z.json())
            .then(x => {
                list = x.list;
            })
            .catch(e => console.log(e))

        return list;
    }


    delete(id) {

        const json_id = {
            "Id": id
        }

        const options = {
            method: "DELETE",
            headers: {
                "xc-token": this.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json_id)
        }

        fetch(this.url_nocodb, options)
            .then(z => z.json())
            .then(x => {
                console.log(x);
            })
            .catch(e => console.log(e))
    }
}

export default BaseController;
