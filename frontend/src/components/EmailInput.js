import React from 'react'

function EmailInput({value, onChange, text="Email"}) {
  return (
    <div className='flex flex-col'>
      <label className="text-left mb-2 font-medium">{text}</label>
      <input 
        type="email" 
        placeholder={text} 
        value={value}
        onChange={onChange}
        className="border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
    </div>
  )
}

export default EmailInput
