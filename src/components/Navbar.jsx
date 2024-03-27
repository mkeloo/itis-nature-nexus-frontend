import React from 'react';
import logo from '../assets/Nature-Nexus-logo.png';

const Navbar = () => {
  return (
    <nav className="bg-indigo-950 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-10 mr-2" />
          <span>Nature Nexus</span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-4">
          <a href="#" className="hover:text-gray-300">
            Home
          </a>
          <a href="#" className="hover:text-gray-300">
            Link 1
          </a>
          <a href="#" className="hover:text-gray-300">
            Link 2
          </a>
          <a href="#" className="hover:text-gray-300">
            Link 3
          </a>
          <a href="#" className="hover:text-gray-300">
            Link 4
          </a>
        </div>

        {/* Sign Up / Sign In Button */}
        <div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Sign Up / Sign In
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
