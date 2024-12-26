import React from 'react'
import { IoIosCloseCircle } from "react-icons/io";
import { Chatdata } from '../context/Chatprovide';
import { MdDelete } from "react-icons/md";
import { Loadingspinner } from './Loading';
import { useUserData } from '../context/Userprovider';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({isopen,reverse}) => {
  const{chats,createchatss, createLod,setSelected,deletechats}=Chatdata()
  const{logoutfunc}=useUserData()
  const navigate=useNavigate()
  const deletechathandlers=(id)=>{
    if(confirm("Do you want to delete this chat")){
      deletechats(id)
    }
  }

  const clickevent=(id)=>{
    setSelected(id)
    reverse()
  }
  return (
    <div className={`fixed inset-0 font-roboto  bg-gray-900 transition-transform transform md:relative md:translate-x-0 md:w-1/4 md:block ${
        
    isopen? "translate-x-0" : "-translate-x-full"
        
    }`}>
        <button className='md:hidden p-2 mb-4 bg-gray-700 rounded text-2xl'
        onClick={reverse}>
<IoIosCloseCircle/>

        </button>
       
  <div className='text-2xl font-roboto font-semibold ml-2 mb-6 mt-2 pl-2 pt-2'>ChatHub</div>
  <div className='mb-4 box-border px-4'> 


    <button
     onClick={createchatss}
    className="w-full py-2 bg-gray-700 hover:bg-gray-600 rounded "
    > 


     {createLod?<Loadingspinner/>:"Newchat"}
    </button>
    <p className='text-sm text-gray-400 mb-2 pt-3'>Recent</p>
    <div className='max-h-[500px] overflow-y-auto mb-20 md:mb-0 scrollbar'>
   

<div className="max-h-[500px] overflow-y-auto mb-20 md:mb-0 thin-scrollbar">
  {chats && chats.length > 0 ? (
    chats.map((e) => (
      <div
        key={e._id}
        className="w-full text-left py-2 px-2 bg-gray-700 hover:bg-gray-600 rounded mt-2 flex justify-between items-center"
        onClick={() => clickevent(e._id)} 
      >
        <span>{e.latestmessage.slice(0, 38)}...</span>
        <button
          className="bg-red-600 text-white text-xl px-3 py-2 rounded-md hover:bg-red-700"
          onClick={(event) => {
            event.stopPropagation(); 
            deletechathandlers(e._id);
          }}
        >
          <MdDelete />
        </button>
      </div>
    ))
  ) : (
    <p>No chats yet</p>
  )}
</div>


    </div>

      </div>
      <div className="absolute bottom-0 ml-4 mb-6 w-full">
        <button
          className="bg-blue-500 text-white text-xl px-3 py-2 rounded-md hover:bg-blue-600"
          onClick={()=>{
            
            logoutfunc(navigate)}}
           >
          Logout
        </button>
      </div>
        </div>
  )
}

export default Sidebar