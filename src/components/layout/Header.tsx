import React, { useState } from 'react';
import { Menu, X, BarChart2, Users, BookOpen, GraduationCap, Home } from 'lucide-react';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <BarChart2 className="h-8 w-8 text-blue-800" />
              <span className="ml-2 text-xl font-bold text-gray-900">EduAnalytics</span>
            </div>
            <nav className="hidden md:ml-6 md:flex md:space-x-8">
              <a 
                href="#dashboard" 
                className="text-gray-700 hover:text-blue-800 hover:border-blue-800 px-3 py-2 text-sm font-medium border-b-2 border-transparent"
              >
                Dashboard
              </a>
              <a 
                href="#students" 
                className="text-gray-700 hover:text-blue-800 hover:border-blue-800 px-3 py-2 text-sm font-medium border-b-2 border-transparent"
              >
                Students
              </a>
              <a 
                href="#schools" 
                className="text-gray-700 hover:text-blue-800 hover:border-blue-800 px-3 py-2 text-sm font-medium border-b-2 border-transparent"
              >
                Schools
              </a>
              <a 
                href="#analytics" 
                className="text-gray-700 hover:text-blue-800 hover:border-blue-800 px-3 py-2 text-sm font-medium border-b-2 border-transparent"
              >
                Analytics
              </a>
            </nav>
          </div>
          <div className="flex items-center">
            <div className="hidden md:ml-4 md:flex md:items-center">
              <button 
                className="bg-blue-800 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
              >
                Login
              </button>
            </div>
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg border-t">
            <a
              href="#dashboard"
              className="flex items-center text-gray-700 hover:bg-gray-100 hover:text-blue-800 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Home className="mr-2 h-5 w-5" />
              Dashboard
            </a>
            <a
              href="#students"
              className="flex items-center text-gray-700 hover:bg-gray-100 hover:text-blue-800 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Users className="mr-2 h-5 w-5" />
              Students
            </a>
            <a
              href="#schools"
              className="flex items-center text-gray-700 hover:bg-gray-100 hover:text-blue-800 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              <BookOpen className="mr-2 h-5 w-5" />
              Schools
            </a>
            <a
              href="#analytics"
              className="flex items-center text-gray-700 hover:bg-gray-100 hover:text-blue-800 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              <GraduationCap className="mr-2 h-5 w-5" />
              Analytics
            </a>
            <div className="pt-4">
              <button 
                className="w-full bg-blue-800 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;