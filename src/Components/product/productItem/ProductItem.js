import { Link } from 'react-router-dom';
import Card from '../../card/Card';
import styles from './Producttit.module.scss';
import { useDispatch } from 'react-redux';
import { ADD_TO_CART, CALCULATE_TOTAL_QUANTITY } from '../../../Redux/slice/cartSlice';






const ProductItem = ({product, grid, id, name, price, desc, imageURL}) => {

// Product Name Shorten Code
  const shortText = (text, n) =>{
    if(text.length > n){
      const short = text.substring(0, n).concat('...')
      return short;

    }
    return text;
  }
     const dispath = useDispatch();

  const addToCart = (product)=>{
    dispath(ADD_TO_CART(product));
    dispath(CALCULATE_TOTAL_QUANTITY());
  }
  return (
    <Card cardClass={grid ? `${styles.grid}` : `${styles.list}`}>
      <Link to={`/product-details/${id}`}>
      <div className={styles.img}>
        <img src={imageURL} alt={name} />
      </div>
      </Link>

      <div className={styles.content}>
        <div className={styles.details}>
          <p>{`$${price}`} </p>
          <h4>{shortText(name, 16)} </h4>
        </div>
        {!grid && <p className={styles.desc}>{shortText(desc, 400)}</p>}
        <button className='--btn --btn-primary'
        onClick={()=> addToCart(product)}>ADD To Cart</button>
      </div>
     


    </Card>
  )
}

export default ProductItem