import {IUser} from "@/interface/IUserInterface";
import {IVenue} from "@/interface/IVenueInterface";

export interface IReview {
    reviewId: number,
    text: string,
    signboardId: string;
    check: number|string,
    userId: number,
    venueId: number,
    rating: number,
    user?: IUser,
    venue?: IVenue,
    createdAt: string,
    updatedAt: string
}

export interface IResReview {
    reviews: IReview[],
    limit?: number,
    count: number
}