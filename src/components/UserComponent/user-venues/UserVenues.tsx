import React, {FC} from "react";
import {
    Route,
    NavLink,
    Routes
} from "react-router-dom";
import css from './UsersEstablishments.module.css'
import Rejected from "@/components/VenuesComponent/state-venue/Rejected";
import Approved from "@/components/VenuesComponent/state-venue/Approved";
import Pending from "@/components/VenuesComponent/state-venue/Pending";

const UsersVenues: FC = () => {

    return (
        <div>
            <nav className={css.NavList}>
                <NavLink style={({ isActive, isPending }) => {
                    return {
                        fontWeight: isActive ? "bold" : "",
                        color: isPending ? "red" : "black",
                    };
                }} to={''} end><li>Approved</li></NavLink>
                <NavLink style={({ isActive, isPending }) => {
                    return {
                        fontWeight: isActive ? "bold" : "",
                        color: isPending ? "red" : "black",
                    };
                }} to={'pending'}><li>Pending</li></NavLink>
                <NavLink style={({ isActive, isPending }) => {
                    return {
                        fontWeight: isActive ? "bold" : "",
                        color: isPending ? "red" : "black",
                    };
                }} to={'rejected'}><li>Rejected</li></NavLink>
            </nav>
            <Routes>
                <Route path={''} element={<Approved/>}/>
                <Route path={'pending'} element={<Pending/>}/>
                <Route path={'rejected'} element={<Rejected/>}/>
            </Routes>
        </div>
    );
}

export default UsersVenues;