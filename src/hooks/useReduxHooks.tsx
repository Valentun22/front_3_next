import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {RootState, AppDispatch} from "@/redux/store/store";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;