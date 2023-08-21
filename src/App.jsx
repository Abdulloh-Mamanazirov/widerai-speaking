import { Button } from "antd"
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
  
  if(!window.navigator.onLine){
    return (
      <div className="layout absolute inset-0 grid place-items-center text-white">
        <div className="bg-gray-300 rounded-lg bg-opacity-50 text-center p-3">
          <img width={300} src="/no-connection.png" alt="no-connection" />
          <p className="text-2xl font-semibold text-center">No Internet Connection!</p>
          <Button onClick={()=> window.location.reload()} type="primary" className="bg-blue-500 mt-2">Retry</Button>
        </div>
      </div>
    )
  };
  
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
