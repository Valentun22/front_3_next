import {axiosInstance, IRes} from "./axios.service";
import {IVenue, IPatchEst, ITypeEst} from "@/interface/IVenueInterface";


const venueService = {
    getAll: (params:any):IRes<{venues:IVenue[],count:number,maxCheck:number}> => axiosInstance.get(`/venues`,{params}),
    getAllByUserId:(params:any,id:number)=>axiosInstance.get(`/venues/users/${id}`, {params}),
    getOne:(id:number):IRes<IVenue> => axiosInstance.get(`/venues/${id}`),
    getType:():IRes<ITypeEst[]> => axiosInstance.get(`/venues/type/est`),
    postOne: async (file: FormData)=>{
        const response = await axiosInstance.post('/venues',file, { headers: {'Content-Type': 'multipart/form-data'}})
            .catch(e => e);
        return response.data.constraints? alert(Object.values(response.data.constraints).map(value => value)): response;
    } ,
    patchOne:async (id:number, data:IPatchEst)=>axiosInstance.patch(`/venues/${id}`, data),
    putOne:async (id: number, data: FormData)=>{
        const response = await  axiosInstance.put(`/venues/${id}`, data).catch(e=>e);
        return response.data.constraints? alert(Object.values(response.data.constraints).map(value => value)): response;
    },
    deleteOne:(id:number)=>axiosInstance.delete(`/venues/${id}`)
}

export {venueService}