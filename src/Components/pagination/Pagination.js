import React, { useState } from 'react';
import styles from './Pagination.module.scss';

const Pagination = ({CurrentPage, setCurrentPage, ProductsPerPage, totalProducts}) => {
    const pageNum = []
    const totalPages = totalProducts / ProductsPerPage;
    ///⁡⁢⁢⁣ Limit Page Numbers⁡
    const [pageNumberLimit, setpageNumberLimit] = useState(5);
    const[maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
    const[minPageNumberLimit, setminPageNumberLimit] = useState(0);

    for(let a = 1; a <= Math.ceil(totalProducts / ProductsPerPage); a++){
        pageNum.push(a)
    }

    // Paginate
    const paginate = (pageNum) => {
        setCurrentPage(pageNum)
    };
    // Go to next Page
    const PaginateNext = () => {
        setCurrentPage(CurrentPage + 1)
        if(CurrentPage + 1 > maxPageNumberLimit){
            setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit)
            setminPageNumberLimit(minPageNumberLimit + pageNumberLimit)
        }
        
    };

      // Go to Previous Page
      const PaginatePrev = () => {
        setCurrentPage(CurrentPage - 1)
        if((CurrentPage - 1) % pageNumberLimit==0){
            setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit)
            setminPageNumberLimit(minPageNumberLimit - pageNumberLimit)
        }
    };

  return (
  
    <ul className={styles.pagination}>
        <li onClick={PaginatePrev} className={CurrentPage === pageNum[0] ? `${styles.hidden}`
        : null}>Prev</li>
        {pageNum.map((Number)=>{
            if(Number < maxPageNumberLimit + 1 && Number > minPageNumberLimit){

                return (
                    <li key={Number} onClick={()=> paginate(Number)}
                    className={CurrentPage === Number ? `${styles.active}`: null}> {Number} </li>
                )
            }
           
        })}
        <li onClick={PaginateNext} className={CurrentPage === pageNum[pageNum.length -1]
        ? `${styles.hidden}` : null}>Next</li>
        <p>
            <b className={styles.page}>{`page ${CurrentPage}`} </b>
            <span>{` of `} </span>
            <b>{`${Math.ceil(totalPages)}`} </b>
        </p>
      

    </ul>
  )
}

export default Pagination