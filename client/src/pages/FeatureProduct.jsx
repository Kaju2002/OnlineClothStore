import React from "react";
import ProductCard from "../ui/ProductCard";
import { useState } from "react";
import { Button } from "../ui/button";
const FeatureProduct = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const categories = ["All", "Men", "Women", "Accessories", "New Arrivals"];

  const products = [
    {
      id: 1,
      name: "Cotton T-shirt",
      price: "35.99",
      image:
        "https://mollee-html-ten.vercel.app/assets/img/examples/product-item_5.jpg",
      badge: "NEW",
    },
    {
      id: 2,
      name: "Textured turtleneck with zip",
      price: "25.99",
      originalPrice: "59.99",
      image:
        "https://mollee-html-ten.vercel.app/assets/img/examples/product-item_6.jpg",
      badge: "SALE",
    },
    {
      id: 3,
      name: "Spray wrap skirt",
      price: "29.99",
      image:
        "https://mollee-html-ten.vercel.app/assets/img/examples/product-item_7.jpg",
    },
    {
      id: 4,
      name: "Cotton T-shirt",
      price: "63.99",
      image:
        "https://mollee-html-ten.vercel.app/assets/img/examples/product-item_8.jpg",
    },
    {
      id: 5,
      name: "Cotton T-shirt",
      price: "35.99",
      image:
        "https://mollee-html-ten.vercel.app/assets/img/examples/product-item_5.jpg",
      badge: "NEW",
    },
    {
      id: 6,
      name: "Textured turtleneck with zip",
      price: "25.99",
      originalPrice: "59.99",
      image:
        "https://mollee-html-ten.vercel.app/assets/img/examples/product-item_6.jpg",
      badge: "SALE",
    },
    {
      id: 7,
      name: "Spray wrap skirt",
      price: "29.99",
      image:
        "https://mollee-html-ten.vercel.app/assets/img/examples/product-item_7.jpg",
    },
    {
      id: 8,
      name: "Cotton T-shirt",
      price: "63.99",
      image:
        "https://mollee-html-ten.vercel.app/assets/img/examples/product-item_8.jpg",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      <div className="text-center mb-6 sm:mb-8 lg:mb-12">
        <p className="uppercase mb-2 sm:mb-3 font-raleway tracking-[0.2em] text-xs sm:text-sm text-[#444444]">
          <span className="font-semibold">NEW </span>COLLECTIONS
        </p>
        <h2 className="mb-4 sm:mb-6 font-josefin-sans text-3xl sm:text-4xl md:text-5xl lg:text-[40px] lg:leading-[1] font-normal capitalize text-gray-900 leading-tight pb-3 sm:pb-5">
          Featured Products
        </h2>
      </div>

      <div className="flex justify-center mb-8 sm:mb-12 lg:mb-16">
        <nav className="flex flex-wrap justify-center gap-1 sm:space-x-1 bg-gray-100 rounded-full p-1 max-w-full overflow-x-auto">
          {categories.map((category, index) => (
            <button
              key={category}
              onClick={() => setActiveCategory(index)}
              className={`px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-medium rounded-full transition-all duration-300 whitespace-nowrap ${
                index === activeCategory
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
              }`}
            >
              {category}
            </button>
          ))}
        </nav>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {products.map((product, index) => (
          <div
            key={product.id}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8 sm:mt-10 lg:mt-12">
        <Button
          className="bg-black text-white px-8 sm:px-10 lg:px-12 py-3 sm:py-4 text-xs sm:text-sm font-medium tracking-[0.15em] uppercase hover:bg-gray-800 transition-colors duration-300 shadow-lg hover:shadow-xl border-2 border-black hover:border-gray-800 rounded-none relative overflow-hidden group w-full sm:w-auto max-w-xs"
          size="md"
        >
          <span className="relative z-10">See All Products</span>
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </Button>
      </div>
    </div>
  );
};

export default FeatureProduct;
