// Import React library to use React components and JSX
import React from 'react';

// Define the Container component as a functional component
// Destructure the 'children' prop to access the content passed between the component's tags
const Container = ({ children }) => {
    // Render a div with specific classes for styling and layout
    // {children} renders any child elements passed to the Container component
    return (
        <div className='w-full max-w-7xl mx-auto px-4'>
            {children}
        </div>
    );
}

// Export the Container component to make it available for use in other files
export default Container;
