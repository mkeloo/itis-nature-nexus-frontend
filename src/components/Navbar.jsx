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
          {/* <Link
            to="/"
            className="font-bold text-md text-white hover:text-green-400 hover:scale-110 duration-200 transition ease-in"
          >
            Home
          </Link> */}
          <Link
            to="/query-example"
            className="font-bold text-md text-white hover:text-green-400 hover:scale-110 duration-200 transition ease-in"
          >
            Ex Query 1
          </Link>
          <Link
            to="/climate-correlation"
            className="font-bold text-md text-white hover:text-green-400 hover:scale-110 duration-200 transition ease-in"
          >
            Climate & Birds
          </Link>
          <Link
            to="/biodiv-impact"
            className="font-bold text-md text-white hover:text-green-400 hover:scale-110 duration-200 transition ease-in"
          >
            Biodiversity & Climate
          </Link>
          <Link
            to="/seasonal-trends"
            className="font-bold text-md text-white hover:text-green-400 hover:scale-110 duration-200 transition ease-in"
          >
            Seasonal Trends
          </Link>
          <Link
            to="/long-term-trends"
            className="font-bold text-md text-white hover:text-green-400 hover:scale-110 duration-200 transition ease-in"
          >
            Long-Term Trends
          </Link>
          <Link
            to="/conservation-impact"
            className="font-bold text-md text-white hover:text-green-400 hover:scale-110 duration-200 transition ease-in"
          >
            Conservation
          </Link>
        </div>

        {/* home */}
        <div>
          <button className="bg-gradient-to-r from-green-200 to-green-500 text-green-900 font-bold py-1 px-4 hover:scale-110 duration-200 text-md transition ease-in border-2 border-emerald-900 rounded-lg">
            <Link to="/">Home</Link>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
