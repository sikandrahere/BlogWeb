import React , {useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { login as authSliceLogin } from '../store/authSlice'
import {Btn,Input,Logo} from './Index'
import { useDispatch } from 'react-redux'
import {useForm} from 'react-hook-form'
import authService from '../Appwrite/auth'

const Login = () => {
    const navigate= useNavigate()
    const dispatch=useDispatch()
    const {register,handleSubmit}=useForm() // from useform 
    // register = store value from input filed and send to the    handlesubmit
    //hanglesubmit= its takes the value and works as a key 
    const [error,setError]=useState('')

    const login = async (data) => { 
        // here data is gmail and password

        setError("")
        const session=await authService.login(data) // using gmail and password try to login 
       try {
        if (session) {
            // if login is success get user mail and password 
            const userData=await authService.getCurrentUser()
            if(userData){
                dispatch(authSliceLogin({userData}))
                // mail and password update in the store
                navigate("/")
                // and navigate the user in the home page 
            }
        }
        
       } catch (error) {
        setError(error.message)
        // if login have error then show the error
        
       }
    }
  return (
    <div className="flex items-center justify-center w-full py-4 m-[10px]"    >
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>
        {/*error handling */}
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(login)} className='mt-8'>
         {/*  handleSubmit gives the value to the login  */}
            <div className='space-y-5'>
                <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                    required: true,
                    validate: {
                        //Provides custom validation logic.
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                        // its regex(regular expression)-checks for a valid email format.
                    }
                })}
                />
                <Input
                label="Password: "
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                    required: true,
                })}
                />
                 {/* transfering data into input component file */}
                <Btn
                type="submit"
                className="w-full"
                >Sign in</Btn>
            </div>
        </form>
        </div>
    </div>
  )
}

export default Login


/*
how useForm works=>

 register -> handleSubmit -> login

 register storing value from input field ->provide value for handleSubmit -> getting value from handleSubmit by 'data' parameter
*/
