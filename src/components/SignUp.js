import React,{useState} from 'react'
import './SignUp.css'
import app from './firebase';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { NavLink } from 'react-router-dom';
import toast from 'react-hot-toast'
import Header from './Header';

const SignUp = () => {
  const [email,setEmail] = useState();
  const [password,setPassword] = useState();

  const auth = getAuth();
  
  async function signUp(event){

    event.preventDefault();

    try {
      const dataSignUp = await createUserWithEmailAndPassword(auth,email,password); console.log(dataSignUp); console.log(app);
      toast.success("SignUp Successfully")     
    } 
    catch (error) {
      toast.success("This Email Id Already Exist. Please Try Another.")
    }
  }

  return (
    <>
    <Header/>
      <div>
      <div className='signup'>
          <div className='email_password'>
              <form onSubmit={signUp}>
                  <h2 style={{fontSize:"30px",color:"white",fontFamily : "cursive", marginTop : "0.4rem"}}>Sign Up</h2>

                  <div className='first_last_name'>
                    <input autocomplete="off" required type='text' placeholder='First Name' />
                    <input className='last' autocomplete="off" required type='text' placeholder='Last Name' />
                  </div>

                  <div className='email_pass_section'>
                    <input autocomplete="off" required type='number' placeholder='Phone Number' />
                    <input autocomplete="off" required placeholder='Email' type='email' onChange={(e) => setEmail(e.target.value)}/>
                    <input autocomplete="off" required placeholder='Password' type='password' onChange={(e) => setPassword(e.target.value)}/>
                  </div>

                  <div style={{display : "flex",justifyContent : "center",marginTop : "0.5rem"}}>
                      <input required type='checkbox' /><span style={{paddingInline : "0.5rem",color:"white",fontSize:"12px"}}>I accept the Terms of Use & Privacy Policy</span>
                  </div><br></br>

                  <button className='signupbtn' type='submit'>Sign Up</button>
              </form>
              <h4 className='h4tag' style={{color : "white",fontWeight : "400"}}>Already have an Account? <NavLink to={'/signin'} > Login here</NavLink> </h4>
          </div>
      </div>
      </div>
    </>
  )
}

export default SignUp