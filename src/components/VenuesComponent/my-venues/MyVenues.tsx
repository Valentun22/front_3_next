import React, {FC} from "react";
import {NavLink, Route, Routes} from "react-router-dom";
import css from './MyVenues.module.css'
import UsersVenues from "@/components/UserComponent/user-venues/UserVenues";
import CreateVenuesComponent from "@/components/VenuesComponent/create-venues/CreateVenuesComponent";

const MyVenuesComponent: FC = () => {

    return (
        <div>
            <nav className={css.NavList}>
        <NavLink style={({ isActive, isPending }) => {
        return {
            fontWeight: isActive ? "bold" : "",
            color: isPending ? "red" : "black",
        };
    }} to={''}>My Establishments</NavLink>
    <NavLink style={({ isActive, isPending }) => {
        return {
            fontWeight: isActive ? "bold" : "",
            color: isPending ? "red" : "black",
        };
    }} to={'create'}>Create venue</NavLink>
    </nav>
    <Routes>
    <Route path={'create'} element={<CreateVenuesComponent/>}/>
    <Route path={'update'} element={<CreateVenuesComponent/>}/>
    <Route path={'/*'} element={<UsersVenues/>}/>
    </Routes>
    </div>
);
}

export default MyVenuesComponent;