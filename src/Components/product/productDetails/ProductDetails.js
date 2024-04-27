import { Link, useParams } from 'react-router-dom';
import styles from './ProductDetails.module.scss';
import { useEffect, useState } from 'react';
import { db } from '../../../fireBase/Config';
import { doc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import spinner from '../../assets/spinner.jpg';
import Card from '../../card/Card';
import { useDispatch } from 'react-redux';
import { ADD_TO_CART, CALCULATE_TOTAL_QUANTITY } from '../../../Redux/slice/cartSlice';






const ProductDetails = () => {
 
  const {id} = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  







  useEffect(() => {
    getproduct()
  }, [])
  
  
  const getproduct =  async () => {
//     const docRef = doc(db, "products", id);
// const docSnap = await getDoc(docRef);

// if (docSnap.exists()) {
//   // console.log("Document data:", docSnap.data());
//   const obj = {
//     id: id,
//     ...docSnap.data()
//   }
//   setProduct(obj)
// } else {
//  toast.error('Data not found')
// }
const docRef = doc(db, "products", id);
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  console.log("Document data:", docSnap.data());
  const obj = {
         id: id,
         ...docSnap.data()
       }
       setProduct(obj)
} else {
  // docSnap.data() will be undefined in this case
  // console.log("No such document!");
  toast.error('Data Not Found!!')
}
  };
  

  const addtocart = (product) => {
    dispatch(ADD_TO_CART(product))
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };


  return (

    <section>
      <div className={`container ${styles.product}`}>
        <h1>Product Details</h1>
        <div>
          <Link to='/#products'>&larr; Back to home </Link>
        </div>
        {product === null ? (<img src={spinner} style={{width:'4rem'}} />)
        : (<>
       
        <div className={styles.details}>
          <div className={styles.img}>
          <img  src={product.imageURL} alt={product.name} />
          </div>
          
        
        <div className={styles.content}>
          <h2>{product.name} </h2>
          <p className={styles.price}>{`$${product.price}`}</p>
          <p>{product.desc}</p>
          <p>
            <b>SKU:</b> {product.id}
          </p>
          <p>
            <b>Brand:</b> {product.brand}
          </p>
          <div className={styles.count}>
    
          </div>
          <button className='--btn --btn-primary' onClick={()=> addtocart(product)}>ADD To Cart</button>
        </div>
      
        </div>
        </>)}
        
      </div>
    </section>
  )
 
};

export default ProductDetails