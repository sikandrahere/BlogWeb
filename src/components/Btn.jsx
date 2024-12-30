import React from 'react'

const Btn = ({
    children,
    type = "button",
    bgColor = "white",
    className = '',
    onClick,
    ...props
}) => {
  return (
    <button
      type={type}
      className={`px-4 py-4 ${bgColor} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

export default Btn