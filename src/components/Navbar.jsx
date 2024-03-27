import React from 'react';
import logo from '../assets/Nature-Nexus-logo.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-indigo-950 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-12 mr-2" />
          {/* <span>Nature Nexus</span> */}
          <div className="">
            <span className="block font-bold text-2xl leading-none bg-gradient-to-r from-green-200 to-green-500 text-transparent bg-clip-text hover:cursor-pointer">
              Nature
            </span>
            <span className="block font-bold text-2xl leading-none bg-gradient-to-r from-green-200 to-green-500 text-transparent bg-clip-text hover:cursor-pointer">
              Nexus
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-4">
          <Link
            to="/"
            className="font-bold text-lg text-white hover:text-green-400 hover:scale-110 duration-200 transition ease-in"
          >
            Home
          </Link>
          <Link
            to="/query1"
            className="font-bold text-lg text-white hover:text-green-400 hover:scale-110 duration-200 transition ease-in"
          >
            Query 1
          </Link>
          <Link
            to="/query2"
            className="font-bold text-lg text-white hover:text-green-400 hover:scale-110 duration-200 transition ease-in"
          >
            Query 2
          </Link>
          <Link
            to="/query3"
            className="font-bold text-lg text-white hover:text-green-400 hover:scale-110 duration-200 transition ease-in"
          >
            Query 3
          </Link>
          <Link
            to="/query4"
            className="font-bold text-lg text-white hover:text-green-400 hover:scale-110 duration-200 transition ease-in"
          >
            Query 4
          </Link>
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
