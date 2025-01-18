import React from 'react'

function Logo({width = '100px'}) {
  return (
    <div className='flex items-center'>
      <img  width={width}src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/V-logo.svg/2048px-V-logo.svg.png" alt="" />
      <p className='font-bold'>ViEw</p>
    </div>
  )
}

export default Logo