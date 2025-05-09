import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {IVenue} from "@/interface/IVenueInterface";
import {venueService} from "@/services/venue.service";

interface IState {
    data: { venues: IVenue[], count: number, maxCheck: number },
    dataByUser: {venues: IVenue[], count: 0}
}

let initialState: IState = {
    data: {venues: [], count: 0, maxCheck: 0},
    dataByUser: {venues: [], count: 0},
}

const getAllVenues = createAsyncThunk(
    'venues/getAll',
    async (arg: {
        page?: number | null, limit?: number | null,
        title?: string | null,
        sort?: string | null,
        type?: string | null,
        filterByRating?: string | null,
        filterByCheck?: string | null,
        pending?: boolean | null,
        approved?: boolean | null,
        rejected?: boolean | null,
        prevData?: IVenue[] | null
    }, {rejectWithValue}) => {
        try {
            const {page,title,sort,type,filterByRating,filterByCheck,pending,approved,rejected, limit} = arg;
            const {data} = await venueService.getAll({page, limit, title,sort,type,filterByRating,filterByCheck,pending,approved,rejected});
            if(arg.prevData){
                return {...data, venues:[...arg.prevData,...data.venues]}
            }
            return data;
        } catch (e: any) {
            return rejectWithValue(e.response.data);
        }
    }
)

const getAllVenuesByUserID = createAsyncThunk(
    'venuesSlice/getAllByUserId',
    async (arg: {
        page?: number | null,
        limit?: number | null,
        pending?: boolean | null,
        approved?: boolean | null,
        rejected?: boolean | null,
        id:number,
        prevData?: IVenue[] | null
    }, {rejectWithValue}) => {
        try {
            const {page, limit,pending,approved,rejected, id} = arg;
            const {data} = await venueService.getAllByUserId({page,pending,limit,approved,rejected}, id);
            if(arg.prevData){
                return {...data, venues:[...arg.prevData,...data.venues]}
            }
            return data;
        } catch (e: any) {
            return rejectWithValue(e.response.data);
        }
    }
)


const venueSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getAllVenues.fulfilled, (state, {payload}) => {
                state.data = payload
            })
            .addCase(getAllVenuesByUserID.fulfilled, (state, {payload}) => {
                state.dataByUser = payload
            })
    },
});

const {reducer: venueReducer} = venueSlice;

const venueActions = {
    getAllVenues,
    getAllVenuesByUserID
}

export {venueReducer, venueActions}