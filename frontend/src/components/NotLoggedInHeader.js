import React from 'react'
import { Link } from 'react-router-dom';

function NotLoggedInHeader() {
  return (
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo or Site Name */}
            <div className="text-xl font-bold text-blue-600">
              Livre pas cher
            </div>

            {/* Navigation Buttons */}
            <div className="space-x-4">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded hover:bg-blue-50"
              >
                Se connecter
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
              >
                S'inscrire
              </Link>
            </div>
          </div>
        </div>
      </header>
  )
}

export default NotLoggedInHeader
