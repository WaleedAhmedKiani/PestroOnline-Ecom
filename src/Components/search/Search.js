import styles from './Search.module.scss';
import { FaSearchengin } from "react-icons/fa";



const Search = ({value, onChange}) => {
  return (
   <div className={styles.search}>
    <FaSearchengin  size={20} className={styles.icon} />
    
    <input type='text' placeholder='Search by name' value={value}
    onChange={onChange}/>

   </div>
  )
}

export default Search