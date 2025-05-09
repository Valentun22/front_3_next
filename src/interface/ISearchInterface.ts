import {IVenue} from "@/interface/IVenueInterface";

export interface ISearchInterface {
    page: number;
    results: IVenue[];
    total_pages: number;
    total_results: number;
}