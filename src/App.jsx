import { useEffect } from "react"
import { Route, Routes, useNavigate } from "react-router-dom"
import { Nav, Footer } from "./Components"
import { Signup, Signin, Home } from './Pages'

const App = () => {
  const navigate = useNavigate()
  useEffect(()=>{
    const token = localStorage.getItem("widerai-token")
    if(!token) navigate('/signup')
  },[])
  
  return (
    <div className="layout">
      <Nav/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/signin" element={<Signin/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
