import React, { useEffect, useState } from 'react'
import { Heading } from '../components/Heading'
import { Subheading } from '../components/Subhad'
import { Inputbox } from '../components/Inputbox'
import { Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Bottomwarning } from '../components/Bottomwarning'
import { server } from '../main'
import toast, { Toaster } from "react-hot-toast";
import { Loadingspinner } from '../components/Loading'

const Signup = () => {

    const[name,setname]=useState("")
    const[email,setemail]=useState("")
    const[password,setpassword]=useState("")
    const[user,setuser]=useState("")
    const[buttload,setbuttload]=useState(false)
    const navigate=useNavigate()
    useEffect(()=>{
    const usertoken=localStorage.getItem("token")

   if(usertoken){
    navigate("/")
   }
    },[])
const handleSignup = async (e) => {
    e.preventDefault();
    setbuttload(true)
     // Prevent default form submission
    try {
        const response = await axios.post(`${server}/api/user/signup`, {
            name,
            email,
            password,
        });
        toast.success(response.data.message);
        console.log(response.data.message)
        localStorage.setItem('token', response.data.token);
        navigate('/');
        setbuttload(false)
    } catch (error) {
        toast.error(error.response.data.message);
        console.error('Signup failed:', error.response?.data || error.message);
        alert('Signup failed. Please try again.');
        setbuttload(false)
    }
};



  return (
    <div className='flex justify-center items-center h-screen'>
        <Toaster position="top-center" reverseOrder={false} />
        <form 
        onSubmit={handleSignup}
          className='bg-white p-6 rounded shadow-md w-full md:w-[500px]'>
        <Heading  label={"Sign up"}/>
        <Subheading label={"eneter your information"}/>
        <Inputbox  onchange={(e)=>{
            setname(e.target.value)
        }}
        placeholder="Name"
        label={"Name"}

        />
        <Inputbox  onchange={(e)=>{
            setemail(e.target.value)
        }}
        placeholder="Email"
        label={"emmm"}

        />
        <Inputbox  onchange={(e)=>{
            setpassword(e.target.value)
        }}
        placeholder="Password"
        label={"password"}

        />
        <button
        type='submit'
        className='w-full text-white bg-gray-800 hover:bg-gray-950 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-md px-5 py-2.5 me-2 mb-2 mt-3 '

        
    >
{buttload?<Loadingspinner/>:"Sign up"}


        </button>
       


<Bottomwarning
label={"Already have an account"}
text={"Sign in"}
to={"/signin"}

>

</Bottomwarning>


        </form>
        </div>
  )
}

export default Signup