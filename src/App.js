import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/header/Header";
import Footer from "./Components/footer/Footer";
import Home from "./Pages/home/Home";
import Contact from "./Pages/contact/Contact";
import Login from "./Pages/auth/Login";
import Register from "./Pages/auth/Register";
import Reset from "./Pages/auth/Reset";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Admin from "./Pages/admin/Admin";
import AdminRoute from "./Components/adminRoute/AdminRoute";
import ProductDetails from "./Components/product/productDetails/ProductDetails";
import Cart from "./Pages/cart/Cart";
import CheckoutDetails from "./Pages/checkout/CheckoutDetails";
import CheckoutSuccess from "./Pages/checkout/CheckoutSuccess";
import OrderHistory from "./Pages/order/orderHistory/OrderHistory";



function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset" element={<Reset />} />
          <Route
            path="/admin/*"
            element={
              <AdminRoute>
                {" "}
                <Admin />{" "}
              </AdminRoute>
            }
          />
            <Route path="/product-details/:id" element={<ProductDetails/>}/>
            <Route path="/cart" element={<Cart/>} />
            <Route path="/checkout-details" element={<CheckoutDetails/>} />
            <Route path="/checkout-success" element={<CheckoutSuccess/>} />
            <Route path="/order-history" element={<OrderHistory/>} />
            
           
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
