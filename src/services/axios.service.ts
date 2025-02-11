import axios, {AxiosResponse} from "axios";

let axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true,
    headers: {
        'Access-Control-Allow-Origin': "http://localhost:3000"
    }
});

export type IRes<T> = Promise<AxiosResponse<T>>

export {axiosInstance};