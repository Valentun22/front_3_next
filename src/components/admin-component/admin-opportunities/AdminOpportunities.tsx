import React, {FC, useEffect, useState} from "react";
import css from './AdminOpportunities.module.css';
import {IVenue} from "@/interface/IVenueInterface";
import {venueActions} from "@/redux/slices/venueSlice";
import {venueService} from "@/services/venue.service";
import {useAppDispatch, useAppSelector} from "@/hooks/useReduxHooks";
import AdminApproval from "@/components/admin-component/admin-approval/AdminApproval";

const AdminOpportunities: FC = () => {
    const {data} = useAppSelector(state => state.venues);
    const {user} = useAppSelector(state => state.user);

    const [fetching, setFetching] = useState<boolean>(true);
    const [fetchingDelete, setFetchingDelete] = useState<boolean | string>(false);

    const [totalCount, setTotalCount] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [prevData, setPrevData] = useState<IVenue[]>([])

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (fetching) {
            dispatch(venueActions.getAllVenues({
                pending: true,
                page: currentPage,
                prevData,
                limit: 5
            }))
                .then((value: any) => {
                    setTotalCount(value?.payload?.count);
                    setPrevData(value?.payload?.venues);

                })
                .finally(() => {
                    setFetching(false);
                })
            setCurrentPage(prevState => prevState + 1);
        } else if (fetchingDelete) {
            dispatch(venueActions.getAllVenues({
                pending: true,
                page: 1,
                limit: 5
            })).then((value: any) => {
                setTotalCount(value?.payload?.count);
                setPrevData(value?.payload?.venues);
            })
                .finally(() => setFetchingDelete(false));
            setCurrentPage(2);
        }
    }, [fetching, fetchingDelete, user?.userId]);

    const scrollHandler = (e: Event) => {
        const target = e.target as Document;
        if (
            target.documentElement.scrollHeight - (target.documentElement.scrollTop + window.innerHeight) < 100 &&
            data.venues.length < totalCount
        ) {
            setFetching(true);
        }
    };

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler);
        return function cleanup() {
            document.removeEventListener('scroll', scrollHandler);
        };
    }, [totalCount]);

    const updateState = (state: string, id: number) => {
        if (state === 'approve') {
            venueService.patchOne(id, {
                approved: true, pending: false, rejected: false
            }).finally(() => setFetchingDelete(true));
        } else if (state === 'reject') {
            venueService.patchOne(id, {
                rejected: true, approved: false, pending: false
            }).finally(() => setFetchingDelete(true));
        }
    }

    return (
        <div className={css.ApplicationsBox}>
            {data.venues.length ? (
                data.venues.map((value: IVenue, index: number) => (
                    <AdminApproval key={index} updateState={updateState} venue={value}/>
                ))
            ) : (
                'No results'
            )}
        </div>
    );
}

export default AdminOpportunities;