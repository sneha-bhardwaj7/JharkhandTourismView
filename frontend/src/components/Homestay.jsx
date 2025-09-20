import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  MapPin, 
  Star, 
  Calendar,
  Users,
  X,
  SlidersHorizontal
} from 'lucide-react';
import { homestayData } from '../data/homestayData';

const Homestay = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const [checkIn, setCheckIn] = useState('21/09/2025');
  const [checkOut, setCheckOut] = useState('22/09/2025');
  const [guests, setGuests] = useState('2 Adult, 1 Room');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [filters, setFilters] = useState({
    discounts: false,
    priceRange: 'all',
    locality: '',
    sortBy: 'price-low'
  });

  const homestays = Object.values(homestayData);

  // Apply filters
  const filteredHomestays = useMemo(() => {
    let filtered = [...homestays];

    // Filter by discounts
    if (filters.discounts) {
      filtered = filtered.filter(homestay => homestay.discount);
    }

    // Filter by locality
    if (filters.locality) {
      filtered = filtered.filter(homestay => 
        homestay.shortLocation.toLowerCase().includes(filters.locality.toLowerCase())
      );
    }

    // Filter by search location
    if (searchLocation) {
      filtered = filtered.filter(homestay =>
        homestay.location.toLowerCase().includes(searchLocation.toLowerCase()) ||
        homestay.name.toLowerCase().includes(searchLocation.toLowerCase())
      );
    }

    // Sort
    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.discountedPrice - b.discountedPrice);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.discountedPrice - a.discountedPrice);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return filtered;
  }, [homestays, filters, searchLocation]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilter = (key) => {
    setFilters(prev => ({ ...prev, [key]: key === 'discounts' ? false : '' }));
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.discounts) count++;
    if (filters.locality) count++;
    if (filters.priceRange !== 'all') count++;
    return count;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Search */}
      <div 
        className="relative h-64 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&h=400&fit=crop)',
          backgroundBlendMode: 'overlay',
          backgroundColor: 'rgba(0, 0, 0, 0.4)'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-4xl font-bold mb-4">Find Your Perfect Homestay</h1>
            <p className="text-xl">Experience authentic local hospitality in beautiful locations</p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white shadow-lg -mt-20 relative z-10 mx-4 md:mx-8 rounded-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Where To Stay"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-colors">
            <Search className="w-5 h-5" />
            <span>Modify Search</span>
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:block ${showFilters ? 'block' : 'hidden'} lg:col-span-1`}>
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-cyan-600">Applied Filters</h2>
                {getActiveFiltersCount() > 0 && (
                  <span className="bg-cyan-100 text-cyan-800 px-2 py-1 rounded-full text-sm">
                    {getActiveFiltersCount()}
                  </span>
                )}
              </div>

              {/* Active Filters */}
              <div className="mb-6">
                {filters.discounts && (
                  <div className="inline-flex items-center bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full text-sm mr-2 mb-2">
                    <span>Discounts</span>
                    <X 
                      className="w-4 h-4 ml-2 cursor-pointer" 
                      onClick={() => clearFilter('discounts')}
                    />
                  </div>
                )}
                {filters.locality && (
                  <div className="inline-flex items-center bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full text-sm mr-2 mb-2">
                    <span>{filters.locality}</span>
                    <X 
                      className="w-4 h-4 ml-2 cursor-pointer" 
                      onClick={() => clearFilter('locality')}
                    />
                  </div>
                )}
              </div>

              <h3 className="text-lg font-bold text-gray-800 mb-4">Select Filters</h3>

              {/* Sorts */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-700 mb-3">Sorts</h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="sort"
                      value="discounts"
                      checked={filters.discounts}
                      onChange={(e) => handleFilterChange('discounts', e.target.checked)}
                      className="w-4 h-4 text-green-600 focus:ring-green-500"
                    />
                    <span className="ml-2 text-gray-700">Discounts</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="sort"
                      value="price-low"
                      checked={filters.sortBy === 'price-low'}
                      onChange={() => handleFilterChange('sortBy', 'price-low')}
                      className="w-4 h-4 text-green-600 focus:ring-green-500"
                    />
                    <span className="ml-2 text-gray-700">Price (Low - High)</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="sort"
                      value="price-high"
                      checked={filters.sortBy === 'price-high'}
                      onChange={() => handleFilterChange('sortBy', 'price-high')}
                      className="w-4 h-4 text-green-600 focus:ring-green-500"
                    />
                    <span className="ml-2 text-gray-700">Price (High - Low)</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="sort"
                      value="rating"
                      checked={filters.sortBy === 'rating'}
                      onChange={() => handleFilterChange('sortBy', 'rating')}
                      className="w-4 h-4 text-green-600 focus:ring-green-500"
                    />
                    <span className="ml-2 text-gray-700">Wellness Member</span>
                  </label>
                </div>
              </div>

              {/* Locality */}
              <div>
                <h4 className="font-semibold text-gray-700 mb-3">Locality</h4>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search"
                    value={filters.locality}
                    onChange={(e) => handleFilterChange('locality', e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <h2 className="text-xl font-bold text-gray-800">
                  Search Results ({filteredHomestays.length})
                </h2>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center space-x-2 bg-white border border-gray-300 px-4 py-2 rounded-lg"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>Filters</span>
                  {getActiveFiltersCount() > 0 && (
                    <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                      {getActiveFiltersCount()}
                    </span>
                  )}
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-green-100 text-green-600' : 'text-gray-400'}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-green-100 text-green-600' : 'text-gray-400'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Homestay Listings */}
            <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
              {filteredHomestays.map((homestay) => (
                <div key={homestay.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className={`${viewMode === 'list' ? 'flex' : ''}`}>
                    <div className={`relative ${viewMode === 'list' ? 'w-80 flex-shrink-0' : 'h-48'}`}>
                      <img
                        src={homestay.thumbnailImage}
                        alt={homestay.name}
                        className="w-full h-full object-cover"
                      />
                      {homestay.discount && (
                        <div className="absolute top-4 left-4 bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold">
                          {homestay.discount}
                        </div>
                      )}
                      <div className="absolute top-4 right-4 bg-white bg-opacity-90 px-2 py-1 rounded-lg flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-semibold">{homestay.rating}</span>
                      </div>
                    </div>
                    <div className={`p-6 flex-1 ${viewMode === 'list' ? 'flex flex-col justify-between' : ''}`}>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{homestay.name}</h3>
                        <div className="flex items-center text-gray-600 mb-2">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span className="text-sm">{homestay.location}</span>
                        </div>
                        <div className="flex items-center space-x-2 mb-4">
                          <span className="text-blue-600 text-sm">Amenities</span>
                          {homestay.amenities.map((amenity, index) => (
                            <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                              {amenity}
                            </span>
                          ))}
                        </div>
                        <p className="text-gray-600 text-sm mb-4">{homestay.description}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-gray-500 line-through">₹{homestay.originalPrice}/-</span>
                            <span className="text-2xl font-bold text-gray-800">₹{homestay.discountedPrice}/-</span>
                          </div>
                          <p className="text-xs text-gray-500">+₹0 Taxes & Fees</p>
                          <p className="text-xs text-gray-500">(Price for 1 Night)</p>
                          <p className="text-xs text-gray-500">Refund as per policy</p>
                        </div>
                        <Link
                          to={`/homestay/${homestay.id}`}
                          className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                        >
                          View
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredHomestays.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🏠</div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No homestays found</h3>
                <p className="text-gray-500">Try adjusting your filters or search criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homestay;