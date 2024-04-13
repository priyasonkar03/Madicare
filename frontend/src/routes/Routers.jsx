import React from 'react'
import Home from '../pages/Home'
import Services from '../pages/Services'
import Login from '../pages/Login'
import Contact from '../pages/Contact'
import Signup from '../pages/Signup'
import Doctors from '../pages/Doctors/Doctors'
import DoctorsDetails from '../pages/Doctors/DoctorDetails'
import MyAccount from '../Dashboard/user-account/MyAccount'
import Dashboard from '../Dashboard/doctor-account/Dashboard'
import {Routes, Route} from 'react-router-dom'
import ProductRoute from './ProductRoute'
import CheckoutSuccess from '../pages/CheckoutSuccess'
const Routers = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/home' element={<Home/>} />
      <Route path='/doctors' element={<Doctors />} />
      <Route path='/doctors/:id' element={<DoctorsDetails/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Signup/>} />
      <Route path='/contact' element={<Contact/>} />
      <Route path='/services' element={<Services/>} />
      <Route path='/checkout-success' element={<CheckoutSuccess/>} />
      <Route 
      path='/users/profile/me' element={
      <ProductRoute allowedRoles={['patient']} >
        <MyAccount/>
      </ProductRoute>} />

      <Route 
      path='/doctors/profile/me' element={
      <ProductRoute allowedRoles={['doctor']} >
        <Dashboard/>
      </ProductRoute>} />
     
    </Routes>
  )
}

export default Routers