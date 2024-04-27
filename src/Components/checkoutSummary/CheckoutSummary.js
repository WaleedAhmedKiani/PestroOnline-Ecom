import React from 'react';
import styles from './CheckoutSummary.module.scss';
import { useSelector } from 'react-redux';
import { selectCartItems, selectCartTotalAmount, selectCartTotalQuantity } from '../../Redux/slice/cartSlice';
import { Link } from 'react-router-dom';
import Card from '../card/Card';



const CheckoutSummary = () => {
    const cartItems = useSelector(selectCartItems);
    const cartTotalAmount = useSelector(selectCartTotalAmount);
    const cartTotalQuantity = useSelector(selectCartTotalQuantity)
  return (
    <div> 
        <h3>Checkout Summary</h3>
        <div>
            {cartItems.length === 0 ? (
                <>
                <p>No Item In Cart.</p>
                <button className='--btn'>
                <Link to='/#products' >Back To Shop</Link></button>
                </>
            ): (
                <> 
                <div>
                    <p>
                        <h4>{`Cart item: ${cartTotalQuantity}`}</h4>
                    </p>
                   <div className={styles.text}> 
                   <h4>SubTotal:</h4>
                   <h3>{cartTotalAmount.toFixed(2)}</h3>
                   </div>
                   {cartItems.map((item, index)=>{
                    const{id, name, price, cartQuantity} = item;
                    return(
                        <Card key={id} cardClass={styles.card}>
                            <h4>Product:{name} </h4>
                            <p>Quantity:&nbsp;{cartQuantity} </p>
                            <p>Product Price:&nbsp;{price} </p>
                            <p>Final Price:&nbsp;{price * cartQuantity} </p>

                        </Card>
                    )
                   })}
                </div>
                </>
            )}
        </div>
    </div>
  )
}

export default CheckoutSummary