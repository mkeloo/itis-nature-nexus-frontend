import React from 'react';
import HeroImage from '../assets/Hero.jpg';

const HomePage = () => {
  return (
    <div className="container mx-auto  text-black w-full h-[90vh] flex justify-center items-center">
      <div className="flex flex-wrap justify-center items-center">
        {/* Text Area */}
        <div className="w-full lg:w-[45%] px-4 lg:px-0 mb-10 lg:mb-0 flex flex-col justify-center h-full m-4">
          <div className="mx-4">
            <h1 className="text-6xl lg:text-7xl font-bold mb-4 text-[#2543a6] bg-gradient-to-r from-green-400 to-blue-500 rounded-lg">
              Welcome to Nature Nexus
            </h1>
            <div className="bg-opacity-10 p-6 bg-blue-600 rounded-xl">
              <p className="text-lg lg:text-2xl mb-8 text-indigo-900 font-bold">
                Discover the diversity of life with Nature Nexus. Explore,
                analyze, and connect with global species data at your
                fingertips.
              </p>
              <div>
                <div className="flex justify-center items-center">
                  <button className="bg-[#345ad7] text-white py-3 px-8 text-lg font-extrabold mr-4 rounded-lg hover:bg-[#192b50] transition ease-in duration-200 hover:scale-105">
                    Get Started
                  </button>
                  <button className="bg-transparent py-3 px-8 text-lg font-extrabold border border-[#2543a6] rounded-lg hover:bg-[#ebf4ff] text-[#2543a6] transition ease-in duration-200 hover:scale-105">
                    View More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Image Area */}
        <div className="w-full lg:w-[51%] lg:px-0 shadow-xl">
          <img
            src={HeroImage}
            alt="Hero"
            className="max-w-full h-auto rounded-xl shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
