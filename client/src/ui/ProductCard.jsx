import React from "react"
import { Heart } from "lucide-react"

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg  transition-shadow duration-200 overflow-hidden w-full max-w-sm mx-auto">
      <div className="relative">
        <img 
          src={product.image || "/placeholder.svg"} 
          alt={product.name} 
          className="w-full h-48 sm:h-56 md:h-64 object-cover" 
        />

        {/* Badge */}
        {product.badge && (
          <div
            className={`absolute top-2 left-2 sm:top-3 sm:left-3 px-2 py-1 text-xs font-medium rounded ${
              product.badge === "NEW" ? "bg-green-400 text-white" : "bg-red-400 text-white"
            }`}
          >
            {product.badge}
          </div>
        )}

        {/* Heart Icon */}
        <button className="absolute top-2 right-2 sm:top-3 sm:right-3 p-1.5 sm:p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow">
          <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 hover:text-red-500 transition-colors" />
        </button>
      </div>

      <div className="p-3 sm:p-4">
        <h3 className="text-gray-800 font-medium mb-2 text-sm sm:text-base line-clamp-2">{product.name}</h3>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-base sm:text-lg font-semibold text-gray-900">${product.price}</span>
          {product.originalPrice && (
            <span className="text-xs sm:text-sm text-gray-500 line-through">${product.originalPrice}</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductCard
