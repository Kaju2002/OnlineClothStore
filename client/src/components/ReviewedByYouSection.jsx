import React, { useState } from 'react';
import { Heart } from 'lucide-react';

const ReviewedByYouSection = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const products = [
    {
      id: 1,
      name: "Long oversized T-shirt",
      price: 15.99,
      originalPrice: 29.99,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=400&fit=crop",
      badges: ["SALE", "NEW"]
    },
    {
      id: 2,
      name: "Retro style handbag",
      price: 98.99,
      originalPrice: 129.99,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=400&fit=crop",
      badges: ["SALE"]
    },
    {
      id: 3,
      name: "Spray wrap skirt",
      price: 29.99,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1583496661160-fb5886a13fe7?w=300&h=400&fit=crop",
      badges: []
    },
    {
      id: 4,
      name: "Textured turtleneck with zip",
      price: 25.99,
      originalPrice: 39.99,
      image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=300&h=400&fit=crop",
      badges: ["SALE"]
    }
  ];

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <p className="text-sm text-gray-500 tracking-wider uppercase mb-2">YOU VIEWED</p>
          <h2 
            className="mb-4"
            style={{ 
              font: '400 32px / 38px "Josefin Sans", sans-serif'
            }}
          >
            Reviewed By You
          </h2>
          <p 
            className="max-w-2xl mx-auto"
            style={{ 
              color: 'rgb(68, 68, 68)',
              font: '16px / 27px Raleway, sans-serif'
            }}
          >
            Cullum eu id enim aliquip aute ullamco anim. Culpa deserunt nostrud 
            excepteur voluptate velit ipsum esse enim.
          </p>
        </div>

        {/* Products Grid */}
        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentProducts.map((product) => (
              <div key={product.id} className="group cursor-pointer">
                <div className="relative overflow-hidden bg-gray-50 mb-4 aspect-[3/4]">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col space-y-1">
                    {product.badges.map((badge) => (
                      <span 
                        key={badge}
                        className={`text-xs px-2 py-1 rounded text-white font-medium ${
                          badge === 'SALE' ? 'bg-red-500' : 
                          badge === 'NEW' ? 'bg-green-500' : 'bg-gray-500'
                        }`}
                      >
                        {badge}
                      </span>
                    ))}
                  </div>

                  {/* Heart Icon */}
                  <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Heart className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                
                {/* Product Info */}
                <div className="text-center">
                  <h3 
                    className="mb-2"
                    style={{ 
                      color: 'rgb(68, 68, 68)',
                      font: '16px / 24px Raleway, sans-serif'
                    }}
                  >
                    {product.name}
                  </h3>
                  <div className="flex justify-center items-center space-x-2">
                    <span 
                      className="font-semibold"
                      style={{ 
                        color: 'rgb(0, 0, 0)',
                        font: '16px / 24px Raleway, sans-serif'
                      }}
                    >
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span 
                        className="line-through"
                        style={{ 
                          color: 'rgb(153, 153, 153)',
                          font: '14px / 20px Raleway, sans-serif'
                        }}
                      >
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center space-x-4 mt-8">
          {Array.from({ length: totalPages }).map((_, index) => {
            const pageNumber = index + 1;
            return (
              <button
                key={pageNumber}
                onClick={() => goToPage(pageNumber)}
                className={`h-0.5 transition-all duration-300 ${
                  currentPage === pageNumber
                    ? 'w-8 bg-black'
                    : 'w-4 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ReviewedByYouSection;