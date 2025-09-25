
import React, { useState, useEffect } from "react";
import { Heart } from "lucide-react";

const ProductCard = ({ product }) => {
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setIsFavourite(wishlist.some((p) => p._id === product._id));
  }, [product._id]);

  const handleFavourite = (e) => {
    e.stopPropagation();
    e.preventDefault();
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    if (wishlist.some((p) => p._id === product._id)) {
      wishlist = wishlist.filter((p) => p._id !== product._id);
      setIsFavourite(false);
    } else {
      wishlist.push(product);
      setIsFavourite(true);
    }
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    window.dispatchEvent(new Event("wishlistChanged"));
  };

  return (
    <div className="bg-white rounded-lg  transition-shadow duration-200 overflow-hidden w-full max-w-sm mx-auto">
      <div className="relative">
        <img
          src={
            (product.image && typeof product.image === 'object' && product.image.url)
              ? product.image.url
              : (typeof product.image === 'string' && product.image.trim() !== ''
                ? product.image
                : "/placeholder.svg")
          }
          alt={product.name}
          className="w-full h-48 sm:h-56 md:h-64 object-cover"
          onError={e => { e.target.onerror = null; e.target.src = "/placeholder.svg"; }}
        />

        {/* TOP Badge */}
        <div
          className="absolute top-2 left-2 sm:top-3 sm:left-3 px-2 py-1 text-xs font-bold rounded bg-yellow-400 text-black shadow"
        >
          TOP
        </div>
        {/* Existing Badge (if any) */}
        {product.badge && (
          <div
            className={`absolute top-10 left-2 sm:top-12 sm:left-3 px-2 py-1 text-xs font-medium rounded ${
              product.badge === "NEW" ? "bg-green-400 text-white" : "bg-red-400 text-white"
            }`}
          >
            {product.badge}
          </div>
        )}

        {/* Heart Icon */}
        <button
          className={`absolute top-2 right-2 sm:top-3 sm:right-3 p-1.5 sm:p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow ${isFavourite ? "text-red-500" : "text-gray-400"}`}
          onClick={handleFavourite}
          aria-label={isFavourite ? "Remove from favourites" : "Add to favourites"}
        >
          <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isFavourite ? "text-red-500" : "text-gray-400"}`} fill={isFavourite ? "#ef4444" : "none"} />
        </button>
      </div>

      <div className="p-3 sm:p-4">
        <h3 className="text-gray-800 font-medium mb-2 text-sm sm:text-base line-clamp-2">
          {product._id ? (
            <a
              href={`/product/${product._id}`}
              className="text-gray-900 hover:underline cursor-pointer"
              title={typeof product.name === 'string' ? product.name : undefined}
            >
              {typeof product.name === 'string' ? product.name : ''}
            </a>
          ) : (
            typeof product.name === 'string' ? product.name : ''
          )}
        </h3>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-base sm:text-lg font-semibold text-gray-900">
            {new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR' }).format(product.price)}
          </span>
          {(!product.totalQuantity || product.totalQuantity === 0) && (
            <span className="ml-2 px-2 py-0.5 text-xs font-semibold rounded bg-red-100 text-red-600 align-middle">Out of Stock</span>
          )}
          {product.originalPrice && (
            <span className="text-xs sm:text-sm text-gray-500 line-through">
              {new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR' }).format(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
