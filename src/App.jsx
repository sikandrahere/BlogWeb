import { useEffect, useState } from 'react'
import './App.css'
import {useDispatch} from 'react-redux'
import authService from '../src/Appwrite/auth'
import { login, logout } from './store/authSlice'
import {Outlet} from 'react-router-dom'
import { Footer, Header } from './components/Index.js'
import { useNavigate } from 'react-router-dom'
import appwriteService from './Appwrite/database.js'
import { setPosts } from './store/PostsSlice.js'


function App() {
  const navigate=useNavigate()
// Import necessary hooks from React and Redux
const [loading, setLoading] = useState(true); // Declare a state variable 'loading' with initial value true and a function 'setLoading' to update it
const dispatch = useDispatch(); // Get the dispatch function from the Redux store to dispatch actions

// useEffect hook to run side-effects on component mount
useEffect(() => {
  // Call the authService's getCurrentUser method to fetch the current user
  authService.getCurrentUser()
    .then((userData) => {
      // Check if userData is returned
      if (userData) {
        // Dispatch login action with userData if user is logged in
        dispatch(login({ userData }));     
        return appwriteService.getPosts()
      }
      else {
        // Dispatch logout action if no userData is found (user is not logged in)
        dispatch(logout());
        navigate('/login'); // Redirect to login page
      }
    })
    .then((posts)=>{
      dispatch(setPosts(posts))
    })
    .catch((error) => {
      // Dispatch logout action if an error occurs (e.g., 401 Unauthorized)
      dispatch(logout());
      navigate('/login'); // Redirect to login page
    })
    // finally block to ensure setLoading is called to false after the Promise is settled
    .finally(() => setLoading(false));
}, [dispatch, navigate]); // useEffect dependency array ensures this effect runs only once after the initial render



  return !loading ? (
    <div>
      <Header/>
      <div>
        <Outlet/>
      </div>
      <Footer/>
    </div>
   
  ):null
}

export default App
