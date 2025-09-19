import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import DestinationPage from './pages/DestinationPage';
import ExplorePage from './pages/ExplorePage';
import Marketplace from './pages/Marketplace';
import Gallery from './pages/JharkhandGallery';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/explore" element={<ExplorePage />} />
            {/* This is the key route for the explore cards */}
            <Route path="/explore/:destinationId" element={<DestinationPage />} />
            <Route path="/category/:categoryId" element={<CategoryPage />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/gallery" element={<Gallery />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;