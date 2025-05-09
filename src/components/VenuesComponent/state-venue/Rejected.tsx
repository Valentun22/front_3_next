"use client";

import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import css from "../UsersVenues.module.css";
import { venueActions } from "@/redux/slices/venueSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import {IVenue} from "@/interface/IVenueInterface";
import { venueService } from "@/services/venue.service";


const Rejected: FC = () => {
    const { user } = useAppSelector(state => state.user);
    const { dataByUser } = useAppSelector(state => state.venues);
    const router = useRouter();
    const dispatch = useAppDispatch();

    const [totalCount, setTotalCount] = useState<number>(0);
    const [prevData, setPrevData] = useState<IVenue[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [fetchPage, setFetchPage] = useState<boolean>(true);
    const [fetchDelete, setFetchDelete] = useState<boolean | string>(false);

    useEffect(() => {
        if (user?.userId) {
            if (fetchPage) {
                dispatch(venueActions.getAllVenuesByUserID({
                    rejected: true,
                    page: currentPage,
                    limit: 5,
                    id: user.userId,
                    prevData: prevData
                }))
                    .then((value: { payload?: { count?: number; venues?: IVenue[] } }) => {
                        if (value.payload?.count !== undefined) {
                            setTotalCount(value.payload.count);
                        }
                        return value;
                    })
                    .then((value: any) => setPrevData(value?.payload?.venues))
                    .finally(() => setFetchPage(false));
                setCurrentPage(prevState => prevState + 1);
            }
        } else {
            router.push("/auth-request");
        }
    }, [fetchPage, user?.userId]);

    useEffect(() => {
        if (fetchDelete) {
            dispatch(venueActions.getAllVenuesByUserID({
                approved: true,
                page: 1,
                limit: 5,
                id: user?.userId!,
            }))
                .then((value: { payload?: { count?: number } }) => {
                    if (value.payload?.count !== undefined) {
                        setTotalCount(value.payload.count);
                    }
                })
                .finally(() => {
                    setFetchDelete("false");
                });
        }
    }, [fetchDelete]);

    const scrollHandler = (e: Event) => {
        const target = e.target as Document;
        if (
            target.documentElement.scrollHeight - (target.documentElement.scrollTop + window.innerHeight) <
            100 &&
            dataByUser.venues.length < totalCount
        ) {
            setFetchPage(true);
        }
    };

    useEffect(() => {
        document.addEventListener("scroll", scrollHandler);
        return () => {
            document.removeEventListener("scroll", scrollHandler);
        };
    }, [totalCount]);

    const deleteOneVenue = async (id: number) => {
        await venueService.deleteOne(id)
            .then(() => setPrevData(dataByUser.venues.filter((value: IVenue) => value.venueId !== id)))
            .finally(() => setFetchDelete(true));
    };

    const redirectToEdit = (index: number) => {
        router.push(`/MyVenues/update?venueId=${dataByUser.venues[index].venueId}`);
    };

    return (
        <div>
            {dataByUser.venues.length ? (
                <div>
                    {dataByUser.venues.map((value: IVenue, index: number) => (
                        <div key={value.venueId} className={css.DivEst}>
                            <div
                                onClick={() => router.push(`/adv/${value.title}?venueId=${value.venueId}`)}
                                className={css.Img}
                                style={{
                                    background: `url(${value.avatar ? `http://localhost:3000/${value.avatar.replace(/\\/g, "/")}` : "/no_img.png"}) center center / cover no-repeat`,
                                }}
                            ></div>
                            <div>
                                <h4>{value.title}</h4>
                                <p>{value.type}</p>
                                <p>{value.location}</p>
                                <p>{value.workingHours}</p>
                            </div>
                            <button onClick={() => deleteOneVenue(value.venueId)}>Delete</button>
                            <button onClick={() => redirectToEdit(index)}>Edit</button>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No venue yet</p>
            )}
        </div>
    );
};

export default Rejected;