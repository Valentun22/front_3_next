"use client";

import React, { FC, FormEvent, useEffect, useRef, useState } from 'react';
import { useRouter } from "next/navigation";
import styles from './Reviews.module.css';
import ReactStars from 'react-stars';
import { IReview } from "@/interface/IRviewInteface";
import Review from "@/components/Reviews/review/Review";
import { useAppSelector } from "@/hooks/useReduxHooks";
import { reviewsService } from "@/services/reviews.service";

interface IProp {
    signboardId: string | undefined;
}

const Reviews: FC<IProp> = ({ signboardId }) => {
    const { user } = useAppSelector(state => state.user);
    const router = useRouter();

    const [review, setReview] = useState<Partial<IReview>>({ text: '', check: '', rating: 0 });
    const [reviews, setReviews] = useState<IReview[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalCount, setTotalCount] = useState<number>(1);
    const [limit, setLimit] = useState<number>(5);
    const [fetchAdding, setFetchAdding] = useState<boolean>(true);
    const [fetchDelete, setFetchDelete] = useState<boolean | string>(false);

    useEffect(() => {
        if (signboardId && (fetchAdding || currentPage)) {
            reviewsService.getAllByEstId(signboardId, { page: currentPage, limit: 5, sort: 'created_at-DESC' })
                .then(({ data }) => {
                    setReviews(data.reviews);
                    setTotalCount(data.count);
                    setLimit(data.limit || 5);
                })
                .finally(() => setFetchAdding(false));
        }
    }, [signboardId, fetchAdding, currentPage]);

    useEffect(() => {
        if (signboardId && fetchDelete) {
            reviewsService.getAllByEstId(signboardId, { page: currentPage, limit: 5, sort: 'created_at-DESC' })
                .then(({ data }) => {
                    setReviews(data.reviews);
                    setTotalCount(data.count);
                    setLimit(data.limit || 5);
                })
                .finally(() => setFetchDelete(false));
        }
    }, [fetchDelete]);

    const createReview = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (user && signboardId) {
            const { userId } = user;
            reviewsService.postOne({ ...review, check: +review.check!, userId, signboardId })
                .finally(() => {
                    setCurrentPage(1);
                    setFetchAdding(true);
                });
        } else {
            router.push(`/auth-request?signboardId=${signboardId}`);
        }
    };

    const deleteItem = async (id: number) => {
        await reviewsService.deleteOne(id)
            .finally(() => setFetchDelete(true));
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setReview({ ...review, [e.target.name]: e.target.value });
    };

    const onChangeRating = (rating: number) => {
        setReview({ ...review, rating });
    };

    const countPages = Math.ceil(totalCount / limit);

    const changePage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setCurrentPage(+e.currentTarget.value);
    };

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ref.current) {
            Array.from(ref.current.children).forEach((btn, index) => {
                const button = btn as HTMLButtonElement;
                if (index + 1 === currentPage) {
                    button.style.color = 'white';
                    button.style.backgroundColor = 'black';
                } else {
                    button.style.color = 'black';
                    button.style.backgroundColor = 'white';
                }
            });
        }
    }, [currentPage]);

    const showMore = () => {
        setCurrentPage(prevState => (prevState < countPages ? prevState + 1 : prevState));
    };

    return (
        <div className={styles.ReviewsBox}>
            <div className={styles.Title}>Reviews about establishments</div>
            <ReactStars count={5} value={review.rating} onChange={onChangeRating} />
            <form className={'input-form'} onSubmit={createReview}>
                <input placeholder={'Text your review'} onChange={onChange} name={'text'} value={review.text} type="text" />
                <input placeholder={'Enter average check'} onChange={onChange} name={'check'} value={review.check} type="number" />
                <input type="submit" value={'Send'} />
            </form>

            <div className={styles.Container}>
                {reviews.length ? reviews.map(review => (
                    <Review key={review.reviewId} review={review} deleteItem={deleteItem} />
                )) : "No review yet"}
            </div>

            <div className={styles.ButtonBox} ref={ref}>
                {Array.from({ length: countPages }, (_, i) => (
                    i > 10 && i < 12 ? (
                        <button key={i} className={styles.ShowMore} onClick={showMore}>Show more</button>
                    ) : i < 10 ? (
                        <button className={styles.OneBtn} value={i + 1} onClick={changePage} key={i}>{i + 1}</button>
                    ) : null
                ))}
            </div>
        </div>
    );
};

export default Reviews;