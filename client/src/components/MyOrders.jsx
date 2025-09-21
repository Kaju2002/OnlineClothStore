import React, { useState } from "react";

const MyOrders = () => {
  const [expandedOrder, setExpandedOrder] = useState(null);

  // Mock order data
  const orders = [
    {
      id: "N°116299787",
      date: "Aug 02, 2020",
      status: "Going to you",
      statusColor: "text-orange-500",
      items: [
        {
          id: 1,
          name: "Fashionee - cotton shirt (S)",
          quantity: 1,
          price: 33.99,
          image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=80&h=80&fit=crop"
        },
        {
          id: 2,
          name: "Spray wrap skirt",
          quantity: 1,
          price: 110.99,
          image: "https://images.unsplash.com/photo-1583496661160-fb5886a13fe7?w=80&h=80&fit=crop"
        }
      ],
      total: 146.98,
      deliveryAddress: "27 Division St, New York, NY 10002, USA"
    },
    {
      id: "N°116226274",
      date: "Jul 26, 2020",
      status: "Delivered",
      statusColor: "text-green-500",
      items: [
        {
          id: 3,
          name: "Summer dress",
          quantity: 2,
          price: 89.99,
          image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=80&h=80&fit=crop"
        }
      ],
      total: 179.98,
      deliveryAddress: "27 Division St, New York, NY 10002, USA"
    },
    {
      id: "N°015423561",
      date: "Jun 30, 2020",
      status: "Delivered",
      statusColor: "text-green-500",
      items: [
        {
          id: 4,
          name: "Casual blazer",
          quantity: 1,
          price: 129.99,
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop"
        }
      ],
      total: 145.99,
      deliveryAddress: "27 Division St, New York, NY 10002, USA"
    },
    {
      id: "N°116292237",
      date: "Jun 16, 2020",
      status: "Delivered",
      statusColor: "text-green-500",
      items: [
        {
          id: 5,
          name: "Designer handbag",
          quantity: 1,
          price: 199.99,
          image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=80&h=80&fit=crop"
        }
      ],
      total: 215.99,
      deliveryAddress: "27 Division St, New York, NY 10002, USA"
    },
    {
      id: "N°116297741",
      date: "May 28, 2020",
      status: "Delivered",
      statusColor: "text-green-500",
      items: [
        {
          id: 6,
          name: "Elegant evening gown",
          quantity: 1,
          price: 299.99,
          image: "https://images.unsplash.com/photo-1566479179817-c0a5b1d13dd7?w=80&h=80&fit=crop"
        }
      ],
      total: 315.99,
      deliveryAddress: "27 Division St, New York, NY 10002, USA"
    },
    {
      id: "N°116293364",
      date: "May 12, 2020",
      status: "Delivered",
      statusColor: "text-green-500",
      items: [
        {
          id: 7,
          name: "Sports sneakers",
          quantity: 1,
          price: 89.99,
          image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=80&h=80&fit=crop"
        }
      ],
      total: 105.99,
      deliveryAddress: "27 Division St, New York, NY 10002, USA"
    }
  ];

  const toggleOrderDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const handleDeleteHistory = () => {
    console.log("Delete order history");
  };

  return (
    <div className="space-y-0">
      {orders.map((order, index) => (
        <div key={order.id} className="border-b border-gray-200 last:border-b-0">
          {/* Order Header */}
          <div 
            className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => toggleOrderDetails(order.id)}
          >
            <div className="flex items-center space-x-8">
              <span 
                className="font-medium"
                style={{ 
                  color: 'rgb(0, 0, 0)',
                  font: '16px / 24px Raleway, sans-serif'
                }}
              >
                {order.id}
              </span>
              <span 
                style={{ 
                  color: 'rgb(119, 119, 119)',
                  font: '16px / 24px Raleway, sans-serif'
                }}
              >
                {order.date}
              </span>
              <span 
                className={`font-medium ${order.statusColor} flex items-center`}
                style={{ font: '16px / 24px Raleway, sans-serif' }}
              >
                {order.status}
                {order.status === "Going to you" && (
                  <span className="ml-2 text-lg">🚚</span>
                )}
                {order.status === "Delivered" && (
                  <img 
                    src="https://mollee-html-ten.vercel.app/assets/img/svg/order-icon_2.svg" 
                    alt="Delivered" 
                    className="ml-2 w-4 h-4"
                  />
                )}
              </span>
            </div>
            
            <svg
              className={`w-5 h-5 transition-transform duration-200 text-gray-400 ${
                expandedOrder === order.id ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>

          {/* Order Details - Expandable */}
          {expandedOrder === order.id && (
            <div className="px-6 pb-6 bg-gray-50">
              <div className="pt-4 border-t border-gray-200">
                {/* Order Items */}
                <div className="space-y-4 mb-6">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 
                          className="font-medium mb-1"
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
                          x{item.quantity}
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

                <hr className="my-6 border-gray-300" />

                {/* Order Summary */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 
                      className="font-semibold mb-2"
                      style={{ 
                        color: 'rgb(0, 0, 0)',
                        font: '16px / 20px Raleway, sans-serif'
                      }}
                    >
                      Order amount
                    </h5>
                    <p 
                      className="text-xl font-bold"
                      style={{ 
                        color: 'rgb(0, 0, 0)',
                        font: '20px / 24px Raleway, sans-serif'
                      }}
                    >
                      ${order.total}
                    </p>
                  </div>
                  
                  <div>
                    <h5 
                      className="font-semibold mb-2"
                      style={{ 
                        color: 'rgb(0, 0, 0)',
                        font: '16px / 20px Raleway, sans-serif'
                      }}
                    >
                      Delivered to
                    </h5>
                    <p 
                      style={{ 
                        color: 'rgb(119, 119, 119)',
                        font: '14px / 18px Raleway, sans-serif'
                      }}
                    >
                      {order.deliveryAddress}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-8">
        <button
          onClick={handleDeleteHistory}
          className="bg-black text-white px-6 py-3 hover:bg-gray-800 transition-colors"
          style={{ font: '600 16px / 24px Raleway, sans-serif' }}
        >
          Delete History
        </button>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="showActive"
            className="mr-2 w-4 h-4"
          />
          <label 
            htmlFor="showActive"
            style={{ 
              color: 'rgb(119, 119, 119)',
              font: '16px / 24px Raleway, sans-serif'
            }}
          >
            Show only active
          </label>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;