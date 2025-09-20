import React from "react";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* MOLLEE Brand Section */}
          <div className="md:col-span-1">
            <h2 className="text-2xl font-raleway font-normal mb-4 text-black tracking-wide">
              MOLLEE
            </h2>
            <span className="footer-description">
              Cillum eu id enim aliquip aute ullamco anim. <br />
              Culpa deserunt nostrud excepteur voluptate.
            </span>
            <div className="mt-6">
              <span className="footer-description">Find us here:</span>
              <div className="flex items-center space-x-2 text-base leading-7 font-raleway text-gray-700">
                <span>FB</span>
                <span>—</span>
                <span>TW</span>
                <span>—</span>
                <span>INS</span>
                <span>—</span>
                <span>PT</span>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="md:col-span-1">
            <h3 className="footer-title">About</h3>
            <nav className="space-y-1">
              <a href="#" className="footer-nav__link">
                About us
              </a>
              <a href="#" className="footer-nav__link">
                Collections
              </a>
              <a href="#" className="footer-nav__link">
                Shop
              </a>
              <a href="#" className="footer-nav__link">
                Blog
              </a>
              <a href="#" className="footer-nav__link">
                Contact us
              </a>
            </nav>
          </div>

          {/* Useful Links Section */}
          <div className="md:col-span-1">
            <h3 className="footer-title">Useful Links</h3>
            <nav className="space-y-1">
              <a href="#" className="footer-nav__link">
                Privacy Policy
              </a>
              <a href="#" className="footer-nav__link">
                Terms of use
              </a>
              <a href="#" className="footer-nav__link">
                Support
              </a>
              <a href="#" className="footer-nav__link">
                Shipping details
              </a>
              <a href="#" className="footer-nav__link">
                FAQs
              </a>
            </nav>
          </div>

          {/* Newsletter Section */}
          <div className="md:col-span-1">
            <h3 className="footer-title">Newsletter</h3>
            <p className="text-base leading-7 font-raleway text-gray-700 mb-6">
              Subscribe to be the first to hear about deals, offers and upcoming
              collections.
            </p>
            <div className="flex border border-gray-300">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 text-base leading-7 font-raleway text-gray-700 placeholder-gray-500 focus:outline-none bg-white"
              />
              <button className="px-4 py-3 bg-white border-l border-gray-300 hover:bg-gray-50 transition-colors">
                <img
                  src="https://mollee-html-ten.vercel.app/assets/img/svg/send__red.svg"
                  alt="Send"
                  className="w-5 h-5"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-base leading-7 font-raleway text-gray-700 mb-4 md:mb-0">
              © All right reserved. Mollee 2021
            </p>
            <div className="flex items-center">
              <span className="text-base leading-7 font-raleway text-gray-700 mr-4">
                Payment methods:
              </span>
              <div className="flex space-x-2">
                <img
                  src="https://mollee-html-ten.vercel.app/assets/img/payment_1.png"
                  alt="Payment method 1"
                  className="h-6"
                />
                <img
                  src="https://mollee-html-ten.vercel.app/assets/img/payment_2.png"
                  alt="Payment method 2"
                  className="h-6"
                />
                <img
                  src="https://mollee-html-ten.vercel.app/assets/img/payment_3.png"
                  alt="Payment method 3"
                  className="h-6"
                />
                <img
                  src="https://mollee-html-ten.vercel.app/assets/img/payment_4.png"
                  alt="Payment method 4"
                  className="h-6"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer-description {
          padding: 0 0 19px;
          display: block;
          font: 14px / 24px Raleway, sans-serif;
          color: #444;
        }

        .footer-title {
          padding: 3px 0 17px;
          display: block;
          font: 400 20px / 24px "Josefin Sans", sans-serif;
          text-transform: capitalize;
          color: #000;
        }

        .footer-nav__link {
          padding: 0 0 0 15px;
          display: block;
          position: relative;
          font: 14px / 24px Raleway, sans-serif;
          color: #444;
          text-decoration: none;
        }

        .footer-nav__link:hover {
          color: #000;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
