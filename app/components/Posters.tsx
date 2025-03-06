"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export const CarouselSlider = () => {
  const posters = [
    { src: "/poster-1.png", alt: "Subtitling services showcase 1" },
    { src: "/poster-2.png", alt: "Subtitling services showcase 2" },
    { src: "/poster-3.png", alt: "Subtitling services showcase 3" },
    { src: "/poster-4.png", alt: "Subtitling services showcase 4" },
    { src: "/poster-5.png", alt: "Subtitling services showcase 5" },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sliderRef = useRef(null);

  // Auto-rotate through cards
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % posters.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [posters.length, isPaused]);

  // Function to get card index accounting for wrap-around
  const getCardIndex = (index : number) => {
    // Handle wrap-around for indexes
    if (index < 0) return posters.length + index;
    if (index >= posters.length) return index - posters.length;
    return index;
  };

  // Function to calculate position and scale based on card position relative to active card
  const getCardStyles = (cardIndex : number) => {
    const diff = (cardIndex - activeIndex + posters.length) % posters.length;
    const adjustedDiff = diff > posters.length / 2 ? diff - posters.length : diff;
    
    // Different positions based on where the card is relative to active
    if (adjustedDiff === 0) { // Active card (center)
      return {
        x: 0,
        scale: 1,
        zIndex: 10,
        opacity: 1
      };
    } else if (adjustedDiff === -1 || adjustedDiff === posters.length - 1) { // Left card
      return {
        x: "-45%",
        scale: 0.85,
        zIndex: 5,
        opacity: 0.7
      };
    } else if (adjustedDiff === 1 || adjustedDiff === -(posters.length - 1)) { // Right card
      return {
        x: "45%",
        scale: 0.85,
        zIndex: 5,
        opacity: 0.7
      };
    } else if (adjustedDiff < -1) { // Far left cards
      return {
        x: "-75%",
        scale: 0.7,
        zIndex: 1,
        opacity: 0.3
      };
    } else { // Far right cards
      return {
        x: "75%",
        scale: 0.7,
        zIndex: 1,
        opacity: 0.3
      };
    }
  };

  // Handle next/prev
  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % posters.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + posters.length) % posters.length);
  };

  return (
    <div 
      className="relative mt-6 md:mt-10 h-[450px] md:h-[550px] lg:h-[650px]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      ref={sliderRef}
    >
      {/* Carousel container */}
      <div className="absolute inset-0 overflow-visible">
        <div className="relative h-full w-full flex items-center justify-center">
          {/* Generate all cards */}
          {[-2, -1, 0, 1, 2].map((offset) => {
            const cardIndex = getCardIndex(activeIndex + offset);
            const poster = posters[cardIndex];
            const { x, scale, zIndex, opacity } = getCardStyles(cardIndex);
            
            return (
              <motion.div
                key={`card-${cardIndex}`}
                className="absolute h-full w-full max-w-4xl origin-center px-4"
                initial={false}
                animate={{
                  x,
                  scale,
                  zIndex,
                  opacity
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  mass: 1
                }}
                onClick={() => {
                  if (offset !== 0) {
                    setActiveIndex(cardIndex);
                  }
                }}
                style={{ cursor: offset !== 0 ? 'pointer' : 'default' }}
              >
                <div className={`relative h-full w-full rounded-xl overflow-hidden shadow-2xl transform ${offset === 0 ? 'bg-white ring-4 ring-blue-500' : 'bg-gray-100'}`}>
                  {/* Card content with gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-10 z-10"></div>
                  <Image
                    src={poster.src}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                    alt={poster.alt}
                    className="object-cover"
                    priority={offset === 0}
                  />
                  
                  {/* Card title overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 md:p-6 text-white z-20">
                    <h3 className="text-xl font-bold">Project {cardIndex + 1}</h3>
                    <p className="text-sm text-gray-200">Professional subtitle services</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      
      {/* Navigation arrows */}
      <button 
        className="absolute cursor-pointer left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg z-30 hover:bg-white transition-colors"
        onClick={handlePrev}
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button 
        className="absolute right-4 top-1/2 cursor-pointer transform -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg z-30 hover:bg-white transition-colors"
        onClick={handleNext}
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      
      {/* Navigation indicators */}
      <div className="absolute -bottom-6 left-0 right-0 flex justify-center gap-2 z-30">
        {posters.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all ${
              index === activeIndex
                ? "bg-blue-600 w-8"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            onClick={() => setActiveIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Floating feature badge */}
      <div className="absolute -bottom-5 md:-bottom-8 right-8 md:right-16 bg-white px-6 py-4 rounded-lg shadow-xl z-30">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 bg-blue-100 p-2 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">Available in 40+ Languages</p>
            <p className="text-xs text-gray-500">Professional translations</p>
          </div>
        </div>
      </div>
    </div>
  );
};