import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {searchService} from "@/services/api.service";
import {IVenueInterface} from "@/components/VenueInfoComponent/interface/IVenueInterface";

interface IState {
    page: number | null;
    venues: IVenueInterface[];
    total_pages: number | null;
    total_results: number | null;
}

const initialState: IState = {
    page: null,
    venues: [],
    total_pages: null,
    total_results: null
}

const getAll = createAsyncThunk<IState, { query: string; page: number }>(
    'searchSlice/getAll',
    async ({ query, page }, { rejectWithValue }) => {
        try {
            if (query.trim() === "") {
                return rejectWithValue("Query cannot be empty");
            }
            const { data } = await searchService.getAll(query, page);
            return {
                page: data.page,
                venues: data.results,
                total_pages: data.total_pages,
                total_results: data.total_results,
            };
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data || "An error occurred");
        }
    }
);

const searchSlice = createSlice({
    name: 'searchSlice',
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.page = action.payload.page;
                state.venues = action.payload.venues;
                state.total_pages = action.payload.total_pages;
                state.total_results = action.payload.total_results;
            })
})

const {reducer: searchReducer, actions} = searchSlice;
const searchActions = {
    ...actions,
    getAll
}

export {
    searchReducer,
    searchActions
}