import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, MapPin, Star } from 'lucide-react';
import { getDestinationsList, destinationsData } from '../data/destinationsData';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isExploreDropdownOpen, setIsExploreDropdownOpen] = useState(false);
  const location = useLocation();
  
  const destinations = getDestinationsList();

  const navItems = [
    { name: 'Home', path: '/home' },
    { name: 'Explore', path: '/explore', hasDropdown: true },
    { name: 'Marketplace', path: '/marketplace' },
    { name: 'Homestay', path: '/homestay' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Apply', path: '/apply' }
  ];

  const isActive = (path) => {
    if (path === '/home') {
      return location.pathname === '/' || location.pathname === '/home';
    }
    if (path === '/explore') {
      return location.pathname.startsWith('/explore');
    }
    return location.pathname === path;
  };

  const handleMouseEnter = () => {
    setIsExploreDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsExploreDropdownOpen(false);
  };

  const handleDestinationClick = () => {
    setIsExploreDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">J</span>
            </div>
            <span className="text-xl font-bold text-green-700">Jharkhand Tourism</span>
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <div 
                key={item.name} 
                className="relative"
                onMouseEnter={item.hasDropdown ? handleMouseEnter : undefined}
                onMouseLeave={item.hasDropdown ? handleMouseLeave : undefined}
              >
                {item.hasDropdown ? (
                  <div className="flex items-center">
                    <span
                      className={`px-3 py-2 rounded-md text-sm font-medium cursor-pointer transition-colors flex items-center space-x-1 ${
                        isActive(item.path)
                          ? 'text-green-700 bg-green-50'
                          : 'text-gray-700 hover:text-green-700'
                      }`}
                    >
                      <span>{item.name}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${isExploreDropdownOpen ? 'rotate-180' : ''}`} />
                    </span>
                    
                    {/* Dropdown Menu */}
                    {isExploreDropdownOpen && (
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-[800px] bg-white rounded-xl shadow-2xl border border-gray-100 py-6 z-10 max-h-96 overflow-y-auto">
                        <div className="px-6 pb-4">
                          <h3 className="text-lg font-bold text-gray-800 mb-2">Explore Destinations</h3>
                          <p className="text-sm text-gray-600">Discover the beauty of Jharkhand</p>
                        </div>
                        <div className="space-y-3 px-6">
                          {destinations.map((destination) => {
                            const destData = destinationsData[destination.id];
                            return (
                              <Link
                                key={destination.id}
                                to={`/explore/${destination.id}`}
                                onClick={handleDestinationClick}
                                className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 transition-all duration-300 group border border-transparent hover:border-green-200"
                              >
                                <div className="w-20 h-16 rounded-lg overflow-hidden flex-shrink-0 shadow-md">
                                  <img
                                    src={destData.thumbnailImage}
                                    alt={destination.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-semibold text-gray-800 group-hover:text-green-700 transition-colors">
                                    {destination.name}
                                  </h4>
                                  <p className="text-sm text-gray-600 truncate mt-1">
                                    {destData.description.substring(0, 80)}...
                                  </p>
                                  <div className="flex items-center space-x-4 mt-2">
                                    <div className="flex items-center text-xs text-gray-500">
                                      <MapPin className="w-3 h-3 mr-1" />
                                      <span>{destData.address.location.split(',')[0]}</span>
                                    </div>
                                    <div className="flex items-center text-xs text-gray-500">
                                      <Star className="w-3 h-3 mr-1 text-yellow-400 fill-current" />
                                      <span>{destData.rating}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex-shrink-0">
                                  <div className="w-8 h-8 bg-green-100 group-hover:bg-green-200 rounded-full flex items-center justify-center transition-colors">
                                    <ChevronDown className="w-4 h-4 text-green-600 rotate-[-90deg]" />
                                  </div>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                        <div className="border-t border-gray-100 mt-6 pt-4 px-6">
                          <Link
                            to="/explore"
                            onClick={handleDestinationClick}
                            className="flex items-center justify-center w-full py-2 text-sm font-medium text-green-600 hover:text-green-700 transition-colors"
                          >
                            View All Destinations →
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive(item.path)
                        ? 'text-green-700 bg-green-50'
                        : 'text-gray-700 hover:text-green-700'
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            {navItems.map((item) => (
              <div key={item.name}>
                {item.hasDropdown ? (
                  <div>
                    <button
                      onClick={() => setIsExploreDropdownOpen(!isExploreDropdownOpen)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium ${
                        isActive(item.path)
                          ? 'text-green-700 bg-green-50'
                          : 'text-gray-700 hover:text-green-700'
                      }`}
                    >
                      <span>{item.name}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${isExploreDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {isExploreDropdownOpen && (
                      <div className="pl-6 py-2 space-y-1">
                        {destinations.map((destination) => (
                          <Link
                            key={destination.id}
                            to={`/explore/${destination.id}`}
                            onClick={handleDestinationClick}
                            className="block px-3 py-2 text-sm text-gray-600 hover:text-green-700 transition-colors"
                          >
                            {destination.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-3 py-2 rounded-md text-sm font-medium ${
                      isActive(item.path)
                        ? 'text-green-700 bg-green-50'
                        : 'text-gray-700 hover:text-green-700'
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;