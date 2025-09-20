// Navbar.jsx
import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  User,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  Heart,
} from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const userDropdownRef = useRef(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100  transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 lg:h-16">
          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-md text-gray-700 hover:text-black hover:bg-gray-50 transition-all duration-200"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <div className="flex items-center">
            <div className="text-xl lg:text-2xl font-black tracking-[0.15em] text-black">
              NOLLEE
              <div className="w-full h-0.5 bg-gradient-to-r from-black via-gray-300 to-transparent mt-1"></div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center space-x-8 xl:space-x-12">
            <li>
              <a
                href="/"
                className="text-sm font-medium text-gray-700 hover:text-black transition-colors duration-200 relative group tracking-[0.05em]"
              >
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
            <li className="relative group">
              <a
                href="#"
                className="flex items-center text-sm font-medium text-gray-700 hover:text-black transition-colors duration-200 tracking-[0.05em]"
                onMouseEnter={() => handleDropdown("pages")}
              >
                Pages
                <ChevronDown
                  size={16}
                  className="ml-1 transition-transform duration-200 group-hover:rotate-180"
                />
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
            <li className="relative group">
              <a
                href="#"
                className="flex items-center text-sm font-medium text-gray-700 hover:text-black transition-colors duration-200 tracking-[0.05em]"
                onMouseEnter={() => handleDropdown("shop")}
              >
                Shop
                <ChevronDown
                  size={16}
                  className="ml-1 transition-transform duration-200 group-hover:rotate-180"
                />
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-sm font-medium text-gray-700 hover:text-black transition-colors duration-200 relative group tracking-[0.05em]"
              >
                Blog
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-sm font-medium text-gray-700 hover:text-black transition-colors duration-200 relative group tracking-[0.05em]"
              >
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
          </ul>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2 lg:space-x-4">
            {/* Search Button */}
            <button className="p-2 rounded-full text-gray-700 hover:text-black hover:bg-gray-50 transition-all duration-200 transform hover:scale-110">
              <Search size={20} strokeWidth={1.5} />
            </button>

            {/* Wishlist Button - Hidden on mobile */}
            <button className="hidden sm:block p-2 rounded-full text-gray-700 hover:text-black hover:bg-gray-50 transition-all duration-200 transform hover:scale-110">
              <Heart size={20} strokeWidth={1.5} />
            </button>

            {/* User Account Button */}
            <div className="relative" ref={userDropdownRef}>
              <button 
                onClick={toggleUserDropdown}
                className="p-2 rounded-full text-gray-700 hover:text-black hover:bg-gray-50 transition-all duration-200 transform hover:scale-110"
              >
                <User size={20} strokeWidth={1.5} />
              </button>

              {/* User Dropdown Menu */}
              {isUserDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                  <a
                    href="/login"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-black transition-colors duration-200"
                    onClick={() => setIsUserDropdownOpen(false)}
                  >
                    Login
                  </a>
                  <a
                    href="/register"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-black transition-colors duration-200"
                    onClick={() => setIsUserDropdownOpen(false)}
                  >
                    Sign Up
                  </a>
                  <hr className="my-2 border-gray-100" />
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-black transition-colors duration-200"
                    onClick={() => setIsUserDropdownOpen(false)}
                  >
                    Logout
                  </a>
                </div>
              )}
            </div>

            {/* Shopping Cart Button */}
            <button className="relative p-2 rounded-full text-gray-700 hover:text-black hover:bg-gray-50 transition-all duration-200 transform hover:scale-110 group">
              <ShoppingBag size={20} strokeWidth={1.5} />
              <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium transition-all duration-200 group-hover:scale-110">
                0
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden bg-white border-t border-gray-100`}
      >
        <div className="px-4 py-6 space-y-4">
          <a
            href="#"
            className="block text-lg font-medium text-gray-700 hover:text-black transition-colors duration-200 py-2"
          >
            Home
          </a>
          <div className="space-y-2">
            <button
              onClick={() => handleDropdown("mobile-pages")}
              className="flex items-center justify-between w-full text-lg font-medium text-gray-700 hover:text-black transition-colors duration-200 py-2"
            >
              Pages
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${
                  activeDropdown === "mobile-pages" ? "rotate-180" : ""
                }`}
              />
            </button>
            {activeDropdown === "mobile-pages" && (
              <div className="pl-4 space-y-2">
                <a
                  href="#"
                  className="block text-gray-600 hover:text-black transition-colors duration-200 py-1"
                >
                  About Us
                </a>
                <a
                  href="#"
                  className="block text-gray-600 hover:text-black transition-colors duration-200 py-1"
                >
                  Services
                </a>
                <a
                  href="#"
                  className="block text-gray-600 hover:text-black transition-colors duration-200 py-1"
                >
                  FAQ
                </a>
              </div>
            )}
          </div>
          <div className="space-y-2">
            <button
              onClick={() => handleDropdown("mobile-shop")}
              className="flex items-center justify-between w-full text-lg font-medium text-gray-700 hover:text-black transition-colors duration-200 py-2"
            >
              Shop
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${
                  activeDropdown === "mobile-shop" ? "rotate-180" : ""
                }`}
              />
            </button>
            {activeDropdown === "mobile-shop" && (
              <div className="pl-4 space-y-2">
                <a
                  href="#"
                  className="block text-gray-600 hover:text-black transition-colors duration-200 py-1"
                >
                  Women
                </a>
                <a
                  href="#"
                  className="block text-gray-600 hover:text-black transition-colors duration-200 py-1"
                >
                  Men
                </a>
                <a
                  href="#"
                  className="block text-gray-600 hover:text-black transition-colors duration-200 py-1"
                >
                  Accessories
                </a>
                <a
                  href="#"
                  className="block text-gray-600 hover:text-black transition-colors duration-200 py-1"
                >
                  Sale
                </a>
              </div>
            )}
          </div>
          <a
            href="#"
            className="block text-lg font-medium text-gray-700 hover:text-black transition-colors duration-200 py-2"
          >
            Blog
          </a>
          <a
            href="#"
            className="block text-lg font-medium text-gray-700 hover:text-black transition-colors duration-200 py-2"
          >
            Contact
          </a>

          {/* Mobile Action Buttons */}
          <div className="pt-4 border-t border-gray-100">
            <div className="flex justify-center space-x-6">
              <button className="p-3 rounded-full bg-gray-50 text-gray-700 hover:text-black hover:bg-gray-100 transition-all duration-200">
                <Heart size={20} strokeWidth={1.5} />
              </button>
              <button className="p-3 rounded-full bg-gray-50 text-gray-700 hover:text-black hover:bg-gray-100 transition-all duration-200">
                <User size={20} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
