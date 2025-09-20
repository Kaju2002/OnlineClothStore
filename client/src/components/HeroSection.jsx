import React, { useState } from "react";
import { Button } from "@/ui/button";

export default function HeroSection() {
  // State for managing current image index
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Array of images for the carousel
  const images = [
    {
      src: "/hero.png",
      alt: "Fashion model wearing white knit sweater",
    },
    {
      src: "https://mollee-html-ten.vercel.app/assets/img/first-screen-image.jpg",
      alt: "Fashion model in summer collection",
    },
    {
      src: "https://mollee-html-ten.vercel.app/assets/img/slider-banner.jpg",
      alt: "Fashion model in autumn collection",
    },
  ];

  // Function to handle navigation line clicks
  const handleImageChange = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-150 overflow-hidden">
      {/* Social Media Icons - Left Side */}
      <div className="absolute left-4 sm:left-6 lg:left-8 top-1/2 transform -translate-y-1/2 z-20 hidden lg:block">
        <div className="flex flex-col items-center space-y-6 lg:space-y-8">
          <div className="transform -rotate-90 origin-center">
            <span className="text-xs font-medium text-gray-600 tracking-[0.15em] hover:text-black transition-colors cursor-pointer">
              FB
            </span>
          </div>
          <div className="w-px h-8 bg-gray-300"></div>
          <div className="transform -rotate-90 origin-center">
            <span className="text-xs font-medium text-gray-600 tracking-[0.15em] hover:text-black transition-colors cursor-pointer">
              TW
            </span>
          </div>
          <div className="w-px h-8 bg-gray-300"></div>
          <div className="transform -rotate-90 origin-center">
            <span className="text-xs font-medium text-gray-600 tracking-[0.15em] hover:text-black transition-colors cursor-pointer">
              INS
            </span>
          </div>
          <div className="w-px h-8 bg-gray-300"></div>
          <div className="transform -rotate-90 origin-center">
            <span className="text-xs font-medium text-gray-600 tracking-[0.15em] hover:text-black transition-colors cursor-pointer">
              PT
            </span>
          </div>
        </div>
      </div>

      <div className="flex h-screen flex-col lg:flex-row">
        {/* Left Side - Image */}
        <div className="flex-1 relative overflow-hidden lg:flex-1 group">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/3 z-10"></div>
          <img
            src={images[currentImageIndex].src}
            alt={images[currentImageIndex].alt}
            className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-all duration-700 ease-out"
            key={currentImageIndex} // Force re-render for smooth transitions
          />
          {/* Image overlay for better text contrast */}
          <div className="absolute inset-0 bg-black/5 z-5"></div>
        </div>

        {/* Right Side - Content */}
        <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 via-gray-100 to-gray-150 relative lg:flex-1 py-12 lg:py-0">
          <div className="max-w-lg text-center space-y-8 px-4 sm:px-6 lg:px-8">
            <div className="space-y-4">
              <p className="text-xs tracking-[0.2em] text-gray-600 uppercase font-medium">
                NEW COLLECTION
              </p>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent mx-auto"></div>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-black leading-[0.9] tracking-tight">
              Meet New
              <br />
              <span className="inline-block">Fashion Week</span>
            </h1>

            <div className="pt-6">
              <Button
                className="bg-black text-white px-12 py-4 text-sm font-medium tracking-[0.15em] uppercase hover:bg-gray-800 transition-colors duration-300 shadow-lg hover:shadow-xl border-2 border-black hover:border-gray-800 rounded-none relative overflow-hidden group"
                size="lg"
              >
                <span className="relative z-10">Shop Now</span>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Page Indicator */}
      <div className="absolute bottom-6 lg:bottom-8 left-4 sm:left-6 lg:left-8 z-20">
        <div className="flex items-baseline space-x-1">
          <span className="text-4xl lg:text-5xl font-black text-black transition-all duration-300">
            {currentImageIndex + 1}
          </span>
          <span className="text-xl text-gray-500 font-light">
            /{images.length}
          </span>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-6 lg:bottom-8 right-4 sm:right-6 lg:right-8 z-20 hidden md:block">
        <div className="flex items-center space-x-3">
          <div className="transform rotate-90 origin-center whitespace-nowrap">
            <span className="text-xs text-gray-600 font-medium tracking-[0.15em]">
              Scroll Down
            </span>
          </div>
          <div className="w-px h-16 bg-gray-400"></div>
          <div className="w-4 h-4 border-r border-b border-gray-400 transform rotate-45"></div>
        </div>
      </div>

      {/* Navigation Lines - Right Side */}
      <div className="absolute right-4 sm:right-6 lg:right-8 top-1/2 transform -translate-y-1/2 z-20 hidden md:block">
        <div className="flex flex-col space-y-6">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => handleImageChange(index)}
              className={`transition-all duration-300 hover:scale-110 cursor-pointer ${
                index === currentImageIndex
                  ? "w-12 lg:w-16 h-0.5 bg-black"
                  : "w-10 lg:w-12 h-0.5 bg-gray-300 hover:bg-gray-500"
              }`}
              aria-label={`View image ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-6 lg:top-8 right-4 sm:right-6 lg:right-8 z-10 hidden xl:block">
        <div className="w-20 h-20 border border-gray-200 rounded-full opacity-30"></div>
      </div>

      <div className="absolute bottom-1/4 left-1/4 z-10 hidden xl:block">
        <div className="w-2 h-2 bg-gray-300 rounded-full opacity-50"></div>
      </div>
    </section>
  );
}
