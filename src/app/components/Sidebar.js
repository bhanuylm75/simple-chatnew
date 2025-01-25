"use client"
import React, { useState,useEffect } from 'react'
import { FaSearch, } from "react-icons/fa";
import { FaArrowLeft } from 'react-icons/fa';
import axios from "axios";
import Link from 'next/link';
import { chatHrefConstructor } from '../lib/utils';

const Sidebar = ({session}) => {
  const [sessionId, setSessionId] = useState(session)
  const [isExpanded, setIsExpanded] = useState(false);

  const [users,setusers]=useState([])

  const [searchresults,setsearchresults]=useState([])

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    // Fetch users on component mount
    allusers();
  }, []); // Empty dependency array, will only run once on component mount


  const allusers = async () => {
  try{
    const res=await axios.get("api/getallusers")
    const rawusers = res?.data?.map((user) => JSON.parse(user));
  
    const users=rawusers.filter((user)=>(user.id!=sessionId))
    console.log(users ,"fromidebar")
    
    setusers(users)

  }
  catch(err){
    console.error("Error fetching users: ", err.message);

  }
  }


  const onchangefun=(e)=>{
    console.log(users)
    console.log(e.target.value)
    const searchvalue=e.target.value
    const searchresults = users?.filter((user) =>
      user?.name.toLowerCase().includes(searchvalue.toLowerCase())
    );
    

    setsearchresults(searchresults)

    console.log(searchresults)

  }
  const onlinkclick=()=>{
   console.log("jj")
  }

  return (
    <div className="bg-white w-full   px-4 pt-2 h-full rounded-lg  relative">
      <h1 className="text-xl md:text-2xl pb-3 font-bold text-gray-800 tracking-tight leading-tight">
        Chats
      </h1>
      <div className="relative flex items-center"
      >
        {isExpanded && (
          <FaArrowLeft
            className={`text-black text-2xl cursor-pointer pr-2 `}
            onClick={toggleSidebar}  // Handle click to toggle the sidebar width
          />
        )}
       
        
        <FaSearch  className={`absolute  top-1/2 transform -translate-y-1/2 text-gray-400 ${
              isExpanded ? "left-8" : "left-4"
            }`} />
        <input
          type="text"
          onChange={onchangefun}
          onClick={()=>setIsExpanded(true)}
          placeholder="Search..."
          className={` pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none transition-all duration-300 ${
            isExpanded ? "w-[85%]" : "w-[100%]"
          }`}

        />
        </div>

        <div className="mt-4">
        {searchresults?.length > 0 ? (
          searchresults.map((user, index) => (
            <Link onClick={onlinkclick} href={`/mychats/${chatHrefConstructor(sessionId,user.id)}`} key={index}>
            <div
              
              className="flex items-center gap-4 p-2 border-b hover:bg-gray-100 transition"
            >
              {/* User Image */}
              <img
                src={user.image}
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              {/* User Details */}
              <div>
                <p className="text-lg font-semibold text-gray-800">{user.name}</p>
              
              </div>
            </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-500 text-center mt-4">No users found</p>
        )}
      </div>
        
        
        
      
      
    </div>
  );
}

export default Sidebar;
