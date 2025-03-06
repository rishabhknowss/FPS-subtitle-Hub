"use client";
import Image from "next/image";
import {  CarouselSlider } from "./Posters";
import {motion } from "framer-motion";

export const Hero = () => {
    const logos = [
        '/poster-1.png',
        '/poster-2.png',
        '/poster-3.png',
        '/poster-4.png',
        '/poster-1.png',
        '/poster-2.png',
        '/poster-3.png',
        '/poster-4.png',
        '/poster-1.png',
        '/poster-2.png',
        '/poster-3.png',
        '/poster-4.png',
    ]
  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 ">


      
      
      
      <div className="grid gap-12 md:gap-16 text-center">
        {/* Main headline */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900">
            Transform Your Content With
            <span className="block text-blue-600">Professional Subtitles</span>
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            Reach global audiences with accurate, localized subtitles for videos, films, and multimedia content.
          </p>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
          <button className= "cursor-pointer px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow-lg transition duration-200 transform hover:-translate-y-1">
            Book a Free Consultation
          </button>
          <button className="cursor-pointer px-8 py-4 bg-white hover:bg-gray-100 text-blue-600 font-semibold rounded-full border border-gray-300 shadow-sm transition duration-200 transform hover:-translate-y-1 flex items-center justify-center">
            <span>View Our Process</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Hero image with overlay */}
       <div>
        <CarouselSlider />
       </div>


     
        
      </div>
    </div>
  );
};