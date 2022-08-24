import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './component/Home'
import Menu from './component/Menu'
import Pnf from './component/Pnf'
import Upload from './component/Upload'

import {ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
     <Menu/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/upload' element={<Upload/>} />
        <Route path='/*' element={<Pnf/>} />
      </Routes>
    </Router>
  )
}

export default App
