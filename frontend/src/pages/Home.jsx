import React, { useEffect, useRef } from 'react'
import Sidebar from '../components/Sidebar'
import { useState } from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import Header from '../components/Header';
import { Chatdata } from '../context/Chatprovide';
import { Avatar } from '@mui/material';
import { FaRobot } from "react-icons/fa";
import { Loadinglarge, Loadingsamll } from '../components/Loading';
import { IoMdSend } from 'react-icons/io';

const Home = () => {
  const[isopen,setisopen]=useState(true)
  const reverse=()=>{
    setisopen(!isopen)
  }
  const {getresponse,
    messages,
    label,
    setlabel,
    newrequestload,
  createlod,
  deletechats,
chats}=Chatdata()
    const submitHandler=(x)=>{
      x.preventDefault()
      getresponse()
    }
    const messagecontainerRef = useRef();

    useEffect(() => {
      if (messagecontainerRef.current) {
        messagecontainerRef.current.scrollTo({
          top: messagecontainerRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }, [messages]);
  return (
    <div className='text-white flex h-screen '>
    
    <Sidebar isopen={isopen} reverse={reverse}/>
   <div className='flex flex-1 flex-col'>
  <button 
  onClick={reverse}
  className="md:hidden p-4 bg-gray-800 text-2xl"
>
  <GiHamburgerMenu />
</button>
{createlod?(Loadinglarge):(
<div className="flex-1 p-6 mb-20 md:mb-0">
          <Header />
          <div className='flex-1 p-6 max-h-[600px] overflow-y-auto mb-20 md:mb-0 scrollbar'
          
          ref={messagecontainerRef}>
{
  messages && messages.length>0 ?(messages.map((x,i)=>(
    <div key={i}>
      <div className='mb-4 p-4 rounded-lg bg-gray-700 text-white items-start flex gap-2'>
      
        <div className={`flex-shrink-0 ${isopen ? 'hidden' : 'block'} md:block`}>
          
          <Avatar   sx={{
              color: "black",
              bgcolor: "white",
               
              fontWeight:700,
              // height:"10px"
              
              
            }}>
              


          </Avatar></div>
          
        <div className='py-1'>
        {x.question}
        </div>
      </div>
      <div className='mb-4 p-4 rounded bg-[rgb(17,29,39)]  text-white flex items-start gap-2'>
        <div className='bg-white p-2 rounded-full text-black text-2xl h-10'>
          <FaRobot/>
        </div >
        <div className='py-1'>
        {x.answer}
        </div>
      </div>

      </div>))):<p>Create new chat to continue</p>
  }

  {newrequestload && <Loadingsamll/>}

          </div>
          </div>)
}
</div>
{chats.length===0?"":(
<div className='fixed bottom-0 right-0 left-auto p-5 bg-gray-950 w-full md:w-[75%]'>
  <form  
   onSubmit={submitHandler}
  
  className='flex justify-center items-center'>
<input
className='flex-grow p-4 bg-gray-700 rounded-sm text-white outline-none'
type='text'
placeholder='enter your query'
value={label}
onChange={(e)=> setlabel(e.target.value)}
required
>
</input>
<button className="p-4 bg-gray-700 rounded-r text-2xl text-white">
              <IoMdSend />
            </button>
  </form>
</div>
)}
</div>
  )

}

export default Home