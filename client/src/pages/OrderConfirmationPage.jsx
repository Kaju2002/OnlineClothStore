import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Package, Clock, Phone, MapPin } from "lucide-react";
import { Button } from "../ui/button";

const OrderConfirmationPage = () => {
  const navigate = useNavigate();

  // Mock order data - in real app, this would come from state/props/API
  const orderData = {
    orderNumber: "ORD-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
    orderDate: new Date().toLocaleDateString(),
    expectedDelivery: "Aug 02, 2024 at 16:00",
    totalAmount: 162.98,
    items: [
      {
        id: 1,
        name: "Fashionee - cotton shirt (S)",
        price: 35.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=80&h=80&fit=crop"
      },
      {
        id: 2,
        name: "Spray wrap skirt",
        price: 110.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1583496661160-fb5886a13fe7?w=80&h=80&fit=crop"
      }
    ],
    customer: {
      name: "Customer Name",
      phone: "+1 (555) 123-4567",
      email: "customer@example.com",
      address: "123 Main Street, City, State 12345"
    }
  };

  const handleContinueShopping = () => {
    navigate("/");
  };

  const handleViewOrders = () => {
    navigate("/my-orders"); // You can create this page later
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
          </div>
          
          <h1 
            className="mb-4"
            style={{ 
              color: 'rgb(0, 0, 0)',
              font: '400 36px / 42px "Josefin Sans", sans-serif'
            }}
          >
            Order Placed Successfully!
          </h1>
          
          <p 
            className="mb-8"
            style={{ 
              color: 'rgb(119, 119, 119)',
              font: '18px / 28px Raleway, sans-serif'
            }}
          >
            Thank you for your order. We'll send you a confirmation email shortly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Order Details */}
          <div className="space-y-8">
            {/* Order Information */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 
                className="mb-6"
                style={{ 
                  color: 'rgb(0, 0, 0)',
                  font: '400 24px / 30px "Josefin Sans", sans-serif'
                }}
              >
                Order Information
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span 
                    style={{ 
                      color: 'rgb(119, 119, 119)',
                      font: '16px / 24px Raleway, sans-serif'
                    }}
                  >
                    Order Number:
                  </span>
                  <span 
                    className="font-semibold"
                    style={{ 
                      color: 'rgb(0, 0, 0)',
                      font: '16px / 24px Raleway, sans-serif'
                    }}
                  >
                    {orderData.orderNumber}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span 
                    style={{ 
                      color: 'rgb(119, 119, 119)',
                      font: '16px / 24px Raleway, sans-serif'
                    }}
                  >
                    Order Date:
                  </span>
                  <span 
                    style={{ 
                      color: 'rgb(0, 0, 0)',
                      font: '16px / 24px Raleway, sans-serif'
                    }}
                  >
                    {orderData.orderDate}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span 
                    style={{ 
                      color: 'rgb(119, 119, 119)',
                      font: '16px / 24px Raleway, sans-serif'
                    }}
                  >
                    Payment Method:
                  </span>
                  <span 
                    style={{ 
                      color: 'rgb(0, 0, 0)',
                      font: '16px / 24px Raleway, sans-serif'
                    }}
                  >
                    Cash on Delivery
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span 
                    style={{ 
                      color: 'rgb(119, 119, 119)',
                      font: '16px / 24px Raleway, sans-serif'
                    }}
                  >
                    Total Amount:
                  </span>
                  <span 
                    className="font-bold text-lg"
                    style={{ 
                      color: 'rgb(0, 0, 0)',
                      font: '18px / 24px Raleway, sans-serif'
                    }}
                  >
                    ${orderData.totalAmount}
                  </span>
                </div>
              </div>
            </div>

            {/* Delivery Information */}
            <div className="bg-green-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <Clock className="w-5 h-5 text-green-600 mr-3" />
                <h3 
                  style={{ 
                    color: 'rgb(0, 0, 0)',
                    font: '400 20px / 26px "Josefin Sans", sans-serif'
                  }}
                >
                  Expected Delivery
                </h3>
              </div>
              
              <p 
                className="font-semibold"
                style={{ 
                  color: 'rgb(34, 197, 94)',
                  font: '18px / 24px Raleway, sans-serif'
                }}
              >
                {orderData.expectedDelivery}
              </p>
              
              <div className="flex items-start mt-4">
                <MapPin className="w-4 h-4 text-gray-500 mr-2 mt-1" />
                <p 
                  style={{ 
                    color: 'rgb(119, 119, 119)',
                    font: '14px / 20px Raleway, sans-serif'
                  }}
                >
                  {orderData.customer.address}
                </p>
              </div>
            </div>

            {/* Customer Information */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 
                className="mb-4"
                style={{ 
                  color: 'rgb(0, 0, 0)',
                  font: '400 20px / 26px "Josefin Sans", sans-serif'
                }}
              >
                Contact Information
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 text-gray-500 mr-3" />
                  <span 
                    style={{ 
                      color: 'rgb(0, 0, 0)',
                      font: '16px / 24px Raleway, sans-serif'
                    }}
                  >
                    {orderData.customer.phone}
                  </span>
                </div>
                
                <div className="flex items-center">
                  <span className="w-4 h-4 text-gray-500 mr-3">@</span>
                  <span 
                    style={{ 
                      color: 'rgb(0, 0, 0)',
                      font: '16px / 24px Raleway, sans-serif'
                    }}
                  >
                    {orderData.customer.email}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 
                className="mb-6"
                style={{ 
                  color: 'rgb(0, 0, 0)',
                  font: '400 24px / 30px "Josefin Sans", sans-serif'
                }}
              >
                Order Items
              </h3>
              
              <div className="space-y-6">
                {orderData.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 
                        className="mb-1"
                        style={{ 
                          color: 'rgb(0, 0, 0)',
                          font: '16px / 20px Raleway, sans-serif'
                        }}
                      >
                        {item.name}
                      </h4>
                      <p 
                        style={{ 
                          color: 'rgb(119, 119, 119)',
                          font: '14px / 18px Raleway, sans-serif'
                        }}
                      >
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <span 
                      className="font-semibold"
                      style={{ 
                        color: 'rgb(0, 0, 0)',
                        font: '16px / 20px Raleway, sans-serif'
                      }}
                    >
                      ${item.price}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-300 mt-6 pt-6">
                <div className="flex justify-between items-center">
                  <span 
                    className="font-semibold"
                    style={{ 
                      color: 'rgb(0, 0, 0)',
                      font: '18px / 24px Raleway, sans-serif'
                    }}
                  >
                    Total Amount
                  </span>
                  <span 
                    className="font-bold text-xl"
                    style={{ 
                      color: 'rgb(0, 0, 0)',
                      font: '24px / 30px Raleway, sans-serif'
                    }}
                  >
                    ${orderData.totalAmount}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <Button
            onClick={handleContinueShopping}
            variant="outline"
            className="px-8 py-3 border-black text-black hover:bg-gray-50"
            style={{ font: '600 16px / 24px Raleway, sans-serif' }}
          >
            Continue Shopping
          </Button>
          
          <Button
            onClick={handleViewOrders}
            className="bg-black text-white hover:bg-gray-800 px-8 py-3"
            style={{ font: '600 16px / 24px Raleway, sans-serif' }}
          >
            View My Orders
          </Button>
        </div>

        {/* Additional Information */}
        <div className="text-center mt-12 p-6 bg-blue-50 rounded-lg">
          <div className="flex justify-center mb-4">
            <Package className="w-8 h-8 text-blue-600" />
          </div>
          <h4 
            className="mb-2"
            style={{ 
              color: 'rgb(0, 0, 0)',
              font: '400 20px / 26px "Josefin Sans", sans-serif'
            }}
          >
            What happens next?
          </h4>
          <p 
            style={{ 
              color: 'rgb(119, 119, 119)',
              font: '16px / 24px Raleway, sans-serif'
            }}
          >
            We'll prepare your order and contact you before delivery. 
            You can pay cash when your order arrives at your doorstep.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;