import {IUser} from "@/interface/IUserInterface";

export interface IVenue {
    // venueId: number,
    // name: string,
    // image?: string,
    // photos: string[],
    // location: string,
    // averageCheck: number,
    // workingHours: string,
    // contactInfo: string,
    // tags: string|Array<string>,
    // description?: string,
    // menu?: string[],
    // latitude?: number,
    // longitude?: number,
    // likes: number,
    // rating?: number,
    // type?: string,
    // publicationDate: Date,
    // updated_at?: string,
    // features?: FeaturesList[];
    // owner: string;
    // reviews: IReview[];
    // news: INewsInterface[];
    // favorites: IFavorite[]
    // signboards: string;

    //todo звірити із беком

    venueId: number,
    title: string,
    type: string,
    tags: string|Array<string>,
    start_work: string,
    end_work: string,
    location: string,
    average_check: number,
    phone: string,
    approved: boolean,
    pending: boolean,
    rejected: boolean,
    photos: string[],
    avatar: string,
    created_at: string,
    updated_at: string,
    workingHours: string,
    image?: string;
    user?: IUser,
}

export interface IPatchEst {
    approved: boolean,
    pending: boolean,
    rejected: boolean
}

export interface ITypeEst {
    type_id: number,
    title: string
}

export interface EstablishmentPayload {
    establishments:IVenue[],
    count: number;
    maxCheck?:number;
}

export interface FeaturesList {
    wifi: boolean;
    parking: boolean;
    liveMusic: boolean;
}

export interface ITypeVenueInterface {
    id: number;
    name: string;
}
