import { useEffect, useState } from 'react';
import styles from './Product.module.scss';
import ProductFilter from './productFilter/ProductFilter';
import ProductList from './productList/ProductList';
import { useDispatch, useSelector } from 'react-redux';
import useFetchCollection from '../../customHooks/useFetchCollection';
import { GET_PRICE_RANGE, STORE_PRODUCTS, selectProducts } from '../../Redux/slice/productSlice';
import spinner from '../assets/spinner.jpg';
import { ImMenu3 } from "react-icons/im";



const Product = () => {

  const {data, isLoading} = useFetchCollection('products');
  const [showFilter, setShowingFilter] = useState(false);
  const products = useSelector(selectProducts)
 
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(STORE_PRODUCTS({products: data}))
    dispatch(GET_PRICE_RANGE({products: data}))

  },[dispatch, data])

  const toogleFilter = () => {
    setShowingFilter(!showFilter);
  }
  return (
    <>

    <section>
      <div className={`container ${styles.product}`}>

        <aside className={showFilter ? `${styles.filter} ${styles.show}`
        : `${styles.filter}}`}>
          
          {isLoading ? null : (<ProductFilter/>)}
          
        </aside>
        <div className={styles.content}>
          {isLoading ? <img src={spinner} style={{width:'4rem'}} 
          className='--center-all'/> : (
            <ProductList products={products} />
          )}
          <div className={styles.icon} onClick={toogleFilter}>
          <ImMenu3 size={22} color='#0a1930'/>
          <p>
            <b>{showFilter ? 'Hide Filter': 'Show Filter'} </b>
          </p>
          </div>
        </div>

      </div>
    </section>
    </>
  )
}

export default Product