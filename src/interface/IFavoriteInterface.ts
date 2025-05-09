import {IVenue} from "@/interface/IVenueInterface";

export interface IFavorite {
    userId: number,
    venueId: number,
    venue?:IVenue,
}

export interface IFavoriteResponse{
    favorites:IFavorite[],
    count:number,
}