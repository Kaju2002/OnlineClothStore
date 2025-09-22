import React, { useState, useEffect } from "react";
import { Trash2, Plus, Minus, CreditCard, Lock, ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import ProductHeader from "../components/ProductHeader";
import { toast } from 'react-toastify';

// Helper function to format currency
const formatCurrency = (amount, currency = 'LKR') => {
  if (currency === 'LKR') {
    return `LKR ${amount.toFixed(2)}`;
  }
  return `$${amount.toFixed(2)}`;
};

const CheckoutPage = () => {
  const navigate = useNavigate();
  
  // Multi-step checkout state
  const [currentStep, setCurrentStep] = useState(1); // 1: Cart, 2: Payment Info, 3: Review
  
  const [cartItems, setCartItems] = useState([]);
  const [cartData, setCartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [promoCode, setPromoCode] = useState("");
  
  // Payment and shipping information state
  // Checkout form state matching required JSON structure
  const [deliveryAddress, setDeliveryAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "Sri Lanka",
    phone: ""
  });
 
  const [paymentMethod, setPaymentMethod] = useState("cash_on_delivery");
  const [discountCode, setDiscountCode] = useState("");
  const [notes, setNotes] = useState("");
  

  const [errors, setErrors] = useState({});

  // Handlers for address and notes fields (must be at top level, after state)

  // Fetch cart data from API
  useEffect(() => {
    fetchCartData();
  }, []);

  const fetchCartData = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setError('Please login to view your cart');
        setLoading(false);
        return;
      }

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/cart`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const result = await response.json();
      
      if (response.ok && result.success) {
        setCartData(result.data.cart);
        // Store the full variant object for each cart item
        const transformedItems = result.data.cart.items.map(item => ({
          id: item._id,
          name: `${item.product.name} (${item.variant.size})`,
          price: item.variant.color && item.product.variants.find(v => v.sku === item.variant.sku)?.price?.sale || item.unitPrice,
          originalPrice: item.variant.color && item.product.variants.find(v => v.sku === item.variant.sku)?.price?.regular || null,
          quantity: item.quantity,
          image: item.product.mainImage?.url || item.product.images[0]?.url || '',
          sku: item.variant.sku,
          productId: item.product._id,
          variant: item.variant // <-- store the full variant object
        }));
        setCartItems(transformedItems);
      } else {
        setError(result.message || 'Failed to fetch cart data');
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      setError('Failed to load cart data');
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (id, change) => {
    const item = cartItems.find(item => item.id === id);
    if (!item) return;

    const newQuantity = Math.max(1, item.quantity + change);
    
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/cart/items/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ quantity: newQuantity })
      });

      if (response.ok) {
        // Update local state
        setCartItems((items) =>
          items.map((item) =>
            item.id === id
              ? { ...item, quantity: newQuantity }
              : item
          )
        );
        // Refresh cart data to get updated totals
        fetchCartData();
      } else {
        console.error('Failed to update quantity');
        toast.error('Failed to update quantity');
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast.error('Failed to update quantity');
    }
  };

  const removeItem = async (id) => {
    // Get item name before deletion for the success message
    const itemToDelete = cartItems.find(item => item.id === id);
    const itemName = itemToDelete ? itemToDelete.name : 'Item';
    
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/cart/items/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        // Update local state
        setCartItems((items) => items.filter((item) => item.id !== id));
        // Refresh cart data to get updated totals
        fetchCartData();
        // Show removal toast in red color
        toast.error(`${itemName} removed from cart successfully!`);
      } else {
        console.error('Failed to remove item');
        toast.error('Failed to remove item from cart');
      }
    } catch (error) {
      console.error('Error removing item:', error);
      toast.error('Failed to remove item from cart');
    }
  };

  // Use API data for calculations if available, otherwise fallback to local calculation
  const subtotal = cartData?.subtotal || cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const delivery = cartData?.deliveryCost || 16;
  const total = cartData?.totalAmount || (subtotal + delivery);

  const handlePromoSubmit = (e) => {
    e.preventDefault();
    // Handle promo code logic here
    console.log("Promo code:", promoCode);
  };



  // Handlers for address and notes fields (must be at top level)
  const handleDeliveryAddressChange = (e) => {
    const { name, value } = e.target;
    setDeliveryAddress(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };



  const handleNotesChange = (e) => setNotes(e.target.value);

  

  const validateStep = () => {
    const newErrors = {};
    if (currentStep === 2) {
      // Validate delivery address fields for COD
      const requiredFields = ['street', 'city', 'state', 'zipCode', 'country', 'phone'];
      requiredFields.forEach(field => {
        if (!deliveryAddress[field] || !deliveryAddress[field].trim()) {
          newErrors[field] = "This field is required";
        }
      });
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = async () => {
    if (currentStep === 1) {
      // Check if cart has items
      if (cartItems.length === 0) {
        alert("Your cart is empty!");
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      // Validate payment info before proceeding
      if (validateStep()) {
        setCurrentStep(3);
      }
    } else if (currentStep === 3) {
      // Build order payload using the original variant object from cart
      const orderPayload = {
        items: cartItems.map(item => ({
          productId: item.productId,
          variant: item.variant, // use the full variant object from cart
          quantity: item.quantity
        })),
        deliveryAddress,
        billingAddress: {
          ...deliveryAddress
        },
        paymentMethod,
        discountCode,
        notes
      };
      try {
        const token = localStorage.getItem('authToken');
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/orders`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(orderPayload)
        });
        const result = await response.json();
        console.log('Order API response:', result);
        if (response.ok && result.success) {
          // Clear the cart after order
          await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/cart`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          // Pass full order data to confirmation page
          navigate("/order-confirmation", { state: { order: result.data } });
        } else {
          toast.error(result.message || 'Failed to place order');
        }
      } catch (error) {
        toast.error('Failed to place order');
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const continueShopping = () => {
    navigate("/product");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <ProductHeader 
        title={currentStep === 1 ? "Shopping Cart" : currentStep === 2 ? "Shipping & COD" : "Review Order"}
        breadcrumbText={currentStep === 1 ? "Cart" : currentStep === 2 ? "Cart / Shipping" : "Cart / Shipping / Review"}
        bannerImage="https://mollee-html-ten.vercel.app/assets/img/banner-cart.jpg"
        altText="Checkout Banner"
      />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl mt-8">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${currentStep >= 1 ? 'bg-black text-white' : 'bg-gray-200 text-gray-600'}`}>
              1
            </div>
            <div className={`w-16 h-0.5 ${currentStep >= 2 ? 'bg-black' : 'bg-gray-200'}`}></div>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${currentStep >= 2 ? 'bg-black text-white' : 'bg-gray-200 text-gray-600'}`}>
              2
            </div>
            <div className={`w-16 h-0.5 ${currentStep >= 3 ? 'bg-black' : 'bg-gray-200'}`}></div>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${currentStep >= 3 ? 'bg-black text-white' : 'bg-gray-200 text-gray-600'}`}>
              3
            </div>
          </div>
        </div>

        <div className="flex justify-center mb-6">
          <div className="flex space-x-8 text-sm">
            <span className={currentStep === 1 ? 'font-semibold' : 'text-gray-500'}>Cart</span>
            <span className={currentStep === 2 ? 'font-semibold' : 'text-gray-500'}>Shipping & COD</span>
            <span className={currentStep === 3 ? 'font-semibold' : 'text-gray-500'}>Review Order</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-8">
            
            {/* Step 1: Cart Items */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold mb-6">Shopping Cart</h2>
                
                {loading ? (
                  <div className="text-center py-12">
                    <p className="text-gray-600">Loading your cart...</p>
                  </div>
                ) : error ? (
                  <div className="text-center py-12">
                    <p className="text-red-600 mb-4">{error}</p>
                    <Button onClick={fetchCartData} className="bg-black text-white hover:bg-gray-800">
                      Retry
                    </Button>
                  </div>
                ) : cartItems.length === 0 ? (
                  <div className="text-center py-12">
                    <h3 className="text-xl font-semibold mb-4">Your cart is empty</h3>
                    <p className="text-gray-600 mb-6">Looks like you haven't added any items to your cart yet.</p>
                    <Button onClick={continueShopping} className="bg-black text-white hover:bg-gray-800">
                      Continue Shopping
                    </Button>
                  </div>
                ) : (
                  <>
                    {/* Cart Items List */}
                    <div className="space-y-6">
                      {cartItems.map((item, index) => (
                        <div key={item.id}>
                          <div className="flex items-center space-x-6 py-6">
                            {/* Product Image */}
                            <div className="flex-shrink-0">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-24 h-24 object-cover rounded"
                              />
                            </div>

                            {/* Product Details */}
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-start mb-4">
                                <h3 className="font-medium text-lg">{item.name}</h3>
                                <button
                                  onClick={() => removeItem(item.id)}
                                  className="p-1 text-gray-400 hover:text-red-500 ml-4"
                                >
                                  <Trash2 className="w-5 h-5" />
                                </button>
                              </div>

                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  {item.originalPrice && (
                                    <span className="line-through text-gray-500">
                                      ${item.originalPrice}
                                    </span>
                                  )}
                                  <span className="font-semibold text-lg">
                                    ${item.price}
                                  </span>
                                </div>

                                {/* Quantity Controls and Total */}
                                <div className="flex items-center space-x-8">
                                  <div className="flex items-center space-x-3">
                                    <button
                                      onClick={() => updateQuantity(item.id, -1)}
                                      className="w-8 h-8 flex items-center justify-center border border-gray-300 hover:bg-gray-100 rounded"
                                    >
                                      <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="w-8 text-center font-medium">
                                      {item.quantity}
                                    </span>
                                    <button
                                      onClick={() => updateQuantity(item.id, 1)}
                                      className="w-8 h-8 flex items-center justify-center border border-gray-300 hover:bg-gray-100 rounded"
                                    >
                                      <Plus className="w-4 h-4" />
                                    </button>
                                  </div>

                                  <span className="font-semibold min-w-[80px] text-right text-lg">
                                    {formatCurrency(item.price * item.quantity, cartData?.currency)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Divider Line */}
                          {index < cartItems.length - 1 && (
                            <hr className="border-gray-300" />
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Promo Code Section */}
                    <div className="py-6 border-t">
                      <h3 className="text-xl font-semibold mb-4">Promo Code</h3>
                      <p className="text-gray-600 mb-6">
                        Enter your promo code to get discount on your order.
                      </p>

                      <form onSubmit={handlePromoSubmit} className="flex space-x-0">
                        <input
                          type="text"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          placeholder="Enter promo code"
                          className="flex-1 px-4 py-3 border border-gray-300 border-r-0 focus:outline-none focus:border-black bg-gray-50"
                        />
                        <Button
                          type="submit"
                          className="bg-black text-white hover:bg-gray-800 px-6 py-3 border border-black"
                        >
                          Apply
                        </Button>
                      </form>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Step 2: Shipping Information & Cash on Delivery */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold mb-6">Shipping Information & Cash on Delivery</h2>
                
                {/* Contact Information */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-6">Delivery Address</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Street *</label>
                      <input
                        type="text"
                        name="street"
                        value={deliveryAddress.street}
                        onChange={handleDeliveryAddressChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black ${errors.street ? 'border-red-500' : 'border-gray-300'}`}
                      />
                      {errors.street && <p className="text-red-500 text-sm mt-1">{errors.street}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                      <input
                        type="text"
                        name="city"
                        value={deliveryAddress.city}
                        onChange={handleDeliveryAddressChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
                      />
                      {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
                      <input
                        type="text"
                        name="state"
                        value={deliveryAddress.state}
                        onChange={handleDeliveryAddressChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black ${errors.state ? 'border-red-500' : 'border-gray-300'}`}
                      />
                      {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code *</label>
                      <input
                        type="text"
                        name="zipCode"
                        value={deliveryAddress.zipCode}
                        onChange={handleDeliveryAddressChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black ${errors.zipCode ? 'border-red-500' : 'border-gray-300'}`}
                      />
                      {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Country *</label>
                      <input
                        type="text"
                        name="country"
                        value={deliveryAddress.country}
                        onChange={handleDeliveryAddressChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black ${errors.country ? 'border-red-500' : 'border-gray-300'}`}
                      />
                      {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={deliveryAddress.phone}
                        onChange={handleDeliveryAddressChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                      />
                      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>
                  </div>
                </div>

                {/* Billing Address removed for COD-only flow */}

                {/* Payment Method */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-6 flex items-center">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Payment Method
                  </h3>
                  
                  <div className="flex items-center mb-4">
                    <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full mr-3">
                      Only Cash on Delivery Available
                    </span>
                    <span className="inline-flex items-center text-green-700 font-medium">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      COD Selected
                    </span>
                  </div>
                  <div className="space-y-4">
                    {/* Cash on Delivery Option */}
                    <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-white"></div>
                          </div>
                          <div>
                            <h4 className="font-semibold text-lg text-green-800">Cash on Delivery (COD)</h4>
                            <p className="text-sm text-green-700">Pay with cash when your order is delivered</p>
                          </div>
                        </div>
                        <div className="text-green-600 font-semibold">
                          ✓ Selected
                        </div>
                      </div>
                    </div>

                    {/* COD Information */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-5 h-5 text-blue-600 mt-0.5">
                          ℹ️
                        </div>
                        <div className="text-sm text-blue-800">
                          <h5 className="font-medium mb-2">Cash on Delivery Details:</h5>
                          <ul className="space-y-1 text-blue-700">
                            <li>• Pay with cash when your order arrives</li>
                            <li>• No advance payment required</li>
                            <li>• Have exact change ready for smooth delivery</li>
                            <li>• COD fee: Free (included in delivery charges)</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Delivery Instructions */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Special Delivery Instructions (Optional)
                      </label>
                      <textarea
                        name="deliveryInstructions"
                        value={notes}
                        onChange={handleNotesChange}
                        placeholder="e.g., Ring the doorbell, Call before delivery, Leave at gate..."
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black resize-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Review Order */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold mb-6">Review Your Order</h2>
                
                {/* Order Items */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">Order Items</h3>
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-gray-600">Quantity: {item.quantity}</p>
                        </div>
                        <p className="font-semibold">{formatCurrency(item.price * item.quantity, cartData?.currency)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shipping Information */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">Shipping Information</h3>
                  <div className="text-gray-700">
                    <p>{deliveryAddress.street}</p>
                    <p>{deliveryAddress.city}, {deliveryAddress.state} {deliveryAddress.zipCode}</p>
                    <p>{deliveryAddress.country}</p>
                    <p>{deliveryAddress.phone}</p>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">Payment Method</h3>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-green-600 font-bold">₹</span>
                    </div>
                    <div>
                      <p className="font-semibold text-green-800">Cash on Delivery</p>
                      <p className="text-sm text-gray-600">Pay when your order arrives</p>
                    </div>
                  </div>
                  {notes && (
                    <div className="mt-4 p-3 bg-gray-50 rounded">
                      <p className="text-sm font-medium text-gray-700">Delivery Instructions:</p>
                      <p className="text-sm text-gray-600">{notes}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Order Summary - Right Side */}
          <div className="lg:col-span-4">
            <div className="bg-gray-50 p-8 sticky top-4 max-h-screen overflow-y-auto">
              <h3
                className="mb-8"
                style={{
                  color: "rgb(0, 0, 0)",
                  font: '400 28px / 34px "Josefin Sans", sans-serif',
                }}
              >
                Your Order
              </h3>

              <div className="space-y-6 mb-8">
                {/* Order Price */}
                <div className="flex justify-between items-center">
                  <span
                    style={{
                      color: "rgb(119, 119, 119)",
                      font: "16px / 24px Raleway, sans-serif",
                    }}
                  >
                    Order price
                  </span>
                  <span
                    style={{
                      color: "rgb(0, 0, 0)",
                      font: "16px / 24px Raleway, sans-serif",
                    }}
                  >
                    {formatCurrency(subtotal, cartData?.currency)}
                  </span>
                </div>

                {/* Discount */}
                <div className="flex justify-between items-center">
                  <span
                    style={{
                      color: "rgb(119, 119, 119)",
                      font: "16px / 24px Raleway, sans-serif",
                    }}
                  >
                    Discount for promo code
                  </span>
                  <span
                    style={{
                      color: "rgb(119, 119, 119)",
                      font: "16px / 24px Raleway, sans-serif",
                    }}
                  >
                    No
                  </span>
                </div>

                {/* Delivery */}
                <div className="flex justify-between items-center">
                  <span
                    style={{
                      color: "rgb(119, 119, 119)",
                      font: "16px / 24px Raleway, sans-serif",
                    }}
                  >
                    Delivery <span className="text-sm">(Aug 02 at 16:00)</span>
                  </span>
                  <span
                    style={{
                      color: "rgb(0, 0, 0)",
                      font: "16px / 24px Raleway, sans-serif",
                    }}
                  >
                    {formatCurrency(delivery, cartData?.currency)}
                  </span>
                </div>
              </div>

              {/* Total */}
              <div className="border-t border-gray-300 pt-6 mb-8">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-lg">
                    Total
                  </span>
                  <span className="font-bold text-2xl">
                    {formatCurrency(total, cartData?.currency)}
                  </span>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="space-y-4">
                {currentStep === 1 && (
                  <>
                    <Button
                      onClick={nextStep}
                      disabled={cartItems.length === 0}
                      className="w-full bg-black text-white hover:bg-gray-800 py-4"
                      style={{
                        font: "600 16px / 24px Raleway, sans-serif",
                      }}
                    >
                      <div className="flex items-center justify-center">
                        Proceed to Shipping
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </div>
                    </Button>
                    <Button
                      onClick={continueShopping}
                      variant="outline"
                      className="w-full py-3 border-black text-black hover:bg-gray-50"
                    >
                      Continue Shopping
                    </Button>
                  </>
                )}

                {currentStep === 2 && (
                  <>
                    <Button
                      onClick={nextStep}
                      className="w-full bg-black text-white hover:bg-gray-800 py-4"
                      style={{
                        font: "600 16px / 24px Raleway, sans-serif",
                      }}
                    >
                      <div className="flex items-center justify-center">
                        Review Order
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </div>
                    </Button>
                    <Button
                      onClick={prevStep}
                      variant="outline"
                      className="w-full py-3 border-black text-black hover:bg-gray-50"
                    >
                      <div className="flex items-center justify-center">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Cart
                      </div>
                    </Button>
                  </>
                )}

                {currentStep === 3 && (
                  <>
                    <Button
                      onClick={nextStep}
                      className="w-full bg-black text-white hover:bg-gray-800 py-4"
                      style={{
                        font: "600 16px / 24px Raleway, sans-serif",
                      }}
                    >
                      <div className="flex items-center justify-center">
                        <Lock className="w-4 h-4 mr-2" />
                        Place Order
                      </div>
                    </Button>
                    <Button
                      onClick={prevStep}
                      variant="outline"
                      className="w-full py-3 border-black text-black hover:bg-gray-50"
                    >
                      <div className="flex items-center justify-center">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Shipping
                      </div>
                    </Button>
                  </>
                )}
              </div>

              {/* Security Notice */}
              {currentStep >= 2 && (
                <div className="text-xs text-gray-500 mt-4 text-center space-y-1">
                  <p>
                    <Lock className="w-3 h-3 inline mr-1" />
                    Your personal information is secure
                  </p>
                  {currentStep === 3 && (
                    <p className="text-green-600">
                      💰 Cash on Delivery - No advance payment required
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
