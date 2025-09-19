import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, ArrowRight } from 'lucide-react';
import { destinationsData } from '../data/destinationsData';
import destinationBackground from "../assets/destination6.jpg";

const ExplorePage = () => {
  const destinations = Object.values(destinationsData);

  return (
    <div 
      className="min-h-screen py-12" 
      style={{
        backgroundImage: `url(${destinationBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Explore Jharkhand
          </h1>
          <p className="text-lg max-w-3xl mx-auto">
            Discover the hidden gems, rich culture, and natural beauty of Jharkhand. 
            From bustling cities to serene hill stations, experience the diversity 
            that makes Jharkhand truly unique.
          </p>
        </div>

        {/* Destinations Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination) => (
            <Link
              key={destination.id}
              to={`/explore/${destination.id}`}
              className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={destination.heroImage}
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {destination.name}
                  </h3>
                  <div className="flex items-center text-white/90">
                    <Star className="w-4 h-4 fill-current text-yellow-400 mr-1" />
                    <span className="text-sm">{destination.rating}</span>
                    <span className="text-sm ml-1">({destination.totalReviews} reviews)</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {destination.description.substring(0, 150)}...
                </p>
                
                <div className="flex items-center text-gray-500 text-sm mb-4">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{destination.address.location.split(',')[0]}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    {destination.placesToVisit.length} attractions
                  </div>
                  <div className="flex items-center text-green-600 font-medium group-hover:text-green-700">
                    <span className="text-sm mr-1">Explore</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Call to Action Section */}
        <div className="mt-16 bg-green-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Plan Your Perfect Jharkhand Adventure
          </h2>
          <p className="text-lg mb-6 opacity-90">
            Need help planning your trip? Our local experts are here to help you 
            create unforgettable memories.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/homestay"
              className="bg-white text-green-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Find Homestays
            </Link>
            <Link
              to="/apply"
              className="border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-green-600 transition-colors"
            >
              Get Travel Guide
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;