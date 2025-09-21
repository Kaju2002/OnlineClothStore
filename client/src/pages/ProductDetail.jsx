import React, { useState } from 'react';
import { Heart, Star, Plus, Minus } from 'lucide-react';
import { Button } from '../ui/button';
import ProductReviews from '../components/ProductReviews';
import ProductHeader from '../components/ProductHeader';
import ReviewedByYouSection from '../components/ReviewedByYouSection';

const ProductDetail = () => {
  const [selectedColor, setSelectedColor] = useState('S');
  const [selectedSize, setSelectedSize] = useState('S');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  const product = {
    id: 1,
    name: "Knitted Sweater",
    price: 35.99,
    originalPrice: 42.99,
    rating: 4,
    reviewCount: 23,
    description: "Stylish shirt from the Fishbone collection. Modal made from high-quality fabric, pleasant to the touch.",
    details: "Available in different colors",
    status: "In Stock",
    sku: "#SKU90480",
    images: [
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&h=600&fit=crop"
    ],
    colors: ['S', 'M', 'L', 'XL'],
    sizes: ['S', 'M', 'L', 'XL']
  };

  const handleQuantityChange = (change) => {
    setQuantity(Math.max(1, quantity + change));
  };

  const renderStars = (rating, interactive = false, onStarClick = null) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 cursor-pointer ${
          i < rating 
            ? 'fill-yellow-400 text-yellow-400' 
            : 'text-gray-300'
        }`}
        onClick={() => interactive && onStarClick && onStarClick(i + 1)}
      />
    ));
  };

  return (
    <div>
      <ProductHeader />
      <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg"
            />
            <span className="absolute top-4 left-4 bg-red-500 text-white text-xs px-2 py-1 rounded">
              SALE
            </span>
            <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100">
              <Heart className="w-5 h-5" />
            </button>
          </div>
          <div className="flex space-x-2">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.name} ${index + 1}`}
                className="w-20 h-20 object-cover rounded cursor-pointer border-2 border-transparent hover:border-gray-300"
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 
              className="capitalize pb-5 text-gray-900" 
              style={{ 
                font: '400 40px / 1 "Josefin Sans", sans-serif' 
              }}
            >
              {product.name}
            </h1>
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center">
                {renderStars(product.rating)}
              </div>
              <span className="text-sm text-gray-500">({product.reviewCount})</span>
            </div>
          </div>

          <p 
            className="relative"
            style={{ 
              color: 'rgb(68, 68, 68)',
              font: '16px / 27px Raleway, sans-serif',
              background: 'rgb(255, 255, 255)'
            }}
          >
            {product.description}
          </p>

          <div className="space-y-2">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Status:</span>
              <span className="text-sm font-medium text-green-600">{product.status}</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">SKU:</span>
              <span className="text-sm text-gray-800">{product.sku}</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-3xl font-bold text-gray-900">${product.price}</span>
            <span className="text-lg text-gray-500 line-through">${product.originalPrice}</span>
          </div>

          {/* Size Selection */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Size</h3>
            <div className="flex space-x-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-10 h-10 rounded border text-sm font-medium ${
                    selectedSize === size
                      ? 'border-black bg-black text-white'
                      : 'border-gray-300 text-gray-700 hover:border-gray-400'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Color</h3>
            <div className="flex space-x-2">
              {['black', 'gray', 'white'].map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full border-2 ${
                    color === 'black' ? 'bg-black' :
                    color === 'gray' ? 'bg-gray-400' : 'bg-white border-gray-300'
                  } ${
                    selectedColor === color ? 'ring-2 ring-offset-2 ring-gray-500' : ''
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center border border-gray-300 rounded">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="p-2 hover:bg-gray-100"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-4 py-2 font-medium">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(1)}
                className="p-2 hover:bg-gray-100"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <Button className="flex-1 bg-black text-white hover:bg-gray-800 py-3">
              Add To Cart
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="border-t pt-8">
        <div className="flex space-x-8 mb-6">
          <button
            onClick={() => setActiveTab('description')}
            className={`pb-4 font-medium ${
              activeTab === 'description'
                ? 'border-b-2 border-black text-black'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-4 font-medium ${
              activeTab === 'reviews'
                ? 'border-b-2 border-black text-black'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Reviews
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'description' && (
          <div className="py-6">
            <p 
              className="relative"
              style={{ 
                color: 'rgb(68, 68, 68)',
                font: '16px / 27px Raleway, sans-serif',
                background: 'rgb(255, 255, 255)'
              }}
            >
              {product.description} Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad 
              minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea 
              commodo consequat.
            </p>
          </div>
        )}

        {activeTab === 'reviews' && (
          <ProductReviews productId={product.id} />
        )}
      </div>
      </div>
      
      {/* Reviewed By You Section */}
      <ReviewedByYouSection />
    </div>
  );
};

export default ProductDetail;