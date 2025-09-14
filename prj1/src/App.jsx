import { useState } from 'react'
import './App.css'
import HomePage from './Screen/HomePage.jsx'
import { Route, Router, Routes } from 'react-router-dom'
import Navbar from './Comp/Navbar.jsx'
import ProductDetail from './Screen/DetailProduct.jsx'

function App() {
  const [user, setUser] = useState(null)

    return (
    <>
      {/* <Navbar user={user} setUser={setUser} /> */}
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/product/:id' element={<ProductDetail/>}/>
      </Routes>
    </>
  )
}

export default App
