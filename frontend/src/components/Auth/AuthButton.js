import React from 'react'

function AuthButton({text, onClick}) {
  return (
    <button 
      onClick={onClick}
      className="bg-emerald-600 text-white py-2 rounded-md hover:bg-emerald-700 transition duration-200">{text}
    </button>
  )
}

export default AuthButton
