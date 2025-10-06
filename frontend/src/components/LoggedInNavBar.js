import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom';

function LoggedInNavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsProfileDropdownOpen(false);
            }
        };

        if (isProfileDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isProfileDropdownOpen]);

    // afficher menu burger
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // afficher le bouton Accueil (retour au dashboard) si le user n'est pas sur la page dashboard
    const ifPageIsNotDashboardMenuBurger = () => {
        if (window.location.pathname !== '/dashboard'){
            return (
                <Link
                    to="/dashboard"
                    className="block px-3 py-2 text-sm font-medium text-emerald-600 hover:bg-emerald-50 rounded"
                    onClick={() => setIsMenuOpen(false)}
                >
                    Accueil
                </Link>
            );
        }
        return null;
    }

    const ifPageIsNotDashboard = () => {
        if(window.location.pathname !== '/dashboard') {
            return (
                <Link
                    to="/dashboard"
                    className="px-4 py-2 text-sm font-medium text-emerald-600 border border-emerald-600 rounded hover:bg-emerald-50"
                >
                    Accueil
                </Link>
            );
        }
    }

    // déconnecter le user
    const handleLogout = async (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('authToken');
        window.location.href = '/login';
    }

    return (
        <nav className="sticky top-0 z-50 bg-white shadow-md rounded">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                {/* Logo or Site Name */}
                    <div className="text-xl font-bold text-emerald-600">
                        Livre pas cher
                    </div>
                    <button 
                        onClick={toggleMenu}
                        type="button" 
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-emerald-600 rounded-lg md:hidden border border-transparent transition hover:bg-emerald-50" 
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
                        <div className="flex items-center space-x-4" >
                            <Link
                                to="/publications"
                                className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded hover:bg-emerald-700"
                            >
                                Publier un livre
                            </Link>
                            <Link
                                to="/messages"
                                className="px-4 py-2 text-sm font-medium text-emerald-600 border border-emerald-600 rounded hover:bg-emerald-50"
                            >
                                Messages
                            </Link>
                            {/* Valider si d'est pas le dashboard, donc ajouter un bouton retour menu */}
                            {ifPageIsNotDashboard()}
                            
                            <div className="relative" ref={dropdownRef}>
                                <button 
                                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                                    className="relative flex rounded-full focus:outline-none p-1 border border-emerald-600 hover:bg-emerald-50"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-8 h-8 ">
                                        <circle cx="16" cy="16" r="16" fill="transparent"/>
                                        <path d="M12.73 13.1a3.271 3.271 0 1 1 3.27 3.2 3.237 3.237 0 0 1-3.27-3.2zm-2.73 9.069h1.088a4.91 4.91 0 0 1 9.818 0h1.094a5.884 5.884 0 0 0-3.738-5.434 4.238 4.238 0 0 0 2.1-3.635 4.366 4.366 0 0 0-8.73 0 4.238 4.238 0 0 0 2.1 3.635 5.878 5.878 0 0 0-3.732 5.434z" fill="#059669"/>
                                        <path fill="none" d="M0 0h32v32h-32z"/>
                                    </svg>
                                </button>
                                {isProfileDropdownOpen && (
                                    <div className="absolute border-1 right-0 z-10 mt-5 w-48 origin-top-right rounded-md bg-white  shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <Link 
                                            to="/compte" 
                                            className="block m-2 text-center px-3 py-2 text-sm font-medium text-emerald-600 hover:bg-emerald-50 rounded"
                                            onClick={() => setIsProfileDropdownOpen(false)}
                                        >
                                            Mon compte
                                        </Link>
                                        <Link
                                            onClick={() => {
                                                handleLogout();
                                                setIsProfileDropdownOpen(false);
                                            }}
                                            className="block m-2 text-center px-3 py-2 text-sm font-medium text-emerald-600 hover:bg-emerald-50 rounded"
                                        >
                                            Se déconnecter
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Mobile Navigation */}
                <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                    isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                    <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
                        {ifPageIsNotDashboardMenuBurger()}

                        <Link
                            to="/publications"
                            className="block px-3 py-2 text-sm font-medium text-emerald-600 hover:bg-emerald-50 rounded"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Publier un livre
                        </Link>
                        <Link
                            to="/messages"
                            className="block px-3 py-2 text-sm font-medium text-emerald-600 hover:bg-emerald-50 rounded"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Messages
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
