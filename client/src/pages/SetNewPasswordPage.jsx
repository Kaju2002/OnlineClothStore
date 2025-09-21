import React, { useState } from "react";
import { Eye, EyeOff, CheckCircle, Lock } from 'lucide-react';

const SetNewPasswordPage = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  // Password strength validation
  const validatePassword = (password) => {
    const requirements = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
    return requirements;
  };

  const passwordRequirements = validatePassword(formData.password);
  const isPasswordStrong = Object.values(passwordRequirements).every(req => req);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!isPasswordStrong) {
      newErrors.password = "Password doesn't meet requirements";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Simulate API call
    console.log("Setting new password:", formData);
    setIsSuccess(true);
  };

  const handleLoginRedirect = () => {
    // Navigate to login page
    console.log("Navigate to login page");
  };

  return (
    <div className="min-h-screen">
      {/* Header Section with Title and Image */}
      <div className="min-h-screen flex">
        <div className="w-1/2 flex flex-col justify-center px-16 bg-white">
          <div className="max-w-md">
            <h1 
              className="mb-8 text-black"
              style={{ 
                font: '400 48px / 54px "Josefin Sans", sans-serif'
              }}
            >
              New Password
            </h1>
            
            {/* Breadcrumb navigation */}
            <div className="flex items-center space-x-2 text-gray-600 mb-4">
              <a 
                href="/" 
                className="hover:text-black transition-colors"
                style={{ 
                  color: 'rgb(102, 102, 102)',
                  font: '14px / 20px Raleway, sans-serif'
                }}
              >
                Home
              </a>
              <span 
                style={{ 
                  color: 'rgb(102, 102, 102)',
                  font: '14px / 20px Raleway, sans-serif'
                }}
              >
                /
              </span>
              <span 
                className="font-medium"
                style={{ 
                  color: 'rgb(235, 87, 87)',
                  font: '14px / 20px Raleway, sans-serif'
                }}
              >
                Set New Password
              </span>
            </div>
            
            {/* Horizontal line separator */}
            <div className="w-16 h-1 bg-red-500 mb-16"></div>
          </div>
        </div>
        
        {/* Right side - Background image */}
        <div className="w-1/2 relative mt-24">
          <img
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&h=800&fit=crop&crop=center"
            alt="Set New Password Banner"
            className="absolute inset-0 w-full h-[400px] object-cover object-center"
          />
        </div>
      </div>

      {/* Main Set New Password Section */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-12 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Side - Set New Password Form */}
            <div className="lg:col-span-8">
              <div className="max-w-2xl">
                {!isSuccess ? (
                  <>
                    <h2 
                      className="mb-6"
                      style={{ 
                        color: 'rgb(0, 0, 0)',
                        font: '400 36px / 42px "Josefin Sans", sans-serif'
                      }}
                    >
                      Create New Password
                    </h2>

                    <p 
                      className="mb-8"
                      style={{ 
                        color: 'rgb(119, 119, 119)',
                        font: '16px / 24px Raleway, sans-serif'
                      }}
                    >
                      Your new password must be different from previously used passwords.
                    </p>

                    {/* Set New Password form */}
                    <form onSubmit={handleSubmit} className="space-y-8">
                      {/* New Password Field */}
                      <div>
                        <div className="relative">
                          <Lock className="absolute left-0 top-4 w-5 h-5 text-gray-400" />
                          <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Enter new password"
                            className={`w-full pl-8 pr-12 py-4 border-0 border-b bg-transparent text-gray-900 placeholder-gray-500 focus:outline-none transition-colors ${
                              errors.password ? 'border-red-500' : 'border-gray-300 focus:border-black'
                            }`}
                            style={{ font: '16px / 24px Raleway, sans-serif' }}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-0 top-4 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                        {errors.password && (
                          <p 
                            className="mt-2"
                            style={{ 
                              color: 'rgb(239, 68, 68)',
                              font: '14px / 20px Raleway, sans-serif'
                            }}
                          >
                            {errors.password}
                          </p>
                        )}
                      </div>

                      {/* Confirm Password Field */}
                      <div>
                        <div className="relative">
                          <Lock className="absolute left-0 top-4 w-5 h-5 text-gray-400" />
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            placeholder="Confirm new password"
                            className={`w-full pl-8 pr-12 py-4 border-0 border-b bg-transparent text-gray-900 placeholder-gray-500 focus:outline-none transition-colors ${
                              errors.confirmPassword ? 'border-red-500' : 'border-gray-300 focus:border-black'
                            }`}
                            style={{ font: '16px / 24px Raleway, sans-serif' }}
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-0 top-4 text-gray-400 hover:text-gray-600"
                          >
                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                        {errors.confirmPassword && (
                          <p 
                            className="mt-2"
                            style={{ 
                              color: 'rgb(239, 68, 68)',
                              font: '14px / 20px Raleway, sans-serif'
                            }}
                          >
                            {errors.confirmPassword}
                          </p>
                        )}
                      </div>

                      <div className="pt-4">
                        <button
                          type="submit"
                          disabled={!isPasswordStrong || formData.password !== formData.confirmPassword}
                          className="bg-black text-white py-4 px-8 hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                          style={{ font: '600 16px / 24px Raleway, sans-serif' }}
                        >
                          Update Password
                        </button>
                      </div>
                    </form>
                  </>
                ) : (
                  // Success state
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    
                    <h2 
                      className="mb-6"
                      style={{ 
                        color: 'rgb(0, 0, 0)',
                        font: '400 36px / 42px "Josefin Sans", sans-serif'
                      }}
                    >
                      Password Updated!
                    </h2>

                    <p 
                      className="mb-8"
                      style={{ 
                        color: 'rgb(119, 119, 119)',
                        font: '16px / 24px Raleway, sans-serif'
                      }}
                    >
                      Your password has been successfully updated. You can now log in with your new password.
                    </p>

                    <button
                      onClick={handleLoginRedirect}
                      className="bg-black text-white py-4 px-8 hover:bg-gray-800 transition-colors"
                      style={{ font: '600 16px / 24px Raleway, sans-serif' }}
                    >
                      Continue to Login
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Right Side - Password Requirements */}
            <div className="lg:col-span-4">
              <div className="bg-gray-50 p-8 rounded-lg sticky top-4">
                <h3 
                  className="mb-6"
                  style={{ 
                    color: 'rgb(0, 0, 0)',
                    font: '400 28px / 34px "Josefin Sans", sans-serif'
                  }}
                >
                  Password Requirements
                </h3>
                
                <div className="space-y-4">
                  <div className={`flex items-center space-x-3 ${passwordRequirements.length ? 'text-green-600' : 'text-gray-400'}`}>
                    <CheckCircle className="w-4 h-4" />
                    <span 
                      style={{ 
                        font: '14px / 20px Raleway, sans-serif'
                      }}
                    >
                      At least 8 characters
                    </span>
                  </div>
                  
                  <div className={`flex items-center space-x-3 ${passwordRequirements.uppercase ? 'text-green-600' : 'text-gray-400'}`}>
                    <CheckCircle className="w-4 h-4" />
                    <span 
                      style={{ 
                        font: '14px / 20px Raleway, sans-serif'
                      }}
                    >
                      One uppercase letter
                    </span>
                  </div>
                  
                  <div className={`flex items-center space-x-3 ${passwordRequirements.lowercase ? 'text-green-600' : 'text-gray-400'}`}>
                    <CheckCircle className="w-4 h-4" />
                    <span 
                      style={{ 
                        font: '14px / 20px Raleway, sans-serif'
                      }}
                    >
                      One lowercase letter
                    </span>
                  </div>
                  
                  <div className={`flex items-center space-x-3 ${passwordRequirements.number ? 'text-green-600' : 'text-gray-400'}`}>
                    <CheckCircle className="w-4 h-4" />
                    <span 
                      style={{ 
                        font: '14px / 20px Raleway, sans-serif'
                      }}
                    >
                      One number
                    </span>
                  </div>
                  
                  <div className={`flex items-center space-x-3 ${passwordRequirements.special ? 'text-green-600' : 'text-gray-400'}`}>
                    <CheckCircle className="w-4 h-4" />
                    <span 
                      style={{ 
                        font: '14px / 20px Raleway, sans-serif'
                      }}
                    >
                      One special character
                    </span>
                  </div>
                </div>
              </div>

              {/* Security Tips */}
              <div className="mt-8 bg-blue-50 p-6 rounded-lg">
                <h4 
                  className="font-medium mb-4"
                  style={{ 
                    color: 'rgb(0, 0, 0)',
                    font: '18px / 24px Raleway, sans-serif'
                  }}
                >
                  Security Tips
                </h4>
                
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p 
                      style={{ 
                        color: 'rgb(119, 119, 119)',
                        font: '14px / 20px Raleway, sans-serif'
                      }}
                    >
                      Use a unique password you haven't used before
                    </p>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p 
                      style={{ 
                        color: 'rgb(119, 119, 119)',
                        font: '14px / 20px Raleway, sans-serif'
                      }}
                    >
                      Avoid common words or personal information
                    </p>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p 
                      style={{ 
                        color: 'rgb(119, 119, 119)',
                        font: '14px / 20px Raleway, sans-serif'
                      }}
                    >
                      Consider using a password manager
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetNewPasswordPage;