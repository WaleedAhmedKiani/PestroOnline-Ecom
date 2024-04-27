import React from 'react';
import { Link } from 'react-router-dom';


const CheckoutSuccess = () => {
  return (
    <section>  
         <div className='container'>
            <h2>Checkout done.</h2>
            <p>Thank you for Shopping</p>
            <br/>
            
               <button className='--btn --btn-primary'>
                  
               <Link to='/order-history'>View Order</Link> </button> 
         
            </div> 
         </section>
 
  )
}

export default CheckoutSuccess