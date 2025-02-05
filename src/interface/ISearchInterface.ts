import {IVenueInterface} from "@/components/VenueInfoComponent/interface/IVenueInterface";

export interface ISearchInterface {
    page: number;
    results: IVenueInterface[];
    total_pages: number;
    total_results: number;
}