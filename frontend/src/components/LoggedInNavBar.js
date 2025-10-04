import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function LoggedInNavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // afficher menu burger
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // déconnecter le user
    const handleLogout = async (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('authToken');
        window.location.href = '/login';
    }


    return (
        <nav className="sticky top-0 z-50 bg-white shadow-md">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
            {/* Logo or Site Name */}
                <div className="text-xl font-bold text-emerald-600">
                    Livre pas cher
                </div>
                <button 
                    onClick={toggleMenu}
                    type="button" 
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-emerald-600 rounded-lg md:hidden border border-transparent hover:bg-emerald-50" 
                    aria-controls="navbar-default" 
                    aria-expanded={isMenuOpen}
                >
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </button>
                {/* Desktop Navigation */}
                <div className='hidden md:block' id="navbar-default">
                    <div className="space-x-4" >
                        <Link
                            to="/publications"
                            className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded hover:bg-emerald-700"
                        >
                            Publier un livre
                        </Link>
                        <Link
                            to="/compte"
                            className="px-4 py-2 text-sm font-medium text-emerald-600 border border-emerald-600 rounded hover:bg-emerald-50"
                        >
                            Mon compte
                        </Link>
                        <Link className="px-4 py-2 text-sm font-medium text-emerald-600 border border-emerald-600 rounded hover:bg-emerald-50"
                            onClick={handleLogout}
                        >
                            Se déconnecter
                        </Link>
                    </div>
                </div>
            </div>
            
            {/* Mobile Navigation */}
            <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
                <Link
                    to="/publications"
                    className="block px-3 py-2 text-sm font-medium text-emerald-600 hover:bg-emerald-50 rounded"
                    onClick={() => setIsMenuOpen(false)}
                >
                Publier un livre
                </Link>
                <Link
                    to="/compte"
                    className="block px-3 py-2 text-sm font-medium text-emerald-600 hover:bg-emerald-50 rounded"
                    onClick={() => setIsMenuOpen(false)}
                >
                Mon compte
                </Link>
                <Link className="block px-3 py-2 text-sm font-medium text-emerald-600 hover:bg-emerald-50 rounded"
                    onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                    }}
                >
                    Se déconnecter
                </Link>
            </div>
            </div>
        </div>
        </nav>
    )
}

export default LoggedInNavBar
