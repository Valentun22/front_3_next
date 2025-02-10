import {AxiosResponse} from "axios";
import {setupStore} from "@/redux/store/store";

type IPromise<T> = Promise<AxiosResponse<T>>;
type RootState = ReturnType<typeof setupStore.getState>
type AppDispatch = typeof setupStore.dispatch

export type {
    RootState,
    AppDispatch,
    IPromise
}