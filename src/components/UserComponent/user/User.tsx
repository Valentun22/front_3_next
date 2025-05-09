import React, {FC} from 'react';
import {Link} from "react-router-dom";
import styles from './User.module.css'
import {IUser} from "@/interface/IUserInterface";
import {useAppSelector} from "@/hooks/useReduxHooks";

interface IProp{
    user:IUser,
}

const User:FC<IProp> = ({user}) => {
    const {user:onlineUser} = useAppSelector(state => state.user);
    return (
        <div>
            {
                onlineUser?.userId!==user.userId && <div>
                    <Link className={styles.UserItem} to={`${user.userId}`} state={{userId:user.userId}}>
                        <img src={user.image} alt=""/>
                        <p>{user.name}</p>
                    </Link>
                </div>
            }
        </div>

    );
};

export default User;