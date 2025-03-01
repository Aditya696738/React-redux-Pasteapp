import React, { useState, useEffect , useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addPaste, updatePaste } from '../features/paste/pasteSlice';
import gsap from 'gsap';
// 1) Above I'm importing the useDispatch  , useSelector for fetching the data and send the data to the store.
// 2) useSearchParams is used to creata a id for the paste.
// 3) useState and useEffect are used to creata a functionality for resizing the component. 
const Home = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [value , setValue] = useState('');
  const [title , setTitle] = useState('');
  const [searchParams , setSearchParams] = useSearchParams( );
  const pasteId = searchParams.get('pasteId');
  const dispatch = useDispatch();
  const allPastes = useSelector((state)=>state.paste.pastes);
  useEffect(() => {
    if(pasteId){
      const paste = allPastes.find((paste)=>paste._id === pasteId);
      setTitle(paste.title);
      setValue(paste.content);
    }
  }, [pasteId])
    
  function createPaste(){
    const paste = {
      title : title,
      _id: pasteId || Date.now().toString(36),createdAt:new Date().toISOString(),
      content:value
    } 
    if(pasteId){
      //update paste
      dispatch(updatePaste(paste));
    }
    else{
      //create paste
      dispatch(addPaste(paste));
    }
    setTitle('');
    setValue('');
    setSearchParams({});
  }

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 549);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <div>
      <h1 className={`text-center font-bold ${isMobile ? 'text-[1.2rem] text-blue-600' : 'text-[1.5rem]'} mt-[10px]`}>Welcome to Paste App</h1>
      <p  className={`text-center font-semibold ${isMobile ? 'text-[1rem] text-blue-500' : 'text-[1.2rem] text-red-500'} mt-[5px]`}>Here you can paste your text and share with others</p>
      <div className='flex justify-center items-center mt-5 space-x-[2rem]'>
      <input type="text" 
      placeholder='Enter Your Title' className={`${isMobile ? 'w-[55vw]' : 'w-auto'} p-2 rounded-md bg-zinc-700 `} 
      onChange={(e)=>setTitle(e.target.value)} 
      value={title}/>
      <button className={`bg-blue-500 text-white rounded-md ${isMobile ?  'w-[85px] p-1':'p-2'}`}
       onClick={createPaste}>{pasteId? 'update my paste' : 'create Paste'}</button>
      </div>
      <div className='flex justify-center items-center mt-2 text-white'>
        <textarea placeholder='Write your Paste, Content, Notes and more...' 
        rows ={20} className='p-2 mt-[20px] rounded-md bg-zinc-800 w-[70vw] h-[200px] border-[1px] border-zinc-600' 
        value={value} 
        onChange={(e)=>setValue(e.target.value)}></textarea>
        </div>
    </div>
  )
}
export default Home

