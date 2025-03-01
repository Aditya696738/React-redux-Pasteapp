// Here we are creating a View component to display the paste content and title.
import React from 'react'
import { useState  , useRef, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import gsap from 'gsap';
function View() {

  const [isMobile, setIsMobile] = useState(false);

    const {id} = useParams();
    const allPastes = useSelector((state)=>state.paste.pastes);

    const paste = allPastes.filter((p)=>p._id === id)[0];

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

        const aniRef = useRef(null);
        useEffect(()=>{
          gsap.from(aniRef.current,{
            duration:3,
            x:-100,
          })
        }
        ,[])

  const textRef = useRef(null);
  useEffect(() => {
    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 2, ease: 'power3.out' }
    );
  }, []);
  return ( 
    <div>
      <h1 ref={aniRef} className= {`text-center font-bold ${isMobile ? 'text-[1.2rem] text-blue-600' : 'text-[1.5rem]'} mt-[10px]`}>Welcome to Paste App</h1>
      <p ref={textRef} className={`text-center font-semibold ${isMobile ? 'text-[1rem] text-blue-500' : 'text-[1.2rem] text-red-500'} mt-[5px]`}>Here you can paste your text and share with others</p>
      <div className='flex justify-center items-center mt-5 space-x-[2rem]'>

      <input type="text" 
       className='p-2 text-center w-auto rounded-md bg-zinc-700 ' 
      onChange={(e)=>setTitle(e.target.value)} 
      value={paste.title}
      disabled/>
      </div>
      <div className='flex flex-col items-center mt-2 text-white'>
      <div className='w-[70vw] h-[50px] flex items-center pb-2 pr-2 justify-end rounded-t-md mt-[10px] bg-blue-500'>
      <button onClick={()=>{
          navigator.clipboard.writeText(paste?.content);
          }} className='bg-blue-500 text-center mt-2 w-[40px] h-[40px] p-1 rounded-md'><img className='w-[100%] h-[90%]' src='https://cdn-icons-png.freepik.com/256/11917/11917223.png?ga=GA1.1.2099816763.1740677596&semt=ais_hybrid'/></button>
      </div>
        <textarea  placeholder='Write your Paste, Content, Notes and more...' 
        rows ={20} 
        className='p-2 rounded-b-md bg-white  text-black w-[70vw] h-[200px] border-[1px] border-zinc-600' 
        value={paste.content} 
        disabled
        onChange={(e)=>setValue(e.target.value)}>
        </textarea>
        </div>
    </div>
  )
}
export default View
// In the above code snippet, we are creating a View component to display the paste content and title. We are using the useParams hook to get the id of the paste from the URL. We are then using the useSelector hook to get the list of all pastes from the Redux store. We are filtering the pastes array to get the paste with the id that matches the id from the URL. We are then displaying the title and content of the paste in input and textarea elements respectively. We are also disabling the input and textarea elements so that the user cannot edit the title and content of the paste. We are also adding a button to copy the content of the paste to the clipboard.
//