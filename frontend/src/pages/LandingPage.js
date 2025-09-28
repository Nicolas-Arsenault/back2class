import React, {useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import NotLoggedInHeader from '../components/NotLoggedInHeader';

  const reviews = [
    {
      name: "Nicolas Arsenault",
      review: "Questions were very similar to the real UCAT.",
      rating: 4
    },
    {name: "Leo Gaudreault", review: "Easy to use and free.", rating: 4},
    {name: "Justin Theriault", review: "Cool features, could have more tests though.", rating: 3},
    {name: "Mark Thibeault", review: "They provide strategies, which is pretty cool.", rating: 5},
    {name: "Carl Picard", review: "Best free app to practice.", rating: 5}
  ];

const LandingPage = () => {

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev)=>(prev + 1) % reviews.length);
    },4000);
    return () => clearInterval(interval);
  },[]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <NotLoggedInHeader />

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center text-center px-4 py-20">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6">
          Welcome to UCAT-Prep
        </h1>
        <p className="text-lg text-gray-600 max-w-xl mb-10">
          Your journey to acing the UCAT starts here. Join us to access top-notch resources, practice tests, and expert tips to help you succeed.
        </p>
        <div className="space-x-4">
          <Link
            to="/register"
            className="px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 text-lg"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="px-6 py-3 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 text-lg"
          >
            Login
          </Link>
        </div>
      </main>
      <section className='bg-white py-16 px-4'>
        <div className='max-w-3xl mx-auto text-center'>
          <h2 className='text-2xl sm:text-3xl font-semibold text-gray-800 mb-6'>What Our Users Say</h2>
          <div className='relative h-40'>
            {reviews.map((review, index) => (
              <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}>
                <div className='bg-gray-100 p-6 rounded-lg shadow-md h-full flex flex-col justify-center'>
                  <p className='text-gray-700 italic mb-4'>" {review.review} "</p>
                  <div className='text-yellow-500 mb-2'>
                    {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                  </div>
                  <p className='text-gray-900 font-semibold'>- {review.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
