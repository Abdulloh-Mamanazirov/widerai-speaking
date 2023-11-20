import React from 'react'
import ReactDOM from 'react-dom/client'
import axios from 'axios'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import App from './App.jsx'
import './index.css'

// axios
const token = sessionStorage.getItem('widerai-token')
// axios.defaults.baseURL = "http://3.125.33.174:3000/api";
axios.defaults.baseURL = "http://localhost:4000/api";
axios.defaults.headers.common["Authorization"] = token ? `Bearer ${token}` : null

// toastify
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
    <ToastContainer theme='colored'/>
  </BrowserRouter>,
)
