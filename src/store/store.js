// Importing necessary functions and reducers from Redux Toolkit
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../store/authSlice'; // Importing the authentication reducer
import postReducer from '../store/PostsSlice'
// Configuring the Redux store
const store = configureStore({
    reducer: {
        auth: authReducer, // Adding the auth reducer to the store under the key 'auth'
        posts:postReducer
    }
});

// Exporting the configured store
export default store;
