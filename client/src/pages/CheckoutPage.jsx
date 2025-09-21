import React, { useState } from "react";
import { Trash2, Plus, Minus } from "lucide-react";
import { Button } from "../ui/button";

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Fashionee - Cotton Shirt (S)",
      price: 35.99,
      originalPrice: 52.0,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=200&h=200&fit=crop",
    },
    {
      id: 2,
      name: "Spray Wrap Skirt",
      price: 110.99,
      originalPrice: null,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1583496661160-fb5886a13fe7?w=200&h=200&fit=crop",
    },
  ]);

  const [promoCode, setPromoCode] = useState("");

  const updateQuantity = (id, change) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const delivery = 16;
  const total = subtotal + delivery;

  const handlePromoSubmit = (e) => {
    e.preventDefault();
    // Handle promo code logic here
    console.log("Promo code:", promoCode);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Cart Items - Left Side */}
          <div className="lg:col-span-8 space-y-6">
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
                        <h3
                          className="font-medium"
                          style={{
                            color: "rgb(0, 0, 0)",
                            font: "18px / 24px Raleway, sans-serif",
                          }}
                        >
                          {item.name}
                        </h3>
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
                            <span
                              className="line-through"
                              style={{
                                color: "rgb(153, 153, 153)",
                                font: "16px / 24px Raleway, sans-serif",
                              }}
                            >
                              ${item.originalPrice}
                            </span>
                          )}
                          <span
                            className="font-semibold"
                            style={{
                              color: "rgb(0, 0, 0)",
                              font: "18px / 24px Raleway, sans-serif",
                            }}
                          >
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
                            <span
                              className="w-8 text-center"
                              style={{
                                font: "16px / 24px Raleway, sans-serif",
                              }}
                            >
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-8 h-8 flex items-center justify-center border border-gray-300 hover:bg-gray-100 rounded"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>

                          <span
                            className="font-semibold min-w-[80px] text-right"
                            style={{
                              color: "rgb(0, 0, 0)",
                              font: "18px / 24px Raleway, sans-serif",
                            }}
                          >
                            ${(item.price * item.quantity).toFixed(2)}
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

              {/* Final Divider */}
              <hr className="border-gray-300 my-8" />
            </div>

            {/* Promo Code Section */}
            <div className="py-6">
              <h3
                className="mb-4"
                style={{
                  color: "rgb(0, 0, 0)",
                  font: '400 28px / 34px "Josefin Sans", sans-serif',
                }}
              >
                You Have A Promo Code?
              </h3>
              <p
                className="mb-6"
                style={{
                  color: "rgb(119, 119, 119)",
                  font: "16px / 24px Raleway, sans-serif",
                }}
              >
                To receive up-to-date promotional codes,
                <br />
                subscribe to us on social networks.
              </p>

              <form onSubmit={handlePromoSubmit} className="flex space-x-0">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Enter promo code"
                  className="flex-1 px-4 py-3 border border-gray-300 border-r-0 focus:outline-none focus:border-black bg-gray-50"
                  style={{
                    font: "16px / 24px Raleway, sans-serif",
                  }}
                />
                <Button
                  type="submit"
                  className="bg-black text-white hover:bg-gray-800 px-6 py-3  border border-black"
                  style={{
                    font: "16px / 24px Raleway, sans-serif",
                  }}
                >
                  →
                </Button>
              </form>
            </div>
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
                    ${subtotal.toFixed(2)}
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
                    ${delivery}
                  </span>
                </div>
              </div>

              {/* Total */}
              <div className="border-t border-gray-300 pt-6 mb-8">
                <div className="flex justify-between items-center">
                  <span
                    className="font-semibold"
                    style={{
                      color: "rgb(0, 0, 0)",
                      font: "18px / 24px Raleway, sans-serif",
                    }}
                  >
                    Total
                  </span>
                  <span
                    className="font-bold"
                    style={{
                      color: "rgb(0, 0, 0)",
                      font: "24px / 30px Raleway, sans-serif",
                    }}
                  >
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <Button
                className="w-full bg-black text-white hover:bg-gray-800 py-4"
                style={{
                  font: "600 16px / 24px Raleway, sans-serif",
                }}
              >
                Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
