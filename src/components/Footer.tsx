import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full py-8 px-4 border-t border-gray-200 bg-white">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-600">
            © {new Date().getFullYear()} Bombay Breed Consulting. All rights reserved.
          </div>
          
          <div className="flex gap-6 text-sm">
            <Link 
              to="/privacy-policy" 
              className="text-gray-600 hover:text-primary transition-colors underline-offset-4 hover:underline"
            >
              Privacy Policy
            </Link>
            <Link 
              to="/terms-and-conditions" 
              className="text-gray-600 hover:text-primary transition-colors underline-offset-4 hover:underline"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
