import { useState } from 'react'
import { createBrowserRouter , RouterProvider } from 'react-router-dom'
import './App.css'
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import Paste from './Components/Paste'
import View from './Components/View'

function App() {

  const router = createBrowserRouter([{path:'/' , element:<div><Navbar/><Home/></div>},{path:'/paste' , element:<div><Navbar/><Paste/></div>},{path:'/pastes/:id' , element:<div><Navbar/><View/></div>}
  ])
  const [count, setCount] = useState(0)

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
