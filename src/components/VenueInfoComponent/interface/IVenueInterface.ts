import {ITypeVenueInterface} from "@/components/VenueInfoComponent/interface/ITypeVenueInterface";
import {IFeaturesInterface} from "@/components/VenueInfoComponent/interface/IFeaturesInterface";

export interface IVenueInterface {
    venueId: string;
    name?: string;
    image?: string;
    location?: string;
    averageCheck?: number;
    workingHours?: string;
    contactInfo?: string;
    tags?: string[];
    description?: string;
    menu?: string[];
    latitude?: number;
    longitude?: number;
    type?: ITypeVenueInterface[];
    features?: IFeaturesInterface[];
    rating: number;
}