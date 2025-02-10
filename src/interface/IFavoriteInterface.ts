import {IEstablishment} from "@/interface/IEstablishmentInterface";

export interface IFavorite {
    user_id: number,
    establishment_id: number,
    establishment?:IEstablishment
}

export interface IFavoriteResponse{
    favorites:IFavorite[],
    count:number
}