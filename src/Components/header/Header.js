import React, { useEffect } from 'react';
import styles from './Header.module.scss';
import { RxHamburgerMenu } from "react-icons/rx";
import { MdCancel } from "react-icons/md";
import { TbShoppingCartFilled } from "react-icons/tb";
import { Link , NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../../fireBase/Config';
import { toast } from 'react-toastify';
import { MdVerifiedUser } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { REMOVE_ACTIVE_USER, SET_ACTIVE_USER } from '../../Redux/slice/authSlice';
import ShowLogin, { ShowLogout } from '../hidenLink/HidenLink';
import AdminRoute, { AdminLink } from '../adminRoute/AdminRoute';
import { CALCULATE_TOTAL_QUANTITY, selectCartTotalQuantity } from '../../Redux/slice/cartSlice';







// Variable Global Decleration
const logo = (
  <div className={styles.logo}>
  <Link to='/'>
    <h2>
      Pestro<span>Online</span>.
    </h2>
  </Link>
</div>
);



// NavActive Link
const activeLink =(
  ({isActive}) => 
            (isActive ? `${styles.active}` : "")
);

// Header Main
const Header = () => {

  // Cart Total Quantity
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);

  useEffect(() => {
    dispatch(CALCULATE_TOTAL_QUANTITY())
  
  }, [])
  
  // Create dispatch variable refference
  const dispatch = useDispatch();

  // Monitor Currently Signed User
  const [displayName, setdisplayName] = useState('');
useEffect(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {   
      const uid = user.uid;
      setdisplayName(user.displayName)

      if(user.displayName == null){
        const u1 = user.email.substring(0, user.email.indexOf('@'));
        const uName = u1.charAt(0).toUpperCase() + u1.slice(1);
        setdisplayName(uName);
      }
      else{
        setdisplayName(user.displayName);
      }
      dispatch(SET_ACTIVE_USER({
        email: user.email,
        userName: user.displayName ? user.displayName : displayName,
        userID: user.uid,
      }))
   
    } else {
      setdisplayName('');
      dispatch(REMOVE_ACTIVE_USER());    
    }
  });

 
}, [dispatch, displayName])

// Menu
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => {
    setShowMenu(!showMenu)
  };
  const hideMenu = () =>{
    setShowMenu(false)
  };
  // Navigate variable Assign
  const navigate = useNavigate();
// Logout
  const logoutuser = () =>{
    signOut(auth).then(() => {
    toast.success('Logout Success')
    navigate('/')
   }).catch((error) => {
    toast.error(error.message)
   });
  }
  // Sticky Navbar
  const [scrollPage, setScrollPage] = useState(false);
  const fixNavbar = () => {
    if(window.scrollY > 50) {
      setScrollPage(true)
    }
    else {
      setScrollPage(false);
    }

  };
  window.addEventListener('scroll', fixNavbar);

  // Cart 
  const cart =(
    <span className={styles.cart}>
    <Link to='/cart'>
      Cart
      <TbShoppingCartFilled size={20}/>
      <p>{cartTotalQuantity} </p>
    </Link>
  
  </span>
  );

  return (
    <>
    <header className={scrollPage ? `${styles.fixed}`: null}>
      <div className={styles.header}>
       {logo}
       {/* Humberger Menu */}
       <nav  className={
              showMenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`
            }>
              <div
              className={
                showMenu
                  ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}`
                  : `${styles["nav-wrapper"]}`
              }
              onClick={hideMenu}
            ></div>

        <ul onClick={hideMenu}>
          <li className={styles['logo-mobile']}>
            {logo}
            <MdCancel size={28} color='#fff' onClick={hideMenu} />

          </li>
          {/* Admin Panel */}
          <li>
            <AdminLink> 
             <Link to='/admin/home'> 
            <button className='--btn --btn-secondary'>
              Admin
            </button>
            </Link>
            </AdminLink>
          </li>

          <li>
            <NavLink to='/'  className={activeLink}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/contact' className={activeLink} >
              Contact
            </NavLink>
          </li>
        </ul>

        <div className={styles['header-right']} onClick={hideMenu}>
          <span className={styles.links}>
            <ShowLogout> 
            <NavLink to='/login' className={activeLink}>Login</NavLink>
            </ShowLogout>
            <ShowLogin> 
            <a href='#' style={{color: '#ADFF2F'}}><MdVerifiedUser size={15}/>Hello, {displayName} </a>
            </ShowLogin>
            <ShowLogout> 
            <NavLink to='/register' className={activeLink}>Register</NavLink>
            </ShowLogout>
            <ShowLogin> 
            <NavLink to='/order' className={activeLink}>My Orders</NavLink>
            </ShowLogin>
            <ShowLogin> 
            <NavLink to='/' onClick={logoutuser}>Logout</NavLink>
            </ShowLogin>
          </span>
          {cart}
         
        </div>
       </nav>
       <div className={styles['menu-icon']}>
        {cart}
        <RxHamburgerMenu size={30} onClick={()=> toggleMenu()}/>
       </div>
      </div>
    </header>
    </>
  )
}

export default Header