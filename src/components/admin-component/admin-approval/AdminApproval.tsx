import React, {FC} from 'react';
import css from'./AdminApproval.module.css';
import {IVenue} from "@/interface/IVenueInterface";

interface IProp {
    venue: IVenue;
    updateState: Function
}

const AdminApproval: FC<IProp> = ({venue, updateState}) => {
    return (
        <div className={css.ApplicationItem}>
            <div className={css.ApplicationLogo}>
                {venue?.image?<div style={{
                    background: `url(${'http://localhost:3000/' + venue?.image?.replace(/\\/g, '/')}) center center / cover no-repeat`,
                    width: 200,
                    height: 150
                }}></div>:<div style={{
                    background: `url("/no_img.png") center center / cover no-repeat`,
                    width: 200,
                    height: 150
                }}></div>}
                <h4>{venue?.title}</h4>
            </div>
            <div>
                <button onClick={() => updateState('approve',venue.venueId)}>Пітвердити
                </button>

                <button onClick={() => updateState('reject',venue.venueId)}>Відхилити
                </button>
            </div>
        </div>
    );
};

export default AdminApproval;