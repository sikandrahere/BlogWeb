import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../Appwrite/auth'
import { logout } from '../../store/authSlice'


const LogoutBtn = () => {
    const dispatch=useDispatch()
    const handleLogoutBtn=()=>{
        authService.logOut().then(()=>{
            dispatch(logout())
            // for update info in store
        })
    }
  return (
    <button
    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
    onClick={handleLogoutBtn}
    >Logout</button>
  )
}

export default LogoutBtn