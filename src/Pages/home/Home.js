import React, { useEffect } from 'react';
import styles from './Home.module.scss';
import Slider from '../../Components/slider/Slider';
import AdminRoute from '../../Components/adminRoute/AdminRoute';
import Product from '../../Components/product/Product';

const Home = () => {

  const url = window.location.href;
  const scroll = () => {
    if(url.includes('#products')){
      window.scrollTo({
        top: 650,
        behavior: 'smooth',
      });
    }
  }

  useEffect(() => {
    scroll();
   
  }, [])
  
  return (
    <>
    <Slider/>
    <Product/>
    <AdminRoute/>
    </>
  )
}

export default Home