import React, { useState } from 'react';

function FilterButton(){
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = () => {
      setIsDrawerOpen(!isDrawerOpen);
    };

    const closeDrawer = () => {
      setIsDrawerOpen(false);
    };

    const handleFilterSearch = (e) => {

    };

    return(
      <>
        <div className="absolute p-5 grid grid-cols-12 gap-2 items-center">
          <button className="col-span-2 p-2 bg-white border border-emerald-600 rounded-lg shadow hover:bg-emerald-50" type="button" onClick={toggleDrawer}>
            <svg className="w-5 h-5 text-emerald-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7.75 4H19M7.75 4a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 4h2.25m13.5 6H19m-2.25 0a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 10h11.25m-4.5 6H19M7.75 16a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 16h2.25"/>
            </svg>
          </button>
          <input type="search" id="default-search" className="shadow col-span-8 focus:outline-none block w-full p-2 ps-2 text-sm text-emerald-600 border border-emerald-600 rounded-lg" placeholder="Rechercher..."/>
          <button onClick={handleFilterSearch} type="submit" className="col-span-2 shadow bg-emerald-600 h-full text-white rounded-lg text-sm px-2 py-2 hover:bg-emerald-700 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
          </button>
        </div>

        {/* Backdrop */}
        {isDrawerOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-30 " 
            onClick={closeDrawer}
          ></div>
        )}

        {/* Drawer */}
        <div 
          className={`fixed top-16 left-0 z-40 h-[calc(100vh-5rem)] p-4 m-2 overflow-y-auto transition-transform duration-300 bg-white w-80 rounded-lg shadow-lg ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <h5 className="inline-flex items-center mb-4 text-base font-semibold text-gray-700">
            <svg className="w-5 h-5 text-emerald-600 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7.75 4H19M7.75 4a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 4h2.25m13.5 6H19m-2.25 0a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 10h11.25m-4.5 6H19M7.75 16a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 16h2.25"/>
            </svg>
            Filtres
          </h5>
          <button 
            type="button" 
            onClick={closeDrawer}
            className="text-emerald-600 bg-transparent rounded-lg text-sm w-8 h-8 absolute top-2.5 right-2.5 flex items-center justify-center"
          >
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
          </button>
          
          {/* Drawer Content */}
          <div className="">
            <div className="max-w-md mx-auto grid grid-cols-12 gap-1">
              <input type="search" id="default-search" className="col-span-10 focus:outline-none block w-full p-2 ps-2 text-sm text-emerald-600 border border-emerald-600 rounded-lg" placeholder="Rechercher..."/>
              <button onClick={handleFilterSearch} type="submit" className="col-span-2 bg-emerald-600 text-white rounded-lg text-sm px-2 py-2 hover:bg-emerald-700 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
              </button>
            </div> 
            <p className="text-gray-600"></p>
          </div>
        </div>
      </>
    )
}

export default FilterButton