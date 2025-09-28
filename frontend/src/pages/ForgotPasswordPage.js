import React from 'react'
import AuthCard from '../components/AuthCard'
import NotLoggedInHeader from '../components/NotLoggedInHeader'
import EmailInput from '../components/EmailInput'
import AuthButton from '../components/AuthButton'

function ForgotPasswordPage() {
  return (
    <div className='bg-gray-50 min-h-screen text-center'>
      <NotLoggedInHeader/>
      <h2 className='font-bold text-2xl mt-10'>Forgot your password</h2>
      <AuthCard>
        <div className='flex flex-col gap-2'>
          <EmailInput></EmailInput>
          <EmailInput text='Confirm Email'></EmailInput>
          <AuthButton text={"Email me a link"}></AuthButton>
        </div>
      </AuthCard>
      <p className='mt-5'>Already have an account? <a href='/login' className='text-blue-600'>Sign in</a></p>
    </div>
  )
}

export default ForgotPasswordPage
