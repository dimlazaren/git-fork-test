import axios from 'axios';

let instance;

export function getInstance() {
    if (!instance) {
        instance = axios.create({
            baseURL: process.env.API_URL
        });

        instance.interceptors.response.use(
            response => response.data,
            error => Promise.reject(error.response)
        );
    }

    return instance;
}
