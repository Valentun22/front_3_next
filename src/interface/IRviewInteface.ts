import {IUser} from "@/interface/userInterface";
import {IEstablishment} from "@/interface/IEstablishmentInterface";

export interface IReview {
    review_id: number,
    text: string,
    check: number|string,
    user_id: number,
    establishment_id: number,
    rating: number,
    user?: IUser,
    establishment?: IEstablishment,
    createdAt: string,
    updatedAt: string
}

export interface IResReview {
    reviews: IReview[],
    limit?: number,
    count: number
}