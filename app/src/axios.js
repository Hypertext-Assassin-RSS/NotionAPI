import axios from "axios";

const instance = axios.create({
 baseURL:'http://localhost:4000/',
 headers: {'x-apikey': '59a7ad19f5a9fa0808f11931', 'Access-Control-Allow-Origin' : '*', 'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'},
})

export default instance