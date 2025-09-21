import React from 'react';

const ProductHeader = () => {
  return (
    <div className="bg-background">
      {/* Breadcrumb */}
      <nav className="container mx-auto px-4 py-4 max-w-6xl">
        <div className="flex items-center space-x-2 text-sm">
          <a href="/" className="text-muted-foreground hover:text-foreground">Home</a>
          <span className="text-muted-foreground">/</span>
          <span className="text-foreground font-medium">Shop</span>
        </div>
      </nav>

      {/* Banner Section */}
      <div className="relative bg-gray-100 min-h-[300px] flex items-center">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div>
              <h1 className="text-[48px] font-bold text-foreground leading-tight mb-4">Shop</h1>
              <div className="w-16 h-1 bg-primary mb-6"></div>
            </div>
            
            {/* Right Image */}
            <div className="flex justify-end">
              <div className="relative">
                <img 
                  src="https://mollee-html-ten.vercel.app/assets/img/banner-shop.jpg"
                  alt="Fashion Model" 
                  className="w-full max-w-[700px] h-[300px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductHeader;