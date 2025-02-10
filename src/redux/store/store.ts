import {configureStore} from "@reduxjs/toolkit";
import {userReducer} from "@/redux/slices/userSlice";
import {venueReducer} from "@/redux/slices/establishmentSlice";

export const setupStore = () => configureStore({
    reducer: {
        users: userReducer,
        venues: venueReducer}
})

export type RootState = ReturnType<ReturnType<typeof setupStore>["getState"]>;
export type AppDispatch = ReturnType<typeof setupStore>["dispatch"];
