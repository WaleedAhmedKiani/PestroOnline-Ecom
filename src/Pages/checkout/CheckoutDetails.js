import React, { useState } from 'react';
import styles from './Checkout.module.scss';
import Card from '../../Components/card/Card';
import { CountryDropdown } from 'react-country-region-selector';
import { useDispatch, useSelector } from 'react-redux';
import { SAVE_BILLING_ADDRESS, SAVE_SHAPPING_ADDRESS, selectShippingAddress } from '../../Redux/slice/checkoutSlice';
import { useNavigate } from 'react-router-dom';
import CheckoutSummary from '../../Components/checkoutSummary/CheckoutSummary';
import { toast } from 'react-toastify';
import { db } from '../../fireBase/Config';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import { selectEmail, selectUserID, selectUserName } from '../../Redux/slice/authSlice';
import { CLEAR_CART, selectCartItems, selectCartTotalAmount } from '../../Redux/slice/cartSlice';







const initialAddressState = {
  name: '',
  line1: '',
  line2: '',
  city: '',
  state: '',
  postal_code: '',
  country: '',
  phone: '',
}


// Main Function
const CheckoutDetails = () => {
  const [shippingAdd, setShippingAdd] = useState({...initialAddressState})
  const [billingAdd, setBillingAdd] = useState({...initialAddressState})

  // Refference Variable
const dispatch = useDispatch();
const navigate = useNavigate();

const userId = useSelector(selectUserID)
const userEmail = useSelector(selectEmail)
const userName = useSelector(selectUserName)
const shippingAddress = useSelector(selectShippingAddress)
const cartItems = useSelector(selectCartItems)
const cartTotalAmount= useSelector(selectCartTotalAmount)

  const handleShipping = (e) => {
    const {name, value} = e.target
    setShippingAdd({
      ...shippingAdd,
      [name]: value
    })
  };

  const handleBilling = (e) => {
    const {name, value} = e.target
    setBillingAdd({
      ...billingAdd,
      [name]: value
    })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(shippingAdd)
    // console.log(billingAdd)
    dispatch(SAVE_SHAPPING_ADDRESS(shippingAdd))
    dispatch(SAVE_BILLING_ADDRESS(billingAdd))
    saveOrder();
    navigate('/checkout-success');
  };
  const saveOrder = () => {
    const today = new Date()
    const date = today.toDateString()
    const time = today.toLocaleTimeString()
    const orderConfig = {
      userId, userEmail, orderDate: date, orderTime: time, orderAmount: cartTotalAmount,
      orderStatus: 'order Placed...', cartItems, shippingAddress, createdAt: Timestamp.now().toDate()
    }
    try{
      
      addDoc(collection(db, "orders"), orderConfig);
      dispatch(CLEAR_CART())
      toast.success('Order Saved');
      navigate('/')
   
    } catch(error){
      toast.error(error.message)
     

    }
  }
  
  return (
    <section>
      <div className={`container ${styles.checkout}`}>
        <h2>Checkout Details</h2>
        <form onSubmit={handleSubmit}>
          <div>
           <Card cardClass={styles.card}>
            <h3>Shipping Address</h3>
            <label>Recipient Name:</label>
            <input type='text' placeholder='Recipient Name' required
            name='name' value={shippingAdd.name} onChange={(e) => handleShipping(e)}></input>

            <label>Address Line 1:</label>
            <input type='text' placeholder='Address Line 1' required
            name='line1' value={shippingAdd.line1} onChange={(e) => handleShipping(e)}></input>
            
            <label>Address Line 2:</label>
            <input type='text' placeholder='Address Line 2' required
            name='line2' value={shippingAdd.line2} onChange={(e) => handleShipping(e)}></input>

            <label>City:</label>
            <input type='text' placeholder='City' required
            name='city' value={shippingAdd.city} onChange={(e) => handleShipping(e)}></input>

            <label>State:</label>
            <input type='text' placeholder='State' required
            name='state' value={shippingAdd.state} onChange={(e) => handleShipping(e)}></input>

            <label>Postal Code:</label>
            <input type='text' placeholder='Postal Code' required
            name='postal_code' value={shippingAdd.postal_code} onChange={(e) => handleShipping(e)}></input>
            
            {/* <label>Country:</label>
            <input type='text' placeholder='Country' required
            name='country' value={shippingAdd.country} onChange={(e) => handleShipping(e)} ></input> */}

            <CountryDropdown
             
              classes={styles.select}
              valueType='short' value={shippingAdd.country}
              onChange={(valu) => handleShipping({ target: {
                name: 'country',
                value: valu}
               
                }
              )}
            />          

            <label>Phone:</label>
            <input type='text' placeholder='Phone' required
            name='phone' value={shippingAdd.phone} onChange={(e) => handleShipping(e)}></input>
           </Card>

           {/* ⁡⁢⁣⁢Second Card⁡ */}
           <Card cardClass={styles.card}>
            <h3>Billing Address</h3>
            <label>Name:</label>
            <input type='text' placeholder='Name' required
            name='name' value={billingAdd.name} onChange={(e) => handleBilling(e)}></input>

            <label>Address Line 1:</label>
            <input type='text' placeholder='Address Line 1' required
            name='line1' value={billingAdd.line1} onChange={(e) => handleBilling(e)}></input>
            
            <label>Address Line 2:</label>
            <input type='text' placeholder='Address Line 2' required
            name='line2' value={billingAdd.line2} onChange={(e) => handleBilling(e)}></input>

            <label>City:</label>
            <input type='text' placeholder='City' required
            name='city' value={billingAdd.city} onChange={(e) => handleBilling(e)}></input>

            <label>State:</label>
            <input type='text' placeholder='State' required
            name='state' value={billingAdd.state} onChange={(e) => handleBilling(e)}></input>

            <label>Postal Code:</label>
            <input type='text' placeholder='Postal Code' required
            name='postal_code' value={billingAdd.postal_code} onChange={(e) => handleBilling(e)}></input>
            
        
            <CountryDropdown
             
              classes={styles.select}
              valueType='short' value={billingAdd.country}
              onChange={(valu) => handleBilling({ target: {
                name: 'country',
                value: valu}
               
                }
              )}
            />          

            <label>Phone:</label>
            <input type='text' placeholder='Phone' required
            name='phone' value={billingAdd.phone} onChange={(e) => handleBilling(e)}></input>
            <button type='submit' className='--btn --btn-primary'>Proceed to Checkout</button>
           </Card>
          </div>
          
          <div>
            <Card cardClass={styles.card}>
              <CheckoutSummary/>
            </Card>
          </div>
        </form>

      </div>
    </section>
  )
}

export default CheckoutDetails