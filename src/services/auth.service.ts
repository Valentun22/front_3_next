import {axiosInstance, IRes} from "./axios.service";
import {IClientId, IUserAndTokens} from "@/interface/IUserInterface";

const authService = {
    login: (clientId: IClientId): IRes<IUserAndTokens> => axiosInstance.post(`/users`, clientId),
    refresh: (): IRes<IUserAndTokens> => axiosInstance.get('auth/refresh', {withCredentials: true}),
    logout: () => axiosInstance.get('/auth/logout', {withCredentials: true}),
}

export {authService}