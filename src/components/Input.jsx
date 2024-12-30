import React,{useId} from 'react'

const Input=React.forwardRef(function Input({ 
    // wrap into a forwardref
    label,
    type="text",
    className="",
    ...props
},ref)
{
    const id=useId()
    return(
        <div className='w-full'>
            {label && <label 
            className='inline-block mb-1 pl-1' 
            htmlFor={id}>
                {label}
            </label>
            }
            <input
            type={type}
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
            ref={ref}
            {...props}
            id={id}
            />
        </div>
    )
})

export default Input

// export deafault React.forwardRed(Input)

// second way of wrapping forwardRef


//if we make a form and we have input field in other file and we want refernce in form to use as username filed and password filed then for ref we use forwardRef