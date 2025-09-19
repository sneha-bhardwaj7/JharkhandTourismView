import React, { useState } from 'react';
import { Play, Heart, Share2, Download, X, ChevronLeft, ChevronRight } from 'lucide-react';
import galleryBg from '../assets/gallery-bg.jpg'; // Assuming you named the uploaded image file gallery_bg.png

const PhotoVideoGallery = () => {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const mediaItems = [
    {
      id: 1,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
      title: 'Mountain Landscape',
      location: 'Himalayas, India'
    },
    {
      id: 2,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop',
      title: 'Forest Trail',
      location: 'Western Ghats, India'
    },
    {
      id: 3,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=600&h=400&fit=crop',
      title: 'Tiger Portrait',
      location: 'Ranthambore National Park'
    },
    {
      id: 4,
      type: 'video',
      src: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&h=400&fit=crop',
      title: 'Temple Architecture',
      location: 'Rajasthan, India'
    },
    {
      id: 5,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
      title: 'City Lights',
      location: 'Mumbai, India'
    },
    {
      id: 6,
      type: 'video',
      src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
      title: 'Cultural Heritage',
      location: 'Delhi, India'
    },
    {
      id: 7,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&h=400&fit=crop',
      title: 'Foundation Day',
      location: 'Uttarakhand Tourism'
    },
    {
      id: 8,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
      title: 'Desert Sunset',
      location: 'Rajasthan, India'
    },
    {
      id: 9,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=600&h=400&fit=crop',
      title: 'Wildlife Safari',
      location: 'Jim Corbett National Park'
    },
    {
      id: 10,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=600&h=400&fit=crop',
      title: 'Incredible India',
      location: 'Tourism Campaign'
    },
    {
      id: 11,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&h=400&fit=crop',
      title: 'Base Camp Trek',
      location: 'Uttarakhand'
    },
    {
      id: 12,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600&h=400&fit=crop',
      title: 'Ocean Waves',
      location: 'Goa, India'
    }
  ];

  const openModal = (item, index) => {
    setSelectedMedia(item);
    setCurrentIndex(index);
  };

  const closeModal = () => {
    setSelectedMedia(null);
  };

  const navigateMedia = (direction) => {
    const newIndex = direction === 'next' 
      ? (currentIndex + 1) % mediaItems.length 
      : (currentIndex - 1 + mediaItems.length) % mediaItems.length;
    
    setCurrentIndex(newIndex);
    setSelectedMedia(mediaItems[newIndex]);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-x-0 top-0 h-48 bg-cover bg-no-repeat z-0"
        style={{ backgroundImage: `url(${galleryBg})` }}
      ></div>
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40 z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white m-4">
            Photo & Video Gallery
          </h1>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mediaItems.map((item, index) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-2xl shadow-2xl cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-3xl"
              onClick={() => openModal(item, index)}
            >
              {/* Media Container */}
              <div className="aspect-[4/3] relative overflow-hidden bg-gray-800">
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                
                {/* Play Button for Videos */}
                {item.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 transform transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white">
                      <Play className="w-8 h-8 text-gray-800 group-hover:text-white ml-1" fill="currentColor" />
                    </div>
                  </div>
                )}

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white font-bold text-lg mb-1 line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-purple-200 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {item.location}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors">
                    <Heart className="w-4 h-4 text-white" />
                  </button>
                  <button className="bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors">
                    <Share2 className="w-4 h-4 text-white" />
                  </button>
                </div>

                {/* Media Type Indicator */}
                <div className="absolute top-3 left-3">
                  {item.type === 'video' && (
                    <span className="bg-red-500 text-white px-2 py-1 rounded-md text-xs font-medium">
                      VIDEO
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="bg-green-500 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-full transform transition-all duration-300 hover:scale-105 shadow-lg">
            expore more
          </button>
        </div>
      </div>

      {/* Modal */}
      {selectedMedia && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full max-h-full">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={() => navigateMedia('prev')}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-3 text-white hover:bg-white/30 transition-all z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button
              onClick={() => navigateMedia('next')}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-3 text-white hover:bg-white/30 transition-all z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Media Content */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={selectedMedia.src}
                alt={selectedMedia.title}
                className="w-full h-auto max-h-[70vh] object-contain"
              />
              
              {/* Media Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h2 className="text-white text-2xl font-bold mb-2">
                  {selectedMedia.title}
                </h2>
                <p className="text-purple-200 text-lg">
                  {selectedMedia.location}
                </p>
                
                {/* Action Buttons */}
                <div className="flex gap-3 mt-4">
                  <button className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white hover:bg-white/30 transition-colors">
                    <Heart className="w-4 h-4" />
                    Like
                  </button>
                  <button className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white hover:bg-white/30 transition-colors">
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                  <button className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white hover:bg-white/30 transition-colors">
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoVideoGallery;