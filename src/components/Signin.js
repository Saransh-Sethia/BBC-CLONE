import React from 'react';
import front from "../assets/front.png";
import bbclogo from "../assets/bbclogo.png";
import {signInWithPopup} from "firebase/auth"
import { auth, googleProvider } from '../firebase/setup';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
  const navigate = useNavigate();

  const googleSignin = async() => {
    try{
      await signInWithPopup(auth, googleProvider)
      auth.currentUser && navigate("/")
    }catch(error){
      console.log(error, error.message)
    }
console.log(auth)
  }
  return (
    <div className='grid grid-cols-2 bg-black h-screen'>
      <div className='text-center'>
<img src={bbclogo} alt="logo" className='h-14 ml-60 mt-32'/>
<h1 className='text-white text-3xl font-semibold mt-7'>Sign In</h1>
<button onClick={googleSignin} class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-14 w-96 mt-14">
  Sign in
</button> 
<h2 className="text-blue-500 underline mt-7">Sign In Now</h2>
      </div>
      <div>
        <img src={front} alt="front" className='h-screen'/>
      </div>
    </div>
  )
}

export default Signin
