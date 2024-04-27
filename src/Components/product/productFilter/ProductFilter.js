import { useDispatch, useSelector } from 'react-redux';
import styles from './ProductFil.module.scss';
import { selectMaxPrice, selectMinPrice, selectProducts } from '../../../Redux/slice/productSlice';
import { useEffect, useState } from 'react';
import { FILTER_BY_BRAND, FILTER_BY_CATEGORY, FILTER_BY_PRICE } from '../../../Redux/slice/filterSlice';



const ProductFilter = () => {

  const [category, setCategory] = useState('All');
  const [brand, setBrand] = useState('All');
  const [price, setPrice] = useState(2000);
  const products = useSelector(selectProducts);
  const MinPrice = useSelector(selectMinPrice);
  const MaxPrice = useSelector(selectMaxPrice);
  const dispatch = useDispatch();

  const allCategories = [ 'All', ...new Set(products.map((product) => product.category))]
  // console.log(allCategories)
  const allbrand = [ 'All', ...new Set(products.map((product) => product.brand))]
    // console.log(allbrand)
  const filterProducts = (cut) => {
    setCategory(cut);
    dispatch(FILTER_BY_CATEGORY({products, category: cut}))
  };

   useEffect(() => {
     dispatch(FILTER_BY_BRAND({products, brand}))
   
   }, [dispatch, products, brand]);
   
   useEffect(() => {
    dispatch(FILTER_BY_PRICE({products, price}))
  
  }, [dispatch, products, price]);
  
  const clearFilter = () => {
    setCategory('All');
    setBrand('All');
    setPrice(MaxPrice);
  }
  
  return (
   
    <div className={styles.filter}>
      <h3>Categories</h3>
      <div className={styles.category }>
        {allCategories.map((cut, index) => {
          return(
            <button key={index} type='button'
            className={`${category}`=== cut ? `${styles.active}`
          : null} onClick={()=> filterProducts(cut)}>&#10151; {cut} </button>
          )
        })}
       
      </div>
      <h4>Brand</h4>
      <div className={styles.brand}>
        
        <select value={brand} onChange={(e)=> setBrand(e.target.value)}>
          {allbrand.map((brand, index) =>{
            return(
              <option key={index} value={brand}>{brand} </option>
            )
          })}
         
        </select>
        <h4>Price</h4>
        <p>{`$${price}`}</p>
        <div className={styles.price}>
          <input type='range' value={price} onChange={(e) => setPrice(e.target.value)} 
          min={MinPrice} max={MaxPrice} />

        </div>
        <br/>
        <button className='--btn --btn-primary' onClick={clearFilter}
        >Clear Filter</button>
      </div>
    </div>
  )
}

export default ProductFilter