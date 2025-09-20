import { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './Comp/Navbar'
import HomePage from './Screen/HomePage'
import ProductDetail from './Screen/DetailProduct'
import MyAccount from './Screen/MyAccount'
import Profile from './Screen/Profile'
import Authen from './Screen/Authen'
import Login from './Screen/Login'
import Signup from './Screen/Signup'
import ForgotPassword from './Screen/ForgotPassword'



function App() {
  const [user, setUser] = useState({
    username: "john_doe",
    balanced: 1500,
    ranking: "gold" 
  })
  const location = useLocation()
  const hideNav = ()=>{
    return location.pathname.startsWith('/authen')? false : true
  }
  return (
    <>
      {hideNav() && <Navbar user={user} setUser={setUser} />}

      <Routes>
        <Route path='/' element={<HomePage user={user} />} />
        <Route path='/product/:id' element={<ProductDetail user={user} />} />
        <Route path="/myaccount" element={<MyAccount user={user} />}>
          <Route index element={<Profile user={user} setUser={setUser} />} />
          <Route path="profile" element={<Profile user={user} setUser={setUser} />} />
        </Route>

        <Route path="/authen" element={<Authen />}>
          <Route index element={<Login user={user} setUser={setUser} />} />
          <Route path="login" element={<Login user={user} setUser={setUser} />} />
          <Route path="signup" element={<Signup user={user} setUser={setUser} />} />
          <Route path="forgot-password" element={<ForgotPassword user={user} setUser={setUser} />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
