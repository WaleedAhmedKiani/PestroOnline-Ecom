import React from 'react';
import styles from './auth.module.scss';
import Loader from '../../Components/loader/Loader';
import { Link , useNavigate } from 'react-router-dom';
import Card from '../../Components/card/Card';
import register from '../../Components/assets/register.png';
import { useState } from 'react';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import { auth } from '../../fireBase/Config';
import { toast } from 'react-toastify';

const Register = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

 const navigate = useNavigate()
 
  const registeruser = (e) =>{
    e.preventDefault();
    if(password !== cpassword){
      toast.error('Password not match');
   
    }
    setIsLoading(true)

    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    setIsLoading(false)
    toast.success('Account Added Sucessfully')
    navigate('/login')
       // ...
  })
  .catch((error) => {
   
    toast.error(error.message);
    setIsLoading(false);
    // ..
  });
  
  }
  return (
    <> 
    {isLoading && <Loader />}
    
    <section className= {`container  ${styles.auth}`}>
   
    <Card> 
    <div className={styles.form}>
        <h2>Register</h2>
        <form onSubmit={registeruser}>
            <input type='text' placeholder='Email' required value={email}
            onChange={(e) => setEmail(e.target.value)} />
            <input type='password' placeholder='Password' required 
            value={password} onChange={(e) => setPassword(e.target.value)}/>
            <input type='password' placeholder='Confirm Password' required
            value={cpassword} onChange={(e) => setCPassword(e.target.value)} />
            <button className='--btn --btn-primary --btn-block'
            type='submit'>Register</button>

            <div className= {styles.links}>
                <p><Link to='/reset'>Reset Password</Link></p>
            </div>
            <p>--OR--</p>
        </form>
       
        
         <span className={styles.register}>
           <p>Already have an account? </p> 
           <Link to='/login'> <p className={styles.p2}>Login</p></Link> </span>
    </div>
    </Card>
    <div className={styles.img}>
        <img src={register} alt='RegisterImg' width='550'/>
    </div>

</section>
</>
  )
}

export default Register