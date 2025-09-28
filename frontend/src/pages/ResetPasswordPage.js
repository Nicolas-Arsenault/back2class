import React from 'react'
import NotLoggedInHeader from '../components/NotLoggedInHeader'
import AuthCard from '../components/AuthCard'
import PasswordInput from '../components/PasswordInput'
import AuthButton from '../components/AuthButton'

function ResetPasswordPage() {
  return (
    <div className='bg-gray-50 min-h-screen text-center'>
      <NotLoggedInHeader/>
      <h2 className='font-bold text-2xl mt-10'>Reset Password</h2>
      <AuthCard>
        <div className='flex flex-col'>
          <PasswordInput text='New password'/>
          <PasswordInput text='Re-type password'/>
          <AuthButton text={"Update password"}/>
        </div>
      </AuthCard>
      <p className='mt-5'>Already have an account? <a className='text-blue-600' href='/login'>Sign in</a></p>
    </div>
  )
}

export default ResetPasswordPage
