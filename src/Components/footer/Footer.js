import React from 'react';
import {FaFacebook,FaTwitterSquare,FaLinkedin,FaInstagramSquare } from "react-icons/fa";
import styles from './Footer.module.scss';
import gatway from '../assets/gatway.png';
import payment from '../assets/payment.png';



const Footer = () => {
  return (
    <>
     <div className={styles.footer}>

<div className={styles.content1}>

<h4>Contact</h4>
<p><strong>Address:</strong> 888 W Hamilton Ave, California ,United States</p>
<p><strong>Phone:</strong>	(408) 370-2489</p>
<p><strong>Hours:</strong> 10:00 - 18:00, Mon - Friday</p>
<h4>Follow Us</h4>
<div className={styles['social-icon'] }>
<FaFacebook  />
<FaTwitterSquare  />
<FaLinkedin  />
<FaInstagramSquare  />
</div>

</div>

<div className={styles.content2}> 
<h4>About Us</h4>
    <h5>Offices</h5>
    <h5>Sign Up</h5>
    <h5>Products</h5>
    <h5>Company</h5> 
    <h5>Contact Us</h5>
    <h5>Order History</h5>
</div>
<div className= {styles.content3}>
    <h4>Install App</h4>
    <p>From App Store or Google Play</p>
    <img src={payment} className={styles['payment-img']} alt="" />
    <p className={styles['p-2']}>Secure Paymentgateways</p>
    <img className= {styles.payment} src={gatway} alt="" />
</div>
<p className= {styles['copy-right']}>
Copyright@2023 PestroOnline  Waleed Ahmed - All Right Reserved</p>
</div>


    </>
  )
}

export default Footer