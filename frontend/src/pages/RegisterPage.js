import React from 'react'
import NotLoggedInHeader from '../components/NotLoggedInHeader';
import AuthCard from '../components/AuthCard';
import EmailInput from '../components/EmailInput';
import PasswordInput from '../components/PasswordInput';
import AuthButton from '../components/AuthButton';

function RegisterPage() {
  return (
    <div className='bg-gray-100 min-h-screen text-center'>
      <NotLoggedInHeader/>
      <h2 className='text-2xl mt-10 font-bold'>Create a new account</h2>
      <AuthCard>
        <div className='flex flex-col mb-5'>
          <EmailInput></EmailInput>
          <label className="text-left mb-2 font-medium">Username</label>
          <input type="text" placeholder="Username" className="border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          <PasswordInput></PasswordInput>
          <PasswordInput text='Re-type Password' placeholderText='Re-type password'></PasswordInput>
          <AuthButton text={"Sign up"}></AuthButton>
        </div>
        <a href='/forgot-password' className='text-blue-600 mt-5'>Forgot password?</a>
      </AuthCard>
      <p className='mt-5'>Already have an account? <a className='text-blue-600' href='/login'>Sign in</a></p>
    </div>
  )
}

export default RegisterPage
