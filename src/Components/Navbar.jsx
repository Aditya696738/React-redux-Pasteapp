import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom'
function Navbar() {
  const [isMobile , setIsMobile ] = useState(false);
  useEffect(() => {
    const handleResize = ()=>{
      setIsMobile(window.innerWidth <=549);
    }
  window.addEventListener('resize' , handleResize);
  handleResize();
    return () => {
      window.removeEventListener('resize' , handleResize);
    };
  }, []);
  return (
    <div className={`box ${isMobile ? 'w-auto h-auto' : 'w-full h-[60px]'} items-center flex justify-between  p-[1rem] bg-zinc-800 rounded-md`}>
        <h1 className='text-[2rem]  font-bold text-blue-500 '>Paste App</h1>
        <div>
        <nav className={`flex ${isMobile ? 'flex-col gap-[10px]' : 'flex-row space-x-4'}`}>
            <NavLink to='/' className='p-2 bg-red-600 text-white font-semibold rounded-md'>Home</NavLink>
            <NavLink to='/paste' className='p-2 bg-red-600 text-white font-semibold rounded-md'>Paste</NavLink>
        </nav>
        </div>
    </div>
  )
}

export default Navbar