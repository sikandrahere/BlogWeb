import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Home from "./components/pages/Home"
import Signup from './components/pages/SignUp'
import AddPost from './components/pages/AddPost'
import AllPost from './components/pages/AllPost'
import EditPost from './components/pages/EditPost'
import Post from './components/pages/Post'
import {AuthLayout,Login} from './components/Index.js'

const router= createBrowserRouter([

  {
    path:"/",
    element:<App/>,
    children:
    [
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"/login",
        element:
        <AuthLayout authentication={false}>
          <Login/>
        </AuthLayout>
      },
      {
        path: "/signup",
        element: (
            <AuthLayout authentication={false}>
                <Signup />
            </AuthLayout>
        ),
    },
    {
        path: "/all-posts",
        element: (
            <AuthLayout authentication>
                {" "}
                <AllPost />
            </AuthLayout>
        ),
    },
    {
        path: "/add-post",
        element: (
            <AuthLayout authentication>
                {" "}
                <AddPost />
            </AuthLayout>
        ),
    },
    {
        path: "/edit-post/:slug",
         //slug acts as a placeholder for a specific value that will be provided in the URL
        element: (
            <AuthLayout authentication>
                {" "} 
                {/*  for space */}
                <EditPost />
            </AuthLayout>
        ),
    },
    {
        path: "/post/:slug",
        element: <Post />,
    },
    ]
  }
])



createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>,
)
