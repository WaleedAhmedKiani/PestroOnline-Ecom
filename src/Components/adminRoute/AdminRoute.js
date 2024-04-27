import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectEmail } from '../../Redux/slice/authSlice'




const AdminRoute = ({children}) => {
    const userEmail = useSelector(selectEmail)
    if(userEmail === 'ahmedkayani07@gmail.com'){
        return children
    }
    return (
        <section style={{heigh:'70vh'}}>
            <div className='container'> 
            <h2>Access Denied.</h2>
            <p>To View this Page register yourself first as an Admin user.</p>
            <br/>
            <Link to='/'>  
            <button className='--btn --btn-primary'>&laquo;
            Back To Home</button>
            </Link>
            </div>
        </section>
    )
 
}

export const AdminLink = ({children}) => {
    const userEmail = useSelector(selectEmail)
    if(userEmail === 'ahmedkayani07@gmail.com'){
        return children
    }
  
 
}

export default AdminRoute