import { useEffect, useState } from 'react';
import styles from './ProductList.module.scss';
import { TfiLayoutGrid2Alt } from "react-icons/tfi";
import { FaListUl } from "react-icons/fa";
import Search from '../../search/Search';
import ProductItem from '../productItem/ProductItem';
import { useDispatch, useSelector } from 'react-redux';
import { PRODUCTS_SORT, SEARCH_FILTER, selectFilterProducts } from '../../../Redux/slice/filterSlice';
import Pagination from '../../pagination/Pagination';






const ProductList = ({products}) => {
  const [grid, setGrid] = useState(true);
  const [search, setSSearch] = useState('');
  const [sort, setSort] = useState('');
  const FilteredProducts = useSelector(selectFilterProducts) 

  const dispatch = useDispatch();

  /// Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [pPerPage, setPPerPage] = useState(9);
  // Get Current Products
  const indexOFlastProduct = currentPage * pPerPage;
  const indexOFfirstProduct = indexOFlastProduct - pPerPage;
  const currentProducts = FilteredProducts.slice(indexOFfirstProduct, indexOFlastProduct)

  useEffect(() => {
   dispatch(PRODUCTS_SORT({products, sort}))
    
  }, [dispatch, products, sort])

  useEffect(() => {
    dispatch(SEARCH_FILTER({products, search}))
     
   }, [dispatch, products, search])
  
  return (
    <div className={styles['product-list']} id='product'>

      <div className={styles.top}>
        <div className={styles.icons}>

        <TfiLayoutGrid2Alt size={20} color='orangered'
        onClick={() => setGrid(true)}/>

        <FaListUl  size={22} color='#1f93ff' onClick={() => 
          setGrid(false)}/>
        <p>
          <b>{FilteredProducts.length} </b> Products found.
        </p>
        </div>
        {/* Search item */}
        <div>
         <Search value={search} onChange={(e) => setSSearch
         (e.target.value)} />
        </div>
        {/* Sort Products */}
        <div className={styles.sort}>
          <label>Sort by:</label>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value='latest'>Latest</option>
            <option value='lowest-price'>Lowest Price</option>
            <option value='highest-price'>Highest Price</option>
            <option value='a-z'>A - Z</option>
            <option value='z-a'>Z - A</option>

           
          </select>
        </div>
      </div>
      <div className={grid ? `${styles.grid}` : `${styles.list}`}>
        {products.length === 0 ? (
          <p>No Product found there</p>
        ) : (
          <>{currentProducts.map((Product) =>{
            return(
              <div key={Product.id}>
                <ProductItem  {...Product} grid={grid} 
                product={Product} />
              </div>
            )
          })}   </>
        )}
      </div>
      <Pagination
      CurrentPage={currentPage}
      setCurrentPage={setCurrentPage}
      ProductsPerPage={pPerPage}
      totalProducts={FilteredProducts.length} />
    </div>
  )
}

export default ProductList