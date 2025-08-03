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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Header */}
      <div className='flex w-full bg-gradient-to-r from-green-600 to-green-700 items-center justify-between px-6 py-4 shadow-lg'>
        <div className="flex items-center space-x-4">
          <Image src="/back2class.png" width="60" height="60" alt='Back2Class logo' className="rounded-lg" />
          <h1 className="text-white text-2xl font-bold">Back2Class</h1>
        </div>

        <div className="flex space-x-4">
          <button 
            onClick={navigateToConnexion}
            className="px-6 py-2 bg-white text-green-700 font-semibold rounded-lg hover:bg-green-50 transition-colors duration-200 shadow-md"
          >
            Connexion
          </button>
          <button 
            onClick={navigateToRegister}
            className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors duration-200 shadow-md"
          >
            Inscription
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-green-800 mb-4">Bienvenue sur Back2Class</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            La plateforme de vente de cahiers du Cegep de Sept-Iles
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h3 className="text-2xl font-bold text-green-700 mb-6 text-center">À propos de nous</h3>
          <p className="text-gray-700 leading-relaxed text-lg">
          Back2Class a été créé par un étudiant du Cégep de Sept-Îles afin d’aider les autres étudiants à trouver les cahiers dont ils ont besoin pour leurs cours, 
          tout en payant moins cher. Back2Class est complètement gratuit et open source. Vous pouvez consulter le code source sur notre <a href="https://github.com/Nicolas-Arsenault/back2class" className="text-green-600 hover:text-green-700">GitHub</a>.
          </p>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-200">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-green-800 mb-2">Apprentissage Flexible</h4>
            <p className="text-gray-600">Étudiez à votre rythme avec nos cours adaptatifs</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-200">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-green-800 mb-2">Communauté Active</h4>
            <p className="text-gray-600">Rejoignez une communauté d'apprenants passionnés</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-200">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-green-800 mb-2">Certification</h4>
            <p className="text-gray-600">Obtenez des certificats reconnus pour vos compétences</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
