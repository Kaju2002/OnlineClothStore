
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import './wishlist.css';
import { toast } from 'react-toastify';
// Helper: get first variant (if any)
function getFirstVariant(product) {
  if (product.variants && product.variants.length > 0) {
    return product.variants[0];
  }
  // fallback: treat product as single-variant
  return {
    sku: product.sku || '',
    size: product.size || '',
    color: product.color || { name: '', hex: '' },
    stockQuantity: product.totalQuantity || 0
  };
}

// Helper: check if already in cart (API call)
async function checkIfAlreadyInCart(productId, variantSku) {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) return false;
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/cart`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const result = await response.json();
    if (result.success && result.data.cart.items) {
      return result.data.cart.items.some(item => item.productId === productId && item.variant.sku === variantSku);
    }
    return false;
  } catch {
    return false;
  }
}


// Add to cart handler (with navigation)
function useAddToCartWithNav() {
  const navigate = useNavigate();
  return async function handleAddToCart(product) {
    const token = localStorage.getItem('authToken');
    if (!token) {
      toast.error('Please login to add items to cart');
      return;
    }
    const firstVariant = getFirstVariant(product);
    if (!firstVariant || firstVariant.stockQuantity <= 0) {
      toast.error('This product is out of stock');
      return;
    }
    const alreadyInCart = await checkIfAlreadyInCart(product._id, firstVariant.sku);
    if (alreadyInCart) {
      toast.warning(`${product.name} is already in your cart!`);
      navigate('/cart');
      return;
    }
    const cartData = {
      productId: product._id,
      variant: {
        sku: firstVariant.sku,
        size: firstVariant.size,
        color: firstVariant.color
      },
      quantity: 1
    };
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/cart/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(cartData)
      });
      const result = await response.json();
      if (response.ok && result.success) {
        toast.success(`Added ${product.name} to cart!`);
        navigate('/cart');
      } else {
        toast.error('Failed to add item to cart: ' + (result.message || 'Unknown error'));
      }
    } catch (error) {
      toast.error('Failed to add item to cart');
    }
  }
}

const WishlistPage = () => {
  const handleAddToCart = useAddToCartWithNav();
  const [wishlist, setWishlist] = useState([]);
  const [showInStockOnly, setShowInStockOnly] = useState(false);

  useEffect(() => {
    const updateWishlist = () => {
      let items = JSON.parse(localStorage.getItem("wishlist")) || [];
      if (showInStockOnly) {
        items = items.filter((p) => p.totalQuantity && p.totalQuantity > 0);
      }
      setWishlist(items);
    };
    updateWishlist();
    window.addEventListener("wishlistChanged", updateWishlist);
    return () => window.removeEventListener("wishlistChanged", updateWishlist);
  }, [showInStockOnly]);

  const clearWishlist = () => {
    localStorage.removeItem("wishlist");
    setWishlist([]);
    window.dispatchEvent(new Event("wishlistChanged"));
  };


  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h2 className="wishlist__title mb-2">Wishlist</h2>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs text-gray-400">-|</span>
            <a href="/" className="text-xs text-gray-700 hover:underline">Home</a>
            <span className="text-xs text-gray-400">Wishlist</span>
          </div>
          <div className="h-0.5 w-32 bg-black mb-2" />
        </div>
        <img src="/hero.png" alt="Wishlist Banner" className="w-full md:w-96 h-40 object-cover rounded-lg mt-4 md:mt-0" />
      </div>

      {/* Wishlist Table */}
      <div className="bg-white rounded-lg  p-4">
        {wishlist.length === 0 ? (
          <div className="text-gray-500 text-center py-12">No products in your wishlist yet.</div>
        ) : (
          <div>
            {wishlist.map((product) => (
              <div key={product._id} className="wishlist__card flex flex-col sm:flex-row items-center gap-4 py-4 last:border-b-0">
                <img
                  src={
                    (product.image && typeof product.image === 'object' && product.image.url)
                      ? product.image.url
                      : (typeof product.image === 'string' && product.image.trim() !== ''
                        ? product.image
                        : "/placeholder.svg")
                  }
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded"
                  onError={e => { e.target.onerror = null; e.target.src = "/placeholder.svg"; }}
                />
                <div className="flex-1 min-w-0">
                  <a href={`/product/${product._id}`} className="wishlist__title hover:underline line-clamp-2">
                    {product.name}
                  </a>
                  <div className="wishlist__meta flex items-center gap-4 mt-1">
                    <span>Article: <span className="font-mono">{product._id?.slice(-8) || 'N/A'}</span></span>
                    <span>|</span>
                    <span>Status: {product.totalQuantity && product.totalQuantity > 0 ? <span style={{color:'#27ae60',fontWeight:600}}>IN STOCK</span> : <span style={{color:'#e94560',fontWeight:600}}>OUT OF STOCK</span>}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end min-w-[120px]">
                  {product.originalPrice && (
                    <span className="text-xs text-gray-400 line-through" style={{font:'500 12px Raleway, sans-serif'}}> 
                      {new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR' }).format(product.originalPrice)}
                    </span>
                  )}
                  <span className="wishlist__price">
                    {new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR' }).format(product.price)}
                  </span>
                </div>
                <button className="wishlist__addcart" title="Add to cart" onClick={() => handleAddToCart(product)}>
                  <img src="https://mollee-html-ten.vercel.app/assets/img/svg/shopping-bag__red.svg" alt="Add to cart" style={{width:22,height:22}} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Controls */}
      <div className="flex items-center gap-4 mt-6">
        <button onClick={clearWishlist} className="bg-black text-white px-4 py-2 rounded font-semibold text-sm hover:bg-gray-800">Clear Wishlist</button>
        <label className="checkbox__label">
          <input type="checkbox" checked={showInStockOnly} onChange={e => setShowInStockOnly(e.target.checked)} style={{position:'absolute',left:0,top:2}} />
          Show in stock only
        </label>
      </div>
    </div>
  );
};



export default WishlistPage;
