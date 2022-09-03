import axios from "axios";

class HomeService  {
    load = async (data) => {
        const promise = new Promise((resolve, reject) => {
            axios.get('http://localhost:4000/')
                .then((res) => {
                    return resolve(res)
                })
                .catch((err) => {
                    return resolve(err)
                })
        })
        return await promise
    }
}

export default new HomeService();
