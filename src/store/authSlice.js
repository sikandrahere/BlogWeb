// Importing the createSlice function from Redux Toolkit
import { createSlice } from "@reduxjs/toolkit";

// Defining the initial state for the auth slice
const initialState = {
    status: false, // Represents whether the user is logged in or not
    userData: null, // Stores the user data if logged in
};

// Creating the auth slice with createSlice
const authslice = createSlice({
    name: 'auth', // Name of the slice
    initialState, // Initial state for the slice
    reducers: {
        // Reducer for logging in
        login: (state, action) => {
            state.status = true; // Sets the status to true (logged in)
            state.userData = action.payload.userData; // Sets the userData with the payload data
        },
        // Reducer for logging out
        logout: (state, action) => {
            state.status = false; // Sets the status to false (logged out)
            state.userData = null; // Clears the userData
        }
    }
});

// Exporting the actions (login and logout) for use in dispatching
export const { login, logout } = authslice.actions;

// Exporting the reducer for use in the store
export default authslice.reducer;
