import axios from "axios";

const api = axios.create({
    baseURL: 'https://mrpass.site'
})

export {api}