import axios from "axios";
import {IPromise} from "@/types/reduxType";
import {baseUrl, urls} from "@/constants/urls";
import {ISearchInterface} from "@/interface/ISearchInterface";
import {IVenue} from "@/interface/IVenueInterface";

const axiosInstance = axios.create({
    baseURL : baseUrl});

const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0OWJiODg0ZDc0YzA4ZDVlZTVmNGI4OWExMmI4NTI0YSIsInN1YiI6IjY2NzEzOTUyNGUwYjU5MjVkNDBkZjNmOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oSqqBD87KsLPRJ78vxN4tD4NqcJoXWfZaXmYt2rKAp4';

axiosInstance.interceptors.request.use(request => {
    request.headers['Authorization'] = `Bearer ${accessToken}`
    return request
});

const venueService = {
    getAll: (page: number): IPromise<{ results: IVenue[] }> => axiosInstance.get(urls.signboard.base, {params: {page}}),
    getByVenueId: (id: string): IPromise<IVenue> => axiosInstance.get(urls.venuesDetails.venuesById(id))
}

const searchService = {
    getAll: (query: string, page: number): IPromise<ISearchInterface> => axiosInstance.get(urls.search.base, {params: {query, page}})
};

// const genreService = {
//     getAll: (): IPromise<{ genres: IGenreInterfaces[] }> => axiosInstance.get(urls.genres.base),
//     getByGenreId: (id: number, page?: number): IPromise<{
//         results: IVenueInterface[]
//     }> => axiosInstance.get(urls.genres.byGenreId(id), {params: {page}})
// }

export {
    axiosInstance,
    // genreService,
    venueService,
    searchService
}