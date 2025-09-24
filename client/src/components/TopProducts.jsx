import React ,{useState,useEffect} from "react"

import ProductCard from "../ui/ProductCard"

export default function TopProducts() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [currentDesktopSlide, setCurrentDesktopSlide] = useState(0)
  
  const products = [
    {
      id: 1,
      name: "Long oversized T-shirt",
      price: 15.99,
      originalPrice: 59.99,
      image: "https://mollee-html-ten.vercel.app/assets/img/examples/product-item_8.jpg",
      badge: "SALE", 
    },
    {
      id: 2,
      name: "Retro style handbag",
      price: 98.99,
      originalPrice: 59.99,
      image: "https://mollee-html-ten.vercel.app/assets/img/examples/product-item_7.jpg",
      badge: "SALE", 
    },
    {
      id: 3,
      name: "Spray wrap skirt",
      price: 29.99,
      image: "https://mollee-html-ten.vercel.app/assets/img/examples/product-item_3.jpg",
    },
    {
      id: 4,
      name: "Textured turtleneck with zip",
      price: 25.99,
      originalPrice: 59.99,
      image: "https://mollee-html-ten.vercel.app/assets/img/examples/product-item_2.jpg",
      badge: "SALE",
    },
     {
      id: 5,
      name: "Long oversized T-shirt",
      price: 15.99,
      originalPrice: 59.99,
      image: "https://mollee-html-ten.vercel.app/assets/img/examples/product-item_8.jpg",
      badge: "SALE", 
    },
    {
      id: 6,
      name: "Retro style handbag",
      price: 98.99,
      originalPrice: 59.99,
      image: "https://mollee-html-ten.vercel.app/assets/img/examples/product-item_7.jpg",
      badge: "SALE", 
    },
    {
      id: 7,
      name: "Spray wrap skirt",
      price: 29.99,
      image: "https://mollee-html-ten.vercel.app/assets/img/examples/product-item_3.jpg",
    },
    {
      id: 8,
      name: "Textured turtleneck with zip",
      price: 25.99,
      originalPrice: 59.99,
      image: "https://mollee-html-ten.vercel.app/assets/img/examples/product-item_2.jpg",
      badge: "SALE",
    },
    {
      id: 6,
      name: "Retro style handbag",
      price: 98.99,
      originalPrice: 59.99,
      image: "https://mollee-html-ten.vercel.app/assets/img/examples/product-item_7.jpg",
      badge: "SALE", 
    },
    {
      id: 7,
      name: "Spray wrap skirt",
      price: 29.99,
      image: "https://mollee-html-ten.vercel.app/assets/img/examples/product-item_3.jpg",
    },
    {
      id: 8,
      name: "Textured turtleneck with zip",
      price: 25.99,
      originalPrice: 59.99,
      image: "https://mollee-html-ten.vercel.app/assets/img/examples/product-item_2.jpg",
      badge: "SALE",
    },

  ]

  // Group products into pairs for mobile slider
  const productPairs = []
  for (let i = 0; i < products.length; i += 2) {
    productPairs.push(products.slice(i, i + 2))
  }

  // Group products into sets of 4 for desktop slider
  const desktopProductSets = []
  for (let i = 0; i < products.length; i += 4) {
    desktopProductSets.push(products.slice(i, i + 4))
  }

  return (
    <section className="py-8 sm:py-12 lg:py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="pb-5 sm:pb-7 text-center">
          <span className="block pb-3 sm:pb-5 text-xs sm:text-sm leading-5 font-raleway text-gray-700 uppercase tracking-widest">
            <b>top</b> products
          </span>
          <h2 className="pb-3 sm:pb-5 text-2xl sm:text-3xl lg:text-4xl xl:text-[40px] xl:leading-none font-josefin font-normal capitalize">
            Best Sellers At Mollee
          </h2>
          <p className="max-w-2xl mx-auto text-sm sm:text-base leading-6 sm:leading-7 font-raleway text-gray-700 px-4">
            Cillum eu id enim aliquip aute ullamco anim. Culpa deserunt nostrud excepteur voluptate velit ipsum esse
            enim.
          </p>
        </div>

        {/* Mobile Slider - Shows 2 products per slide */}
        <div className="block lg:hidden mb-8">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {productPairs.map((pair, index) => (
                <div key={index} className="min-w-full">
                  <div className="grid grid-cols-2 gap-4 px-2">
                    {pair.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Mobile Navigation Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {productPairs.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-8 h-0.5 rounded transition-colors duration-200 cursor-pointer ${
                  index === currentSlide ? 'bg-gray-800' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Desktop Grid - Shows all products */}
        <div className="hidden lg:block">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentDesktopSlide * 100}%)` }}
            >
              {desktopProductSets.map((productSet, index) => (
                <div key={index} className="min-w-full">
                  <div className="grid grid-cols-4 gap-8 mb-12">
                    {productSet.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Desktop Navigation Dots */}
          <div className="flex justify-center gap-2">
            {desktopProductSets.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentDesktopSlide(index)}
                className={`w-8 h-0.5 rounded transition-colors duration-200 cursor-pointer ${
                  index === currentDesktopSlide ? 'bg-gray-800' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
