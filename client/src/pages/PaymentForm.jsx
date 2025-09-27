import React from "react";

const PaymentForm = ({ deliveryAddress, errors, handleDeliveryAddressChange }) => (
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
);

export default PaymentForm;
