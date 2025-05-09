import {IVenue} from "@/interface/IVenueInterface";

export interface INewsInterface {
    id: string;
    title: string;
    content: string;
    venue: IVenue;
    venueId: string;
}