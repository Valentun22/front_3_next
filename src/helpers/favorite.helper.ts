import React, { RefObject } from "react";
import {IVenue} from "@/interface/IVenueInterface";
import {favoriteService} from "@/services/favorite.service";

const addToFavorite = async (e: React.MouseEvent<HTMLElement, MouseEvent>, favoriteIcon: React.RefObject<any>, userId: number, item: IVenue) => {
    const color = favoriteIcon?.current?.style?.color === 'red';

    if (color && favoriteIcon && e.target) {
        favoriteIcon.current.style.setProperty('color', 'black');
        await favoriteService.deleteFavorite(userId, item?.venueId);

    } else if (!color && favoriteIcon.current && e.target) {
        favoriteIcon.current.style.setProperty('color', 'red');
        await favoriteService.addUsersFavorite(userId, item?.venueId);
    }
}

async function changeFavorite(item: IVenue, favoriteIcon: RefObject<any>, userId: number) {
    const {data:favorite} = await favoriteService.fetchFavorite();

    if (favoriteIcon.current && favorite?.length && userId) {
        favorite?.forEach(value => {
            if (value?.venueId === item?.venueId && value?.userId === userId && favoriteIcon?.current) {
                favoriteIcon.current.style.color = 'red';
            }
        })
    }
}

export {addToFavorite, changeFavorite}