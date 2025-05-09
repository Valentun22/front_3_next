import React, { FC, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import styles from './UserInfo.module.css';
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { IUser } from "@/interface/IUserInterface";
import { IVenue } from "@/interface/IVenueInterface";
import { venueActions } from "@/redux/slices/venueSlice";
import { usersService } from "@/services/user.service";
import { venueService } from "@/services/venue.service";
import UserInfoVenue from "@/components/UserComponent/user-info-venue/UserInfoVenue";

const UserInfo: FC = () => {
    const { dataByUser } = useAppSelector(state => state.venues);
    const { user } = useAppSelector(state => state.user);
    const router = useRouter();
    const userId = typeof router.query.userId === 'string' ? parseInt(router.query.userId, 10) : undefined;

    const dispatch = useAppDispatch();
    const [currentUser, setCurrentUser] = useState<IUser | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [prevData, setPrevData] = useState<IVenue[]>([]);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [fetching, setFetching] = useState<boolean>(true);
    const [fetchUser, setFetchUser] = useState<boolean>(true);

    const changeNameInput = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (user) {
            if (user.admin) {
                if (fetching && userId) {
                    dispatch(venueActions.getAllVenuesByUserID({
                        page: currentPage,
                        approved: true,
                        limit: 5,
                        id: userId,
                        prevData: prevData
                    }))
                        .then((value: any) => {
                            if (value && value.payload && value.payload.venues && value.payload.count) {
                                setPrevData(value.payload.venues);
                                setTotalCount(value.payload.count);
                            }
                            setFetching(false);
                        })
                        .catch((error: any) => {
                            console.error("Error fetching venues:", error);
                            setFetching(false);
                        });

                    setCurrentPage(prevState => prevState + 1);
                }
            } else {
                void router.push('/auth-request');
            }
        } else {
            void router.push('/auth-request');
        }

    }, [fetching, user, userId, dispatch, router, currentPage, prevData]);

    useEffect(() => {
        if (user && userId && fetchUser) {
            usersService.getOne(userId)
                .then(({ data }) => setCurrentUser(data))
                .catch((error: any) => console.error("Error fetching user:", error))
                .finally(() => setFetchUser(false));
        }
    }, [userId, fetchUser, user]);

    const scrollHandler = (e: Event) => {
        const target = e.target as Document;
        if (
            target.documentElement.scrollHeight - (target.documentElement.scrollTop + window.innerHeight) < 100 &&
            dataByUser.venues.length < totalCount
        ) {
            setFetching(true);
        }
    };

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler);
        return () => {
            document.removeEventListener('scroll', scrollHandler);
        };
    }, [totalCount]);

    const deleteItem = (id: number) => {
        venueService.deleteOne(id)
            .then(() => setPrevData(prevData.filter(value => value.venueId !== id)))
            .catch((error: any) => console.error("Error deleting venue:", error))
            .finally(() => setFetching(true));
    };

    const changeName = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (user && userId && changeNameInput.current) {
            const target = e.target as HTMLInputElement;

            try {
                await usersService.putOne(userId, { name: target.value });
                setFetchUser(true);
            } catch (error: any) {
                console.error("Error updating user name:", error);
            }
            target.hidden = true;
        }
    };

    return (
        <div>
            <div className={styles.UserTitle}>
                <div className={styles.UserNameAvatarBox}>
                    <div className={styles.UserAvatar}>
                        <img src={currentUser?.image} alt="" />
                    </div>

                    <div>
                        <h4>{currentUser?.name}</h4>
                        <h6>{currentUser?.email}</h6>
                    </div>
                </div>

                <div>
                    <button onClick={() => {
                        if (changeNameInput.current) {
                            changeNameInput.current.hidden = false;
                        }
                    }}>Edit name</button>

                    <button onClick={async () => {
                        if (userId) {
                            try {
                                await usersService.deleteOne(userId);
                                void router.push('/admin-page/users');
                            } catch (error: any) {
                                console.error("Error deleting user:", error);
                            }
                        }
                    }}>Delete user
                    </button>
                </div>
                <input onKeyDown={e => e.key === 'Enter' && changeName(e)} ref={changeNameInput} hidden type="text" />
            </div>
            <div className={styles.UserEstablishments}>
                {dataByUser?.venues?.length ? dataByUser?.venues.map((venue: IVenue, index: number) =>
                    <UserInfoVenue key={index} deleteItem={deleteItem} venue={venue} />) : 'no result'}
            </div>
        </div>
    );
};

export default UserInfo;