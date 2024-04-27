import React from 'react';
import styles from './Admin.module.scss';
import Navbar from '../../Components/admin/navbar/Navbar';
import Home from '../../Components/admin/home/Home';
import ViewProducts from '../../Components/admin/viewProducts/ViewProducts';
import AddProducts from '../../Components/admin/addProducts/AddProducts';
import Orders from '../../Components/admin/viewOrders/Orders';
import { Route, Routes } from 'react-router-dom';

const Admin = () => {
  return (
    <div className={styles.admin}>
      <div className={styles.navbar}>
        <Navbar/>
      </div>
      <div className={styles.content}>
        {/* Nested Routing */}
        <Routes>
          <Route path='home' element={<Home/>} />
          <Route path='all-products' element={<ViewProducts/>} />
          <Route path='add-products/:id' element={<AddProducts/>} />
          <Route path='orders' element={<Orders/>} />
        </Routes>
      </div>
    </div>
  )
}

export default Admin