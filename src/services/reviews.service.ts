import {axiosInstance, IRes} from "./axios.service";
import {IResReview, IReview} from "@/interface/IRviewInteface";
import {GeneralQuery} from "@/interface/IQueryInterface";

const reviewsService = {
    getAllByEstId: (id: string, query: GeneralQuery) => axiosInstance.get(`/reviews/${id}`, {params:query}),
    getAllByUserId: (id: string, page:number|null, limit:number|null): IRes<IResReview> => axiosInstance.get(`/reviews/users/${id}`,{ params: {
            page,
            limit
        }}),
    getAvgRating: (id: string): IRes<{ avgRating:number }> => axiosInstance.get(`/reviews/${id}/rating`),
    postOne: (data: Partial<IReview>) => axiosInstance.post('/reviews', data).catch(err=>err.response),
    deleteOne: (id: number) => axiosInstance.delete(`/reviews/${id}`)
}

export {reviewsService}