import {axiosInstance, IRes} from "./axios.service";
import {IFavorite, IFavoriteResponse} from "@/interface/IFavoriteInterface";


const favoriteService = {
    fetchFavorite: ():IRes<IFavorite[]> => axiosInstance.get(`/favorites`),
    fetchFavoriteByUserId: (id:number, page:number|null,limit:number|null):IRes<IFavoriteResponse> => axiosInstance.get(`/favorites/${id}`,{params:{page,limit}}),
    addUsersFavorite:(userId:number, venueId:number):IRes<IFavorite> => axiosInstance.post(`/favorites`,{userId,venueId}),
    deleteFavorite: (id: number, venueId:number)=> axiosInstance.delete(`/favorites/${id}/${venueId}`)
}

export {favoriteService}