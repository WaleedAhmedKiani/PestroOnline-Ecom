import React, { useEffect } from 'react';
import styles from './Cart.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_TO_CART, CALCULATE_TOTAL, CALCULATE_TOTAL_QUANTITY, CLEAR_CART, DECREASE_CART, REMOVE_ITEMS_CART, SAVE_URL, selectCartItems, selectCartTotalAmount, selectCartTotalQuantity } from '../../Redux/slice/cartSlice';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import Card from '../../Components/card/Card';
import { selectisLoggedIn } from '../../Redux/slice/authSlice';







const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const isLoggedIn = useSelector(selectisLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const increaseCart = (cart)=>{
    dispatch(ADD_TO_CART(cart))
  }
  const descreaseCart = (cart)=>{
    dispatch(DECREASE_CART(cart))

  }
  const deleteCart = (cart) => {
    dispatch(REMOVE_ITEMS_CART(cart))

  }
  const clearCart = () => {
    dispatch(CLEAR_CART())

  }

  useEffect(() => {
    dispatch(CALCULATE_TOTAL());
    dispatch(CALCULATE_TOTAL_QUANTITY());
    dispatch(SAVE_URL(''))
  }, [dispatch, cartItems])
  
  const url = window.location.href;

  const CheckOut = () => {
    if(isLoggedIn) {
      navigate('/checkout-details');
    } else {
      dispatch(SAVE_URL(url));
      navigate('/login');
    }
  };

  return (
     
   <section>
    <div className={`container ${styles.table}`}>
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <>
        <h4>Your Cart is empty!</h4>
        <br />
        <div>
          <Link to='/#products'>&larr;<b style={{color:'red'}}>Continue Shopping</b> </Link>
        </div>
        </>
      ):(
        <> 
        <table>
          <thead>
            <tr>
              <th>#Sn:</th>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
              {cartItems.map((cart, index) => {
                const{id, name, price, imageURL, cartQuantity} = cart;
                return(
                  <tr key={id}>
                    <td>{index+1} </td>
                    <td>
                      <p>
                        <b>{name} </b>
                      </p>
                      <img src={imageURL} alt={name} style={{width:'80px'}} />
                    </td>
                    <td>{price}</td>
                    <td>
                      <div className={styles.count}>
                        <button className='--btn ' onClick={()=> increaseCart(cart)}>+</button>
                        <p>
                          <b>{cartQuantity} </b>
                        </p>
                        <button className='--btn  'onClick={()=> descreaseCart(cart)}>-</button>

                      </div>
                    </td>
                    <td>{(price * cartQuantity).toFixed(2)} </td>
                    <td className={styles.icons}>
                      <FaTrash size={22} color='Tomato' onClick={()=> deleteCart(cart)}/> </td>
                  </tr>
                )
              })}
          </tbody>
        </table>
     <div className={styles.summary}>
      <button className='--btn --btn-primary' onClick={clearCart}>Clear Cart</button>
      <div className={styles.checkout}>
        <div>
          <Link to='/#products'>&larr;Continue Shopping</Link>
        </div>
        <br/>
        <Card cardClass={styles.card}>
          <p><b>{`Cart items : ${cartTotalQuantity}`}</b> </p>
          <div className={styles.text}>
            <h4>SubTotal:&nbsp;</h4>
            <h3>{`$${cartTotalAmount.toFixed(2)}`} </h3>
          </div>
          <button className='--btn --btn-danger --btn-block'
          onClick={CheckOut}>Checkout</button>
        </Card>

      </div>

     </div>
   
   </>
        
      )}
      </div> 
   </section>

  )
  
}

export default Cart