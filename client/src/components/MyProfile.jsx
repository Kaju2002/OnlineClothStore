import React from "react";

const MyProfile = () => {
  return (
    <div className="space-y-8">
      <div className="bg-gray-50 p-8 rounded-lg">
        <h3 
          className="mb-6"
          style={{ 
            color: 'rgb(0, 0, 0)',
            font: '400 24px / 30px "Josefin Sans", sans-serif'
          }}
        >
          Profile Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label 
              className="block mb-2"
              style={{ 
                color: 'rgb(119, 119, 119)',
                font: '14px / 18px Raleway, sans-serif'
              }}
            >
              First Name
            </label>
            <input
              type="text"
              defaultValue="John"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-black"
              style={{ font: '16px / 24px Raleway, sans-serif' }}
            />
          </div>
          
          <div>
            <label 
              className="block mb-2"
              style={{ 
                color: 'rgb(119, 119, 119)',
                font: '14px / 18px Raleway, sans-serif'
              }}
            >
              Last Name
            </label>
            <input
              type="text"
              defaultValue="Doe"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-black"
              style={{ font: '16px / 24px Raleway, sans-serif' }}
            />
          </div>
          
          <div>
            <label 
              className="block mb-2"
              style={{ 
                color: 'rgb(119, 119, 119)',
                font: '14px / 18px Raleway, sans-serif'
              }}
            >
              Email
            </label>
            <input
              type="email"
              defaultValue="john.doe@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-black"
              style={{ font: '16px / 24px Raleway, sans-serif' }}
            />
          </div>
          
          <div>
            <label 
              className="block mb-2"
              style={{ 
                color: 'rgb(119, 119, 119)',
                font: '14px / 18px Raleway, sans-serif'
              }}
            >
              Phone
            </label>
            <input
              type="tel"
              defaultValue="+1 (555) 123-4567"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-black"
              style={{ font: '16px / 24px Raleway, sans-serif' }}
            />
          </div>
        </div>
        
        <button
          className="mt-6 bg-black text-white px-8 py-3 hover:bg-gray-800 transition-colors"
          style={{ font: '600 16px / 24px Raleway, sans-serif' }}
        >
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default MyProfile;