// import React, { useEffect } from "react";
// import { useParams } from "react-router-dom";
// import css from './Pagination.module.css';
// import { usePageQuery } from "@/hooks/usePageQuery";
// import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
// import { searchActions } from "@/redux/slices/searchSlice";
// import { RootState } from "@/types/reduxType";
//
// const SearchPagination = () => {
//     const { page, prevPage, nextPage, setPage } = usePageQuery();
//     const query = useParams<{ query: string }>().query || "";
//     const { total_pages } = useAppSelector((state: RootState) => state.search);
//     const dispatch = useAppDispatch();
//
//     useEffect(() => {
//         if (query) {
//             dispatch(searchActions.getAll({ query, page }));
//         }
//     }, [dispatch, query, page]);
//
//     const totalPages = total_pages || 0;
//     const isFirstPage = page === 1;
//     const isLastPage = page === totalPages;
//
//     const handlePageClick = (pageNumber: number) => {
//         setPage(pageNumber.toString());
//         dispatch(searchActions.getAll({ query, page: pageNumber }));
//     };
//
//     let startPage = Math.max(1, page - 3);
//     const endPage = Math.min(totalPages, page + 3);
//
//     const showEllipsisStart = startPage > 1;
//     const showEllipsisEnd = endPage < totalPages;
//
//     if (page > endPage) {
//         startPage = Math.max(1, endPage - 5);
//     }
//
//     const showFirstButton = startPage > 1;
//     const showLastButton = endPage < totalPages;
//
//     return (
//         <div className={css.SearchPagination}>
//             <button className={css.button} onClick={prevPage} disabled={isFirstPage}>
//                 Prev
//             </button>
//             {showFirstButton && (
//                 <button className={css.button} onClick={() => handlePageClick(1)}>
//                     1
//                 </button>
//             )}
//             {showEllipsisStart && <span className={css.ellipsis}>...</span>}
//             {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((pageNumber) => (
//                 <button
//                     key={pageNumber}
//                     onClick={() => handlePageClick(pageNumber)}
//                     className={`${css.button} ${pageNumber === page ? css.active : ""}`}
//                 >
//                     {pageNumber}
//                 </button>
//             ))}
//             {showEllipsisEnd && <span className={css.ellipsis}>...</span>}
//             {showLastButton && (
//                 <button className={css.button} onClick={() => handlePageClick(totalPages)}>
//                     {totalPages}
//                 </button>
//             )}
//             <button className={css.button} onClick={nextPage} disabled={isLastPage}>
//                 Next
//             </button>
//         </div>
//     );
// };
//
// export { SearchPagination };