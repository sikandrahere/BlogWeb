import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AuthLayout = ({ children, authentication = true }) => {
    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        // Check authentication status and navigate accordingly

        // If authentication is required and user is not authenticated, navigate to login
        if (authentication && authStatus !== authentication) {
            navigate("/login")
            // If authentication is not required and user is authenticated, navigate to home
        } else if (!authentication && authStatus !== authentication) {
            navigate("/")
        }
        setLoader(false) // Stop loading
    }, [authStatus, navigate, authentication])

    return loader ? <h1>Loading...</h1> : <>{children}</>

}

export default AuthLayout;