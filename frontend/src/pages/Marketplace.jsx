"use client"

import { useState } from "react"
import { Search, Filter, Grid, List, Star, ShoppingCart, Heart, Shield, MapPin, Award, Truck } from "lucide-react"

const Marketplace = () => {
  const [viewMode, setViewMode] = useState("grid") // 'grid' or 'list'
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [priceRange, setPriceRange] = useState("all")
  const [sortBy, setSortBy] = useState("popular")
  const [showFilters, setShowFilters] = useState(false)

  const categories = [
    { id: "all", name: "All Products" },
    { id: "handicrafts", name: "Handicrafts" },
    { id: "textiles", name: "Textiles" },
    { id: "food", name: "Local Food" },
    { id: "jewelry", name: "Jewelry" },
    { id: "pottery", name: "Pottery" },
    { id: "stays", name: "Homestays" },
  ]

  const priceRanges = [
    { id: "all", name: "All Prices" },
    { id: "under-500", name: "Under ₹500" },
    { id: "500-1000", name: "₹500 - ₹1,000" },
    { id: "1000-5000", name: "₹1,000 - ₹5,000" },
    { id: "above-5000", name: "Above ₹5,000" },
  ]

  const sortOptions = [
    { id: "popular", name: "Most Popular" },
    { id: "price-low", name: "Price: Low to High" },
    { id: "price-high", name: "Price: High to Low" },
    { id: "rating", name: "Highest Rated" },
    { id: "newest", name: "Newest First" },
  ]

  const products = [
    {
      id: 1,
      name: "Traditional Dokra Art",
      category: "handicrafts",
      price: 2500,
      originalPrice: 3000,
      rating: 4.8,
      reviews: 124,
      image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&h=300&fit=crop&crop=center",
      vendor: "Ramesh Kumar",
      location: "Ranchi",
      isVerified: true,
      isFavorite: false,
      description: "Authentic brass figurine made using traditional lost-wax casting technique",
      inStock: true,
      discount: 17,
    },
    {
      id: 2,
      name: "Tussar Silk Saree",
      category: "textiles",
      price: 4500,
      originalPrice: 5500,
      rating: 4.9,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=300&fit=crop&crop=center",
      vendor: "Meera Devi",
      location: "Deoghar",
      isVerified: true,
      isFavorite: true,
      description: "Handwoven Tussar silk saree with traditional tribal motifs",
      inStock: true,
      discount: 18,
    },
    {
      id: 3,
      name: "Bamboo Handicrafts Set",
      category: "handicrafts",
      price: 800,
      originalPrice: 1000,
      rating: 4.6,
      reviews: 67,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center",
      vendor: "Tribal Craft Co-op",
      location: "Khunti",
      isVerified: true,
      isFavorite: false,
      description: "Eco-friendly bamboo products including baskets and decorative items",
      inStock: true,
      discount: 20,
    },
    {
      id: 4,
      name: "Organic Honey",
      category: "food",
      price: 450,
      originalPrice: 500,
      rating: 4.7,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?w=400&h=300&fit=crop&crop=center",
      vendor: "Forest Honey Collective",
      location: "Hazaribagh",
      isVerified: true,
      isFavorite: false,
      description: "Pure forest honey collected from tribal beekeepers",
      inStock: true,
      discount: 10,
    },
    {
      id: 5,
      name: "Silver Tribal Jewelry",
      category: "jewelry",
      price: 3200,
      originalPrice: 4000,
      rating: 4.8,
      reviews: 92,
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop&crop=center",
      vendor: "Sita Jewelry Works",
      location: "Ranchi",
      isVerified: true,
      isFavorite: false,
      description: "Handcrafted silver jewelry with traditional tribal designs",
      inStock: false,
      discount: 20,
    },
    {
      id: 6,
      name: "Clay Pottery Set",
      category: "pottery",
      price: 1200,
      originalPrice: 1500,
      rating: 4.5,
      reviews: 43,
      image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400&h=300&fit=crop&crop=center",
      vendor: "Kumhar Craft Center",
      location: "Gumla",
      isVerified: false,
      isFavorite: true,
      description: "Traditional clay pots and decorative items made by local artisans",
      inStock: true,
      discount: 20,
    },
    {
      id: 7,
      name: "Tribal Village Homestay",
      category: "stays",
      price: 1500,
      originalPrice: 2000,
      rating: 4.9,
      reviews: 78,
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop&crop=center",
      vendor: "Munda Family Homestay",
      location: "Khunti",
      isVerified: true,
      isFavorite: false,
      description: "Authentic tribal village experience with traditional meals",
      inStock: true,
      discount: 25,
      isService: true,
    },
    {
      id: 8,
      name: "Handwoven Baskets",
      category: "handicrafts",
      price: 600,
      originalPrice: 750,
      rating: 4.4,
      reviews: 34,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop&crop=center",
      vendor: "Women's Craft Collective",
      location: "Lohardaga",
      isVerified: true,
      isFavorite: false,
      description: "Colorful handwoven baskets made from natural fibers",
      inStock: true,
      discount: 20,
    },
  ]

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    const matchesPrice =
      priceRange === "all" ||
      (priceRange === "under-500" && product.price < 500) ||
      (priceRange === "500-1000" && product.price >= 500 && product.price <= 1000) ||
      (priceRange === "1000-5000" && product.price >= 1000 && product.price <= 5000) ||
      (priceRange === "above-5000" && product.price > 5000)

    return matchesSearch && matchesCategory && matchesPrice
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "newest":
        return b.id - a.id
      default:
        return b.reviews - a.reviews // Most popular by review count
    }
  })

  const toggleFavorite = (productId) => {
    console.log("Toggle favorite for product:", productId)
  }

  const addToCart = (productId) => {
    console.log("Add to cart:", productId)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Header with enhanced gradient */}
      <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-6 lg:mb-0">
              <h1 className="font-bold text-4xl lg:text-5xl text-white mb-2 tracking-tight">
                🌿 Local Marketplace
              </h1>
              <p className="text-green-100 text-lg">Discover authentic treasures from Jharkhand artisans</p>
              <div className="flex items-center space-x-6 mt-3 text-green-100 text-sm">
                <div className="flex items-center space-x-1">
                  <Shield className="w-4 h-4" />
                  <span>Verified Sellers</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Truck className="w-4 h-4" />
                  <span>Free Delivery</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Award className="w-4 h-4" />
                  <span>Authentic Products</span>
                </div>
              </div>
            </div>

            {/* Enhanced Search Bar */}
            <div className="relative max-w-md w-full">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for authentic crafts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border-0 rounded-2xl focus:ring-4 focus:ring-green-200 focus:outline-none shadow-lg text-gray-700 placeholder-gray-400 bg-white"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Enhanced Sidebar Filters */}
          <div className="lg:w-72 flex-shrink-0">
            <div className="bg-white rounded-3xl shadow-xl p-8 sticky top-6 border border-green-100">
              <div className="flex items-center justify-between mb-6 lg:hidden">
                <h3 className="text-xl font-bold text-gray-900 flex items-center">
                  <Filter className="w-5 h-5 mr-2 text-green-600" />
                  Filters
                </h3>
                <button 
                  onClick={() => setShowFilters(!showFilters)} 
                  className="p-2 text-gray-500 hover:text-green-600 rounded-lg hover:bg-green-50 transition-colors"
                >
                  <Filter className="w-5 h-5" />
                </button>
              </div>

              <div className={`space-y-8 ${showFilters ? "block" : "hidden lg:block"}`}>
                {/* Categories */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4 text-lg flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Categories
                  </h4>
                  <div className="space-y-3">
                    {categories.map((category) => (
                      <label key={category.id} className="flex items-center cursor-pointer group">
                        <input
                          type="radio"
                          name="category"
                          value={category.id}
                          checked={selectedCategory === category.id}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="w-4 h-4 text-green-600 focus:ring-green-500 focus:ring-2"
                        />
                        <span className="ml-3 text-gray-700 group-hover:text-green-600 transition-colors">
                          {category.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4 text-lg flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Price Range
                  </h4>
                  <div className="space-y-3">
                    {priceRanges.map((range) => (
                      <label key={range.id} className="flex items-center cursor-pointer group">
                        <input
                          type="radio"
                          name="priceRange"
                          value={range.id}
                          checked={priceRange === range.id}
                          onChange={(e) => setPriceRange(e.target.value)}
                          className="w-4 h-4 text-green-600 focus:ring-green-500 focus:ring-2"
                        />
                        <span className="ml-3 text-gray-700 group-hover:text-green-600 transition-colors">
                          {range.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Vendor Verification */}
                <div className="p-4 bg-green-50 rounded-2xl border border-green-200">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Shield className="w-5 h-5 text-green-600 mr-2" />
                    Quality Assurance
                  </h4>
                  <label className="flex items-center cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 text-green-600 focus:ring-green-500 focus:ring-2 rounded" />
                    <span className="ml-3 text-gray-700 text-sm">Verified Vendors Only</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Enhanced Toolbar */}
            <div className="bg-white rounded-3xl shadow-xl p-6 mb-8 border border-green-100">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <span className="text-gray-600 font-medium">
                    <span className="text-2xl font-bold text-green-600">{sortedProducts.length}</span> products found
                  </span>
                </div>

                <div className="flex items-center space-x-4">
                  {/* Sort Dropdown */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-3 border border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white text-gray-700"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </select>

                  {/* View Toggle */}
                  <div className="flex items-center border border-green-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-3 transition-all duration-200 ${
                        viewMode === "grid" 
                          ? "bg-green-600 text-white shadow-md" 
                          : "text-gray-600 hover:bg-green-50 hover:text-green-600"
                      }`}
                    >
                      <Grid className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-3 transition-all duration-200 ${
                        viewMode === "list" 
                          ? "bg-green-600 text-white shadow-md" 
                          : "text-gray-600 hover:bg-green-50 hover:text-green-600"
                      }`}
                    >
                      <List className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Products Grid/List */}
            <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" : "space-y-6"}>
              {sortedProducts.map((product) => (
                <div
                  key={product.id}
                  className={`bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-green-100 ${
                    viewMode === "list" ? "flex" : ""
                  }`}
                >
                  {/* Enhanced Product Image */}
                  <div className={`relative overflow-hidden ${viewMode === "list" ? "w-64 flex-shrink-0" : ""}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className={`object-cover transition-transform duration-300 hover:scale-110 ${
                        viewMode === "list" ? "w-full h-full" : "w-full h-50"
                      }`}
                    />
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    
                    {/* {product.discount > 0 && (
                      <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-2 rounded-xl text-sm font-bold shadow-lg">
                        {product.discount}% OFF
                      </div>
                    )} */}
                    
                    {/* <button
                      onClick={() => toggleFavorite(product.id)}
                      className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
                    >
                      <Heart
                        className={`w-5 h-5 ${product.isFavorite ? "text-red-500 fill-current" : "text-gray-400"}`}
                      />
                    </button> */}
                    
                    {/* {!product.inStock && (
                      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                        <span className="text-white font-bold text-lg bg-gray-900/80 px-4 py-2 rounded-xl">
                          Out of Stock
                        </span>
                      </div>
                    )} */}
                  </div>

                  {/* Enhanced Product Info */}
                  <div className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-bold text-xl text-gray-900 line-clamp-2 leading-tight">
                        {product.name}
                      </h3>
                      {product.isVerified && (
                        <div className="flex items-center bg-green-100 rounded-full px-2 py-1 ml-2">
                          <Shield className="w-4 h-4 text-green-600" title="Verified Vendor" />
                        </div>
                      )}
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Vendor Info */}
                    <div className="flex items-center text-sm text-gray-500 mb-4 bg-gray-50 rounded-xl p-3">
                      <span className="font-medium">by {product.vendor}</span>
                      <span className="mx-2">•</span>
                      <MapPin className="w-4 h-4 mr-1 text-green-600" />
                      <span>{product.location}</span>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center mb-4">
                      <div className="flex items-center bg-yellow-50 rounded-xl px-3 py-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="ml-1 text-sm font-bold text-yellow-700">{product.rating}</span>
                      </div>
                      <span className="text-gray-500 text-sm ml-3">({product.reviews} reviews)</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-2">
                        <span className="text-3xl font-bold text-green-600">₹{product.price}</span>
                        {product.originalPrice > product.price && (
                          <span className="text-lg text-gray-500 line-through">₹{product.originalPrice}</span>
                        )}
                      </div>
                      {product.isService && (
                        <span className="text-sm text-gray-500 bg-blue-50 px-2 py-1 rounded-lg">per night</span>
                      )}
                    </div>

                    {/* Add to Cart Button */}
                    {/* <button
                      onClick={() => addToCart(product.id)}
                      disabled={!product.inStock}
                      className={`w-full flex items-center justify-center space-x-2 py-4 px-6 rounded-2xl font-bold transition-all duration-200 transform ${
                        product.inStock
                          ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 hover:scale-105 shadow-lg hover:shadow-xl"
                          : "bg-gray-200 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      <ShoppingCart className="w-5 h-5" />
                      <span>{product.inStock ? "Add to Cart" : "Out of Stock"}</span>
                    </button> */}
                  </div>
                </div>
              ))}
            </div>

            {/* Enhanced Empty State */}
            {sortedProducts.length === 0 && (
              <div className="text-center py-16">
                <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-full w-32 h-32 mx-auto mb-6 flex items-center justify-center">
                  <Search className="w-16 h-16 text-green-600" />
                </div>
                <h3 className="font-bold text-2xl text-gray-900 mb-3">No products found</h3>
                <p className="text-gray-600 text-lg mb-6">Try adjusting your search or filter criteria</p>
                <button 
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedCategory("all")
                    setPriceRange("all")
                  }}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-2xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-200"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Marketplace