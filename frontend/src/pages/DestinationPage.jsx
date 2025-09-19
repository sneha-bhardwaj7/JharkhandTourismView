import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { MapPin, Star, Calendar, Utensils, Plane, Train, Car, Camera, Clock, Users, X } from 'lucide-react';
import { destinationsData } from '../data/destinationsData';
import jharkhandHero from '../assets/jharkhand-hero.jpg';

const DestinationPage = () => {
  const { destinationId } = useParams();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showAllImages, setShowAllImages] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);

  const destination = destinationsData[destinationId];

  if (!destination) {
    return <Navigate to="/" replace />;
  }

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
    setShowAllImages(true);
  };

  const handleStarClick = (rating) => {
    setUserRating(rating);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    console.log('Review submitted:', { rating: userRating, text: reviewText });
    setReviewText('');
    setUserRating(0);
    setShowReviewForm(false);
    alert('Thank you for your review!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-100 md:h-[500px] overflow-hidden">
        <img
          src={destination.heroImage || jharkhandHero}
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{destination.name}</h1>
            <div className="flex items-center justify-center space-x-2 text-lg">
              <Star className="w-5 h-5 fill-current text-yellow-400" />
              <span>{destination.rating}</span>
              <span>({destination.totalReviews} reviews)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">About {destination.name}</h2>
          <p className="text-gray-600 text-lg leading-relaxed">{destination.description}</p>
        </section>

        <section className="mb-12 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <MapPin className="w-6 h-6 mr-2 text-green-600" />
            Location & Address
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Location</h3>
              <p className="text-gray-600">{destination.address.location}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Nearest Airport</h3>
              <p className="text-gray-600">{destination.address.nearbyAirport}</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <Camera className="w-6 h-6 mr-2 text-green-600" />
            Gallery
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
            {destination.gallery.slice(0, 8).map((image, index) => (
              <div
                key={index}
                className="relative aspect-square cursor-pointer group overflow-hidden rounded-lg"
                onClick={() => handleImageClick(index)}
              >
                <img
                  src={image}
                  alt={`${destination.name} ${index + 1}`}
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity" />
              </div>
            ))}
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Places to Visit Nearby</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {destination.placesToVisit.map((place, index) => (
                <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700 font-medium">{place}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-12 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <Calendar className="w-6 h-6 mr-2 text-green-600" />
            Events & Festivals
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destination.events.map((event, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2">{event.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{event.description}</p>
                <div className="flex items-center text-green-600 text-sm">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{event.month}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <Utensils className="w-6 h-6 mr-2 text-green-600" />
            Popular Food & Cuisine
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {destination.popularFood.map((food, index) => (
              <div key={index} className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
                <p className="text-sm text-gray-800 font-medium">{food}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">How to Reach</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plane className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">By Air</h3>
              <p className="text-gray-600 text-sm">{destination.howToReach.byAir}</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Train className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">By Train</h3>
              <p className="text-gray-600 text-sm">{destination.howToReach.byTrain}</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="w-6 h-h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">By Road</h3>
              <p className="text-gray-600 text-sm">{destination.howToReach.byRoad}</p>
            </div>
          </div>
        </section>

        <section className="mb-12 bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <Star className="w-6 h-6 mr-2 text-yellow-500" />
              Reviews & Ratings
            </h2>
            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Write a Review
            </button>
          </div>

          <div className="flex items-center space-x-6 mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-800">{destination.rating}</div>
              <div className="flex items-center justify-center mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= Math.floor(destination.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
            <div>
              <p className="text-gray-600 flex items-center">
                <Users className="w-4 h-4 mr-1" />
                Based on {destination.totalReviews} reviews
              </p>
            </div>
          </div>

          {showReviewForm && (
            <form onSubmit={handleReviewSubmit} className="mb-6 p-4 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-4">Share Your Experience</h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Rating
                </label>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleStarClick(star)}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= userRating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300 hover:text-yellow-400'
                        } transition-colors`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Review
                </label>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  rows="4"
                  placeholder="Share your experience about this destination..."
                  required
                />
              </div>

              <div className="flex space-x-3">
                <button
                  type="submit"
                  disabled={!userRating || !reviewText.trim()}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  Submit Review
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowReviewForm(false);
                    setUserRating(0);
                    setReviewText('');
                  }}
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          <div className="space-y-4">
            <div className="border-b border-gray-200 pb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">AK</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Amit Kumar</p>
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-3 h-3 ${
                            star <= 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <span className="text-sm text-gray-500">2 months ago</span>
              </div>
              <p className="text-gray-600 text-sm">
                Amazing destination with breathtaking views! The local culture and hospitality 
                are outstanding. Highly recommend visiting during the festival season.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">PS</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Priya Sharma</p>
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-3 h-3 ${
                            star <= 5 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <span className="text-sm text-gray-500">1 month ago</span>
              </div>
              <p className="text-gray-600 text-sm">
                Perfect place for nature lovers! The food is delicious and the scenic beauty 
                is mesmerizing. Great connectivity and well-maintained facilities.
              </p>
            </div>

            <div className="pb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">RG</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Rajesh Gupta</p>
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-3 h-3 ${
                            star <= 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <span className="text-sm text-gray-500">3 weeks ago</span>
              </div>
              <p className="text-gray-600 text-sm">
                Wonderful experience with family! Kids enjoyed the wildlife and natural attractions. 
                The local guides were very knowledgeable and helpful.
              </p>
            </div>
          </div>
        </section>
      </div>

      {showAllImages && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setShowAllImages(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <X className="w-8 h-8" />
            </button>
            <img
              src={destination.gallery[selectedImageIndex]}
              alt={`${destination.name} ${selectedImageIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {destination.gallery.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`w-3 h-3 rounded-full ${
                    index === selectedImageIndex ? 'bg-white' : 'bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DestinationPage;