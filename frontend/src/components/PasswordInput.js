import React from 'react'

function PasswordInput({value,onChange,text="Password", placeholderText ="Password"}) {
  return (
    <div className='flex flex-col'>
          <label className="text-left mb-2 font-medium">{text}</label>
          <input 
            type="password" 
            placeholder={placeholderText} 
            value={value}
            onChange={onChange}
            className="border border-gray-300 rounded-md p-2 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
    </div>
  )
}

export default PasswordInput
