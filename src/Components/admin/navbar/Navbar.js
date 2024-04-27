import styles from './Navbar.module.scss';
import { FaUserTie } from "react-icons/fa6";
import { selectUserName } from '../../../Redux/slice/authSlice';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const activeLink = ({isActive}) => (isActive ? `${styles.active}` : '');
const Navbar = () => {
  const userName = useSelector(selectUserName)

  return (
    <div className={styles.navbar}>
      <div className={styles.user}>
      <FaUserTie  size={50} color='#0a1930'/>
      <h5>{userName}</h5>
      
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to='/admin/home' className={activeLink}>
            Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/admin/all-products' className={activeLink}>
            View Products
            </NavLink>
          </li>
          <li>
            <NavLink to='/admin/add-products/ADD' className={activeLink}>
            Add Products
            </NavLink>
          </li>
          <li>
            <NavLink to='/admin/orders' className={activeLink}>
            View Orders
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar