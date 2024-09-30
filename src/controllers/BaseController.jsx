class BaseController {
    constructor() {
        this.id = "-";
        this.token = import.meta.env.VITE_TOKEN;
    }

    get_url()
    {
        return  "https://app.nocodb.com/api/v2/tables/" + this.id + "/records";
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

        fetch(this.get_url(), options)
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

        await fetch(this.get_url(), options)
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

        fetch(this.get_url(), options)
            .then(z => z.json())
            .then(x => {
                console.log(x);
            })
            .catch(e => console.log(e))
    }
}

export default BaseController;
