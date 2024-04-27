
import { useSelector } from 'react-redux';
import { selectisLoggedIn } from '../../Redux/slice/authSlice';


const ShowLogin = ({children}) => {
    const isLoggedIn = useSelector(selectisLoggedIn)
    if(isLoggedIn){
        return children;
    }
  return null; 

  
}

export const ShowLogout = ({children}) => {
    const isLoggedIn = useSelector(selectisLoggedIn)
    if(!isLoggedIn){
        return children;
    }
  return null; 

  
}

export  default ShowLogin