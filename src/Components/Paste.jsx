import React, { useState , useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deletePaste,} from '../features/paste/pasteSlice'; // importing the deletePaste function from the pasteSlice file.
import {NavLink} from 'react-router-dom'; // NavLink is used to navigate the user to significant page.

function Paste() {
  const paste = useSelector((state) => state.paste.pastes);
  const [isMobile, setIsMobile] = useState(false);
  const [searchTerm , setSearchTerm] = useState('');
  const dispatch = useDispatch();

  // filtering the data based on the search term.
  const filteredData = paste.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  function handleDelete(pasteId){
    dispatch(deletePaste(pasteId));
  }

  function handleShare(paste){
    if(navigator.share){
      navigator.share({
        title:paste.title,
        content:paste.content,
        url:window.location.href,
      }).then(()=>{
        alert('paste shared successfully');
      }).catch((error)=>{
        console.log('Error sharing paste',error);
      })
    }else{
      alert('unable to share your paste due to browser compatibility');
    }
  }
  return (
    <div>
    <div className='flex flex-col items-center'>
      <input className='p-2 w-[30vw] mt-[1.5rem] rounded-md bg-zinc-700'
       type ='search' 
       placeholder='search your pastes here...' 
       value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)}/>
    </div>
    <div>
      {filteredData.length > 0 && filteredData.map((paste) => {
        return(
          <div key = {paste?._id} className='flex justify-center items-center'>
            <div className='h-auto w-[60vw] rounded-md border-[2px] border-zinc-600 mt-4 font-semibold'>
            <div className='text-[1.5rem] text-blue-500 text-center'>{paste.title}</div>
            <hr className='border-[1px] border-green-600'/>
            <div className='text-[1rem] text-white pt-2 px-[1.5rem]'>{paste.content}</div>

            <div className={`flex justify-center items-center ${isMobile ? 'p-2 space-x-[10px]' : 'space-x-[1rem]'} mt-5`}>

              <button className='bg-white text-white text-center mt-2 w-[40px] h-[40px] p-1 rounded-md scale-1' 
              onClick={()=>handleDelete(paste?._id)}><img className='w-[100%] h-[90%]' src='https://cdn-icons-png.freepik.com/256/16596/16596354.png?ga=GA1.1.2099816763.1740677596&semt=ais_hybrid'/></button>

              <button className='bg-purple-400 text-white text-center mt-2 w-[40px] h-[40px] p-1 rounded-md '>
                <NavLink to = {`/?pasteId=${paste?._id}`}><img className='w-[100%] h-[90%]' src='https://cdn-icons-png.freepik.com/256/1159/1159633.png?ga=GA1.1.2099816763.1740677596&semt=ais_hybrid'/></NavLink>
              </button>

              <button className='bg-yellow-400 text-white text-center mt-2 w-[40px] h-[40px] p-1 rounded-md'>
                <NavLink to={`/pastes/${paste?._id}`}><img className='w-[100%] h-[90%]' src='https://cdn-icons-png.freepik.com/256/6935/6935644.png?ga=GA1.1.2099816763.1740677596&semt=ais_hybrid'/></NavLink>
                </button>

              <button onClick={()=>{
                navigator.clipboard.writeText(paste?.content);
              }} className='bg-red-500 text-white text-center mt-2 w-[40px] h-[40px] p-1 rounded-md'><img className='w-[100%] h-[90%]' src='https://cdn-icons-png.freepik.com/256/11917/11917223.png?ga=GA1.1.2099816763.1740677596&semt=ais_hybrid'/></button>

              <button onClick={handleShare} className='bg-green-400 text-white text-center mt-2 w-[40px] h-[40px] p-1 rounded-md'><img className='w-[100%] h-[90%]' src='https://cdn-icons-png.freepik.com/256/2099/2099085.png?ga=GA1.1.2099816763.1740677596&semt=ais_hybrid'/></button>
              </div>
            <div className='text-[0.7rem] text-center text-green-500 mt-4'>{paste.createdAt}</div>
          </div>
          </div>
        )
      })}
    </div>
    </div>
  )
}
export default Paste 