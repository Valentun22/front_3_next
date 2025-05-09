import React, {ChangeEvent, createRef, FC, useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import css from './CreateVenuesComponent.module.css'
import './CreateEstablishment.module.css'
import {useForm} from "react-hook-form";
import './CreateEstablishment.module.css';
import {Reorder} from "framer-motion";
import {useAppDispatch, useAppSelector} from "@/hooks/useReduxHooks";
import {venueService} from "@/services/venue.service";
import {venueActions} from "@/redux/slices/venueSlice";
import {IVenue, ITypeEst} from "@/interface/IVenueInterface";

interface IFile {
    file: File,
    index: number
}

const CreateVenuesComponent: FC = () => {
    const {user} = useAppSelector(reducer => reducer.user);
    const navigate = useNavigate();

    const [files, setFiles] = useState<IFile[]>([]);
    const [fileUrl, setFileUrl] = useState<any[]>([]);
    const [types, setTypes] = useState<ITypeEst[]>([]);
    const {register, handleSubmit, reset} = useForm<IVenue>();

    const location = useLocation();

    const updatedEstablishment = location.state as IVenue;

    const dispatch = useAppDispatch();


    useEffect(() => {
        (async () => {
            if (updatedEstablishment) {
                reset({...updatedEstablishment});
                const urlArray: string[] = [];

                const prevFiles = Promise.all(updatedEstablishment?.photos.map(async (file, index) => {
                    const response = await fetch(`http://localhost:3000/${file}`);

                    const photoName = response?.url?.split('/').pop();

                    const contentType = response.headers.get('content-type');
                    const blob = await response.blob();
                    return {file: new File([blob], photoName!, {type: contentType!}), index};
                }));

                Array.from(await prevFiles).forEach((value, index) => urlArray.push(URL.createObjectURL(value.file) + `#index=${index}`));

                setFiles(await prevFiles);

                setFileUrl([...urlArray]);
            }
        })()
    }, [updatedEstablishment])

    useEffect(() => {
        const orderIndex = fileUrl.map(value => value?.split('=').pop());

        const reorderedArray = files.sort((a, b) => orderIndex.indexOf(a.index.toString()) - orderIndex.indexOf(b.index.toString()));
        setFiles([...reorderedArray]);

    }, [fileUrl]);

    useEffect(() => {
        venueService.getType().then(({data}) => setTypes(data))
    }, [])


    const onSubmit = async (data: IVenue) => {
        const formData = new FormData();
        if (user?.userId) {
            files.map(photo => formData.append('files', photo.file));
            if(data.tags.length){
                if (!Array.isArray(data.tags)) {
                    formData.append('data', JSON.stringify({...data, tags: data.tags.split(',')}));
                } else {
                    formData.append('data', JSON.stringify({...data}));
                }
            }
            else {
                formData.append('data', JSON.stringify({...data, tags:''}));
            }


            formData.append('user_id', user.userId.toString())

            updatedEstablishment ? await venueService.putOne(updatedEstablishment.venueId, formData).finally(()=>dispatch(venueActions.getAllVenues({limit:8})))
                .finally(()=>navigate('/my-establishments')): await venueService.postOne(formData).finally(()=>navigate('/my-establishments'));
        }
        else {
            navigate('/auth-request');
        }
    }

    const handleImg = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const fileList = e.target.files;

            const urlArray: string[] = [];

            Array.from(fileList).forEach((value, index) => urlArray.push(URL.createObjectURL(value) + `#index=${fileUrl.length + index}`));

            setFileUrl([...fileUrl, ...urlArray]);

            const filesWithId = Array.from(fileList).map((file, index) => {
                return {file, index: fileUrl.length + index};
            })

            setFiles([...files, ...filesWithId]);
        }
    }

    const deleteRef = createRef<HTMLDivElement>();
    const [clicked, setClicked] = useState(false);

    const deleteAvatar = (photo: string[]) => {
        setClicked(true);
        const filteredFiles = Array.from(files).filter(value => value.index !== +photo[0].split('=')[1]);

        setFiles(filteredFiles.map((value, index) => {
            return {file: value.file, index}
        }));
    }

    useEffect(() => {
        setFileUrl(Array.from(files).map((value, index) => URL.createObjectURL(value.file) + `#index=${index}`));
        setClicked(false);
    }, [clicked]);

    const uploadFile = () => {
        document.getElementById('input-file')!.click()
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className={css.CreateEstablishmentForm}
                  encType="multipart/form-data">

                <div className={css.DetailSection}>
                    {updatedEstablishment ? <h2>Update an establishment</h2> : <h2>Create an establishment</h2>}
                    <h3>Describe in detail</h3>
                    <label color="charcoal" htmlFor="title" className="css-ha5hu8">Enter the name of the
                        establishment*</label>
                    <input {...register("title")} type="text" name={'title'} placeholder={'Enter the title'}/>
                    <label color="charcoal" htmlFor="type" className="css-ha5hu8">Enter the type of the
                        establishment*</label>
                    <select {...register("type")} name="type">
                        {
                            updatedEstablishment ?
                                <option value={updatedEstablishment?.type}>{updatedEstablishment?.type}</option>
                                :
                                <option value={''} hidden></option>
                        }
                        {
                            types.map((value) => <option key={value.type_id} value={value.title}>{value.title}</option>)
                        }
                    </select>

                    <label color="charcoal" htmlFor="tags" className="css-ha5hu8">Enter the tags of the
                        establishment*</label>
                    <input {...register("tags")} type="text" name={'tags'} placeholder={'Enter the tags'}/>
                    <label color="charcoal" htmlFor="type" className="css-ha5hu8">Enter the establishment's opening
                        hours*</label>
                    <input hidden id={'input-file'} onChange={(e) => handleImg(e)} type="file" multiple
                           accept="image/*"/>
                    <input {...register("start_work")} type="time" name={'start_work'}
                           placeholder={'start work'}/>
                    <input hidden type="file" id={'input-file'} placeholder={'photo'} accept="image/*"
                           multiple
                    />
                    <input {...register("end_work")} type="time" name={'end_work'}
                           placeholder={'end work'}/>
                    <input {...register("average_check")} name={'average_check'} placeholder={'average check'}
                           type="number"/>
                </div>

                {<div className={css.PhotoSection}>
                    <h3>Photo</h3>

                    <h6>The first photo will be on the cover of the ad. Drag to reorder</h6>
                    <Reorder.Group style={{overflow: "hidden"}} className={css.PhotosWrap} onReorder={setFileUrl}
                                   axis={'x'} values={fileUrl}>
                        {
                            (() => {
                                let photos = [];
                                for (let i = 0; i < 6; i++) {
                                    if (fileUrl[i]) {
                                        photos.push(

                                            <Reorder.Item as={"div"}
                                                          className={css.DivPhotos} value={fileUrl[i]} style={{
                                                background: `url(${fileUrl[i].replace(/\\/g, '/')}) no-repeat`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: "center",
                                            }} key={fileUrl[i]} a-key={i} whileDrag={{cursor: "move"}}>
                                                <div ref={deleteRef} onClick={() => deleteAvatar([fileUrl[i]])}
                                                     className={`${css.Delete}`} id={`delete${i}`}>
                                                    <img className={css.DeleteBucket} src={'../delete.svg'} alt=""/>
                                                </div>
                                                <div className={`${css.MainPhoto}`}><h6>Головна</h6></div>
                                            </Reorder.Item>
                                        );
                                    } else {
                                        photos.push(<div key={i} onClick={() => uploadFile()} className={css.AddPhoto}
                                                         style={{
                                                             background: `url(../add-photo.png)`,
                                                             backgroundSize: 'cover',
                                                             backgroundPosition: "center"
                                                         }}/>)
                                    }
                                }
                                return photos;
                            })()}
                    </Reorder.Group>
                </div>}


                <div className={css.ContactSection}>
                    <h3>Contact information</h3>
                    <input {...register("location")} type="text"
                           name={'location'} placeholder={'location'}/>

                    <input {...register("phone")} name={'phone'} placeholder={'phone'} type="text"/>
                </div>

                {updatedEstablishment ?
                    <div className={css.SubmitSection}>
                        <button>Edit</button>
                    </div>
                    :
                    <div className={css.SubmitSection}>
                        <button>Post</button>
                    </div>
                }
            </form>
        </div>
    )
        ;
}

export default CreateVenuesComponent;

//todo багато ще додати і доробити і не тільки, підправити