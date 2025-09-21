import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Slider } from '../ui/Slider';
import { Heart, Search, Star } from 'lucide-react';

const ProductCollection = () => {
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/categories`);
        const data = await response.json();
        
        if (data.success && data.data) {
          setCategories(data.data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        setCategories([]);
      }
    };

    fetchCategories();
  }, []);

  // Fetch products from API with category filter
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        // Build URL with category filter if selected
        let url = `${import.meta.env.VITE_API_BASE_URL}/api/products`;
        if (selectedCategory) {
          url += `?category=${selectedCategory}`;
        }
        
        const response = await fetch(url);
        const data = await response.json();
        
        // Handle API response structure
        if (data.success && data.data && data.data.products) {
          setProducts(data.data.products);
        } else {
          console.error('Unexpected API response structure:', data);
          setProducts([]);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  // Handle category selection
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div className="container mx-auto px-4 max-w-6xl py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Search */}
          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input 
                type="text" 
                placeholder="Type for Expression or this categories"
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-none text-sm"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="mb-8">
            <h3 className="font-semibold text-lg mb-4 border-b-2 border-primary inline-block pb-1">Categories</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="category"
                    value=""
                    checked={selectedCategory === ''}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="rounded" 
                  />
                  <span className="text-sm">All</span>
                </label>
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">HOT</span>
              </div>
              {categories.length > 0 ? categories.map((category) => (
                <label key={category._id} className="flex items-center space-x-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="category"
                    value={category._id}
                    checked={selectedCategory === category._id}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="rounded" 
                  />
                  <span className="text-sm">{category.name}</span>
                </label>
              )) : (
                // Fallback static categories while loading
                ['Women', 'Men', 'Kids', 'New Arrivals'].map((category) => (
                  <label key={category} className="flex items-center space-x-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="category"
                      value={category.toLowerCase()}
                      checked={selectedCategory === category.toLowerCase()}
                      onChange={(e) => handleCategoryChange(e.target.value)}
                      className="rounded" 
                    />
                    <span className="text-sm">{category}</span>
                  </label>
                ))
              )}
            </div>
          </div>

          {/* Price Filter */}
          <div className="mb-8">
            <h3 className="font-semibold text-lg mb-4 border-b-2 border-primary inline-block pb-1">Price</h3>
            <div className="space-y-4">
              <Slider
                value={priceRange}
                onChange={setPriceRange}
                max={200}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </div>

          {/* Colors */}
          <div className="mb-8">
            <h3 className="font-semibold text-lg mb-4 border-b-2 border-primary inline-block pb-1">Colors</h3>
            <div className="space-y-2">
              {[
                { name: 'All', color: 'bg-white border-2 border-gray-300' },
                { name: 'Red', color: 'bg-red-500' },
                { name: 'Blue', color: 'bg-blue-500' },
                { name: 'Green', color: 'bg-green-500' },
                { name: 'Yellow', color: 'bg-yellow-500' },
                { name: 'Orange', color: 'bg-orange-500' },
                { name: 'Purple', color: 'bg-purple-500' }
              ].map((color) => (
                <label key={color.name} className="flex items-center space-x-3 cursor-pointer">
                  <input type="checkbox" className="rounded" />
                  <div className={`w-4 h-4 rounded-full ${color.color}`}></div>
                  <span className="text-sm">{color.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Apply Filter Button */}
          <Button className="w-full bg-black text-white hover:bg-gray-800 rounded-none">
            Apply Filter
          </Button>

          {/* Reviewed By You Section */}
          <div className="mt-8">
            <h3 className="font-semibold text-lg mb-4 border-b-2 border-primary inline-block pb-1">
              Reviewed By You
            </h3>
            
            <div className="space-y-3">
              {[
                { 
                  id: 1, 
                  name: "Casual pullover", 
                  price: 45.99, 
                  image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=80&h=80&fit=crop",
                  rating: 4
                },
                { 
                  id: 2, 
                  name: "Denim overshirt", 
                  price: 89.99, 
                  image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=80&h=80&fit=crop",
                  rating: 5
                },
                { 
                  id: 3, 
                  name: "Oxford pullover", 
                  price: 34.99, 
                  image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=80&h=80&fit=crop",
                  rating: 4
                }
              ].map((product) => (
                <div key={product.id} className="flex items-center space-x-3 p-3 bg-white rounded border border-gray-100  transition-shadow cursor-pointer">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-xs text-gray-800 mb-1 truncate">{product.name}</h4>
                    
                    {/* Rating */}
                    <div className="flex items-center space-x-1 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`text-xs ${i < product.rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                          ★
                        </span>
                      ))}
                    </div>
                    
                    <span className="font-semibold text-xs text-black">${product.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Season Sale Banner */}
          <div className="mt-8">
            <div 
              className="relative h-32 bg-cover bg-center rounded overflow-hidden"
              style={{
                backgroundImage: "url('https://mollee-html-ten.vercel.app/assets/img/sale-image_1.jpg')"
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="text-center text-white px-2">
                  <h3 className="text-lg font-bold mb-1">SEASON</h3>
                  <h2 className="text-xl font-bold mb-2">SALE</h2>
                  <button className="bg-white text-black px-3 py-1 text-xs font-semibold hover:bg-gray-100 transition-colors">
                    SHOP NOW
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="lg:col-span-3">
          {/* Sort and View Options */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">Sort by</span>
              <select className="border border-gray-200 px-3 py-1 text-sm rounded-none">
                <option>Relevance</option>
                <option>Price Low to High</option>
                <option>Price High to Low</option>
                <option>Newest First</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              // Loading skeleton
              Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="group cursor-pointer animate-pulse">
                  <div className="relative overflow-hidden bg-gray-200 mb-3 h-64"></div>
                  <div className="text-center">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
                  </div>
                </div>
              ))
            ) : products && products.length > 0 ? (
              products.map((product) => {
                // Get first variant for pricing
                const firstVariant = product.variants?.[0];
                const regularPrice = firstVariant?.price?.regular;
                const salePrice = firstVariant?.price?.sale;
                const hasDiscount = salePrice && salePrice < regularPrice;
                
                // Get main image
                const mainImage = product.images?.find(img => img.isMain)?.url || 
                                product.images?.[0]?.url || 
                                'https://via.placeholder.com/300x300';
                
                return (
                  <div key={product._id} className="group cursor-pointer">
                    <div className="relative overflow-hidden bg-gray-50 mb-3">
                      <img 
                        src={mainImage} 
                        alt={product.name}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {hasDiscount && (
                        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                          SALE
                        </span>
                      )}
                      {product.isFeatured && (
                        <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                          FEATURED
                        </span>
                      )}
                      <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
                        <Heart className="w-4 h-4" />
                      </button>
                      
                      {/* Quick view buttons */}
                      <div className="absolute bottom-2 left-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <a href={`/product/${product._id}`}>
                          <Button size="sm" className="flex-1 bg-white text-black hover:bg-gray-100 rounded-none text-xs">
                            Quick View
                          </Button>
                        </a>
                        <Button size="sm" className="flex-1 bg-black text-white hover:bg-gray-800 rounded-none text-xs">
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <h3 className="font-medium text-sm mb-1 text-gray-800">{product.name}</h3>
                      <div className="flex justify-center items-center space-x-2">
                        {hasDiscount ? (
                          <>
                            <span className="font-semibold text-black">${(salePrice / 100).toFixed(2)}</span>
                            <span className="text-sm text-gray-500 line-through">${(regularPrice / 100).toFixed(2)}</span>
                          </>
                        ) : (
                          <span className="font-semibold text-black">${(regularPrice / 100).toFixed(2)}</span>
                        )}
                      </div>
                      {product.averageRating && (
                        <div className="flex justify-center items-center mt-1">
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className={`text-xs ${i < Math.floor(product.averageRating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                                ★
                              </span>
                            ))}
                            <span className="text-xs text-gray-500 ml-1">({product.reviewCount})</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-3 text-center py-8">
                <p className="text-gray-500">No products found</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center space-x-2 mt-8">
            <Button variant="outline" size="sm" className="rounded-none">←</Button>
            <Button variant="outline" size="sm" className="rounded-none bg-black text-white">1</Button>
            <Button variant="outline" size="sm" className="rounded-none">2</Button>
            <Button variant="outline" size="sm" className="rounded-none">3</Button>
            <Button variant="outline" size="sm" className="rounded-none">→</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCollection;