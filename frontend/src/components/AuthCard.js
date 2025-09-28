import React from 'react'

const AuthCard = ({ children }) => {
  return(
    <section className="text-center block border border-gray-200 bg-white p-6 shadow-sm rounded-lg max-w-md mx-auto mt-10">
      {children}
  </section>
  )
}

export default AuthCard;