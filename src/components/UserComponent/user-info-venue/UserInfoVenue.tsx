import React, {FC} from 'react';
import {useNavigate} from "react-router-dom";
import css from './UserInfoVenue.module.css';
import {IVenue} from "@/interface/IVenueInterface";

interface IProp {
    venue: IVenue;
    deleteItem: Function;
}

const UserInfoVenue: FC<IProp> = ({venue, deleteItem}) => {
    const navigate = useNavigate();
    const redirectToEdit = () => {
        navigate('/MyVenue/update', {state: venue});
    }

    return (
        <div>
            <div className={css.EstablishmentItem}>
                {venue?.avatar ?
                    <div className={css.EstablishmentImage}
                         onClick={() => navigate(`/adv/${venue.title}`, {state: {venueId: venue.venueId}})}
                         style={{
                             background: `url(${'http://localhost:3000/' + venue?.avatar?.replace(/\\/g, '/')}) center center / cover no-repeat`
                         }}></div> :
                    <div className={css.EstablishmentImage}
                         onClick={() => navigate(`/adv/${venue.title}`, {state: {venueId: venue.venueId}})}
                         style={{
                             background: `url("/no_img.png") center center / cover no-repeat`,
                         }}></div>
                }

                <div className={css.EstablishmentDetails}>
                    <h4>{venue.title}</h4>
                    <p>{venue.type}</p>
                    <p>{venue.location}</p>
                    <p>{venue.workingHours}</p>
                </div>
                <div>
                    <button onClick={() => deleteItem(venue.venueId)}>Delete</button>
                    <button onClick={() => redirectToEdit()}>Edit</button>
                </div>
            </div>
        </div>
    );
};

export default UserInfoVenue;