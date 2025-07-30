'use client';

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation';

function page() {
  const router = useRouter();

  const navigateToConnexion= ()=>{
    router.push('/login');
  };

  const navigateToRegister = ()=>{
    router.push('/register');
  };

  return (
    <>
    <div className='flex w-full bg-green-600 items-center'>

      <Image src="/back2class.png" width="100" height="100" alt='Back2Class logo'></Image>

      <button onClick={navigateToConnexion}>Connexion</button>
      <button onClick={navigateToRegister}>Inscription</button>
    </div>
      <header>
        About Us
      </header>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci expedita consectetur cupiditate corrupti repellendus odit, laborum suscipit nisi molestias laboriosam distinctio quos ratione nemo asperiores id illum possimus! Quisquam, vel!
      </p>

    </>
  )
}

export default page
