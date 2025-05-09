import {FC} from "react";
import css from './VenueInfo.module.css';
import {StarRatingForVenue} from "@/components/VenuesComponent/star-rating-component/StarRatingForVenue";
import {FeaturesList, ITypeVenueInterface} from "@/interface/IVenueInterface";
import dynamic from "next/dynamic";

interface IProps{
    name: string;
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
    features?: FeaturesList[];
    rating?: number;
}

const VenueInfo: FC<IProps> = ({name, rating = 0, type, description, location, features, averageCheck, workingHours, contactInfo, menu, latitude, longitude}) => {
    // const {total_pages} = useAppSelector(state => state.type);

    const Map = dynamic(() => import("../map-location/Map"), { ssr: false });

    return (
        <div>
            <div className={css.Name}>
                <h1>Name{name}</h1>
            </div>
            <div className={css.VenueBox}>
                <div className={css.logoBox}>
                    <div className={css.logoVenue}>
                        <img
                            src={"https://bzh.life/static/ckef/img/2022/145869332-3850501158339304-4947806583060670944.jpeg"}
                            alt={name}/>
                    </div>
                </div>
            </div>

            <div className={css.infoStar}>
                <div className={css.starBox}>
                    <h2>Rating: {rating} / 10</h2>
                    <StarRatingForVenue rating={rating}/>
                </div>
            </div>

            <div className={css.info}>
                <div className={css.infoBoxAll}>
                    <div className={css.infoBox}>
                        <div>
                            <h2>Location: {location}</h2>
                        </div>
                        <div>
                            <h2>Average Check: {averageCheck}</h2>
                        </div>
                        <div>
                            <h2>Working Hours: {workingHours}</h2>
                        </div>
                        <div>
                            <h2>Contact Info: {contactInfo}</h2>
                        </div>
                        <div>
                            <h2>Menu: {menu}</h2>
                        </div>
                        <div>
                            <h2>Type:</h2>
                            <ul>
                                {type?.map((t, index) => (
                                    <li key={index}>{t.name}</li> // Переконайтеся, що `ITypeVenueInterface` має властивість `name`.
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h2>Features:</h2>
                            <ul>
                                {features?.map((feature, index) => (
                                    <li key={index}>
                                        WiFi: {feature.wifi ? "Available" : "Not Available"},
                                        Parking: {feature.parking ? "Available" : "Not Available"},
                                        Live Music: {feature.liveMusic ? "Available" : "Not Available"}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div>
                        {latitude != null && longitude != null && (
                            <div className={css.map}>
                                <Map venue={{ latitude, longitude, name: name || '' }} />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className={css.descriptionBox}>
                <div className={css.infoDescription}>
                    <h2>Description: {description}</h2>
                </div>
            </div>

            <div className={css.descriptionBox}>
                <div className={css.infoDescription}>
                    <h2>News: {description}</h2>
                </div>
            </div>

            <div className={css.descriptionBox}>
                <div className={css.infoDescription}>
                    <h2>Review: {description}</h2>
                </div>
            </div>



        </div>
    );
};

export {VenueInfo};