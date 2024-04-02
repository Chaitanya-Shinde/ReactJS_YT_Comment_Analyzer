import React from 'react'

const MyButton = ({
  label='Button',
  type='button',
  className='',
  disabled=false,
  onClick=()=>{}
}) => {
  return (
    <div>
        <button onClick={onClick} type={type} disabled={disabled} className={` 
        bg-tertiary
        px-3 py-2 rounded-md
        text-lg
        font-semibold
        text-primary
        hover:bg-[#436180]
        disabled:bg-[#192531]
        active:bg-[#1d3347]
        ${className}`}>{label}</button>
    </div>
  )
}

export default MyButton