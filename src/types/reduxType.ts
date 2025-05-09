import {AxiosResponse} from "axios";
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {userReducer} from "@/redux/slices/userSlice";

let establishmentReducer;
const rootReducer = combineReducers({
    userId: userReducer,
    s: establishmentReducer
});

const setupStore = () => configureStore({
    reducer:rootReducer
})

type IPromise<T> = Promise<AxiosResponse<T>>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

export type {

    IPromise
}

//todo потрібно виправити