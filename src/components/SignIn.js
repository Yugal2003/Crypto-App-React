import React,{useState} from 'react'
import app from './firebase';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import toast from 'react-hot-toast'
import './SignIn.css'
import { NavLink } from 'react-router-dom';
import Header from './Header';

const SignIn = () => {
  const [email,setEmail] = useState();
  const [password,setPassword] = useState();

  const auth = getAuth();
  
  async function signIn(event){

    event.preventDefault();

    try {
      const dataSignUp = await signInWithEmailAndPassword(auth,email,password); console.log(dataSignUp); console.log(app);
      toast.success("Login Successfully")
    } 
    catch (error) {
      toast.success("Please Sign Up To Create An Account.")
    }
  }

  return (
    <>
      <Header/>
      <h1>responsive karo web site ne</h1>
        <div className='signin'>
            <div className='loginpage'>
                <h2 style={{marginTop : "1rem",fontFamily : "cursive",fontSize:"30px",color:"white"}}>Login</h2>
                
                <form onSubmit={signIn}>
                        <div className='loginpage_fill_data'>
                            <input required placeholder='Email' type='email' onChange={(e) => setEmail(e.target.value)}/>
                            <input required placeholder='Password' type='password' onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <button type='submit'>Login</button>
                </form>
                <h4 style={{ fontWeight : "400",color : "white",marginTop : "1rem"}}>Don't have an Account? <NavLink to={'/signup'} >SignUp</NavLink></h4>
            </div>
        </div>
    </>
  )
}

export default SignIn