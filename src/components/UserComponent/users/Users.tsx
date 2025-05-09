import React, {FC, useEffect, useState} from 'react';
import styles from './Users.module.css'
import {usersService} from "@/services/user.service";
import {IUser} from "@/interface/IUserInterface";
import User from "@/components/UserComponent/user/User";

const Users: FC = () => {
    const [users, setUser] = useState<IUser[]>([]);

    useEffect(() => {
        usersService.getAll().then(({data}) => setUser(data))
    }, [])

    return (
        <div className={styles.UsersContainer}>
            {
                users.map(user => <User key={user.userId} user={user}/>)
            }
        </div>
    );
};

export default Users;