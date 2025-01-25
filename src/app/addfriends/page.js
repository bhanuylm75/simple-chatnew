"use client"
import React, { useState } from 'react'
import { FaSearch, } from "react-icons/fa";
import { FaArrowLeft } from 'react-icons/fa';

const Page = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-white w-[90%]  px-4 pt-2 h-full rounded-lg  relative">
      <h1 className="text-xl md:text-2xl pb-3 font-bold text-gray-800 tracking-tight leading-tight">
        add friend
      </h1>
  
      
     
        
        
      
      
    </div>
  );
}

export default Page;
