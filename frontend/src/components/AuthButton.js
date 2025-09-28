import React from 'react'

function AuthButton({text, onClick}) {
  return (

    <button 
      onClick={onClick}
      className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200">{text}</button>

  )
}

export default AuthButton
