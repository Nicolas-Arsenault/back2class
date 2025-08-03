'use client';

import React from 'react'
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import { APP_NAME, APP_DESCRIPTION } from '@/lib/constants';

function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-green-800 mb-4">Bienvenue sur {APP_NAME}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {APP_DESCRIPTION}
          </p>
        </div>

        <Card variant="elevated" className="mb-8">
          <h3 className="text-2xl font-bold text-green-700 mb-6 text-center">À propos de nous</h3>
          <p className="text-gray-700 leading-relaxed text-lg">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci expedita consectetur cupiditate corrupti repellendus odit, laborum suscipit nisi molestias laboriosam distinctio quos ratione nemo asperiores id illum possimus! Quisquam, vel!
          </p>
        </Card>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-green-800 mb-2">Apprentissage Flexible</h4>
            <p className="text-gray-600">Étudiez à votre rythme avec nos cours adaptatifs</p>
          </Card>

          <Card>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-green-800 mb-2">Communauté Active</h4>
            <p className="text-gray-600">Rejoignez une communauté d'apprenants passionnés</p>
          </Card>

          <Card>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-green-800 mb-2">Certification</h4>
            <p className="text-gray-600">Obtenez des certificats reconnus pour vos compétences</p>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Page
