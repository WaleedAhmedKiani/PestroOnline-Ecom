import React from 'react';
import { useState } from 'react';
import styles from './auth.module.scss';
import login from '../../Components/assets/login.png';
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import Card from '../../Components/card/Card';
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from '../../fireBase/Config';
import { toast } from 'react-toastify';
import { GoogleAuthProvider } from "firebase/auth";
import Loader from '../../Components/loader/Loader';
import { useSelector } from 'react-redux';
import { selectPreviousURL } from '../../Redux/slice/cartSlice';





const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const PreviousURL = useSelector(selectPreviousURL);
  const navigate = useNavigate();

  const redirectUser = () => {
    if(PreviousURL.includes('cart')){
      return navigate('/cart')
    } else {
      navigate('/')
    }
    
  }



  const loginUser = (e) =>{
    e.preventDefault();
    setIsLoading(true)
    
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    setIsLoading(false)
    toast.success('login success')
    redirectUser();
    // ...
  })
  .catch((error) => {
   setIsLoading(false)
   toast.error(error.message)
  });
    
  }

  // Sign in with Google
  const signInWithGoogle = () =>{
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
  .then((result) => {
    const user = result.user;
    toast.success('Login Sucess')
    redirectUser();
   
  }).catch((error) => {
    toast.error(error.message)


  });
  }
  return (
    <> 
    {isLoading && <Loader/>}
    <section className= {`container  ${styles.auth}`}>
        <div className={styles.img}>
            <img src={login} alt='loginImg' width='550'/>
        </div>
        <Card> 
        <div className={styles.form}>
            <h2>Login</h2>
            <form onSubmit={loginUser}>
                <input type='text' placeholder='Email' required
                onChange={(e) => setEmail(e.target.value)} />
                <input type='password' placeholder='Password' required
                onChange={(e) => setPassword(e.target.value)} />

                <button className='--btn --btn-primary --btn-block' type='submit'>
                  Login</button>

                <div className= {styles.links}>
                    <p><Link to='/reset'>Reset Password</Link></p>
                </div>
                <p>--OR--</p>
            </form>
            <button className='--btn --btn-danger --btn-block'
            onClick={signInWithGoogle}>
                <FaGoogle color='gold'/>
             Login with Google</button>

             <span className={styles.register}>
               <p>Don`t have an account? </p> 
               <Link to='/register'> <p className={styles.p2}>Register</p> </Link> </span>
        </div>
        </Card>

    </section>
    </>
  )
}

export default Login