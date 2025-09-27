import React, { useState } from "react";
import ProductHeader from "../components/ProductHeader";

const BecomeDeliveryPartner = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    vehicleType: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!form.name || !form.email || !form.phone || !form.address || !form.vehicleType) {
      setError("Please fill in all required fields.");
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ProductHeader
        title="Become a Delivery Partner"
  bannerImage="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&w=1200&q=80"
        altText="Delivery Partner Banner"
        breadcrumbText="Home / Become a Delivery Partner"
      />
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="flex flex-col md:flex-row gap-8 items-stretch">
          {/* Left Side: Extra Content */}
          <div className="md:w-1/2 flex flex-col justify-center gap-8">
            <h2 className="text-3xl font-semibold mb-4 text-center md:text-left">Apply to Become a Delivery Partner</h2>
            <p className="text-gray-600 mb-8 text-center md:text-left">
              Join TrendByte's delivery team and help us bring fashion to our customers' doorsteps. Fill out the form below to apply!
            </p>
            <div className="grid grid-cols-1 gap-6">
              <div className="bg-blue-50 rounded-lg p-4 text-center md:text-left">
                <h3 className="font-bold text-blue-700 mb-2">Why Join Us?</h3>
                <ul className="text-blue-700 text-sm space-y-1">
                  <li>✔ Flexible working hours</li>
                  <li>✔ Weekly payouts</li>
                  <li>✔ Partner rewards & bonuses</li>
                  <li>✔ Friendly support team</li>
                </ul>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center md:text-left">
                <h3 className="font-bold text-green-700 mb-2">How It Works</h3>
                <ol className="text-green-700 text-sm space-y-1 list-decimal list-inside">
                  <li>Submit your application</li>
                  <li>Get reviewed by our team</li>
                  <li>Start delivering with TrendByte!</li>
                </ol>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4 text-center md:text-left">
                <h3 className="font-bold text-yellow-700 mb-2">Requirements</h3>
                <ul className="text-yellow-700 text-sm space-y-1">
                  <li>✔ Valid driving license</li>
                  <li>✔ Own a bike, car, van, or three-wheeler</li>
                  <li>✔ Good communication skills</li>
                  <li>✔ Passion for customer service</li>
                </ul>
              </div>
            </div>
          </div>
          {/* Right Side: Form */}
          <div className="md:w-1/2 bg-white rounded-lg shadow-lg p-8 flex flex-col justify-center">
            {submitted ? (
              <div className="text-green-600 text-center text-lg font-semibold py-8">
                Thank you for applying! We will review your application and contact you soon.
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">{error}</div>}
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                      required
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                      required
                    />
                  </div>
                </div>
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
                      <input
                        type="text"
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                        required
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Type *</label>
                      <select
                        name="vehicleType"
                        value={form.vehicleType}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                        required
                      >
                        <option value="">Select vehicle type</option>
                        <option value="Bike">Bike</option>
                        <option value="Car">Car</option>
                        <option value="Van">Van</option>
                        <option value="Three Wheeler">Three Wheeler</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                  <div className="flex items-center">
                    <span className="px-2 py-2 border border-gray-300 bg-gray-50 rounded-l-md select-none">+94</span>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-black"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message (Optional)</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black resize-none"
                    placeholder="Tell us why you'd be a great delivery partner..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-black text-white py-3 rounded-md font-semibold hover:bg-gray-800 transition-colors"
                >
                  Apply Now
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BecomeDeliveryPartner;
