import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AboutUs from './components/about/AboutUs';
import SearchPage from './components/search/SearchPage';
import GameDetailPage from './components/search/GameDetailPage';
import RecommendationPage from './components/recommendation/RecommendationPage';
import RegisterGamePage from './components/register/RegisterGamePage';
import LoginPage from './components/auth/LoginPage';
import RegisterAccountPage from './components/auth/RegisterAccountPage';

import Hero from './components/home/Hero';
import RatingSection from './components/home/RatingSection';
import ClassificationSection from './components/home/ClassificationSection';
import BlogSection from './components/home/BlogSection';
import KpieSection from './components/home/KpieSection';

function App() {
  return (
    <div className="min-h-screen bg-light-white font-sans text-light-black flex flex-col">
      {/* Memanggil komponen Navbar */}
      <Navbar />
      
      {/* Area Konten Utama */}
      <main className="w-full bg-white flex-1 flex flex-col">
        <Routes>
          <Route path="/about" element={<AboutUs />} />
          <Route path="/rekomendasi" element={<RecommendationPage />} />
          <Route path="/daftar-gim" element={<RegisterGamePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/game/:id" element={<GameDetailPage />} />
          <Route path="/masuk" element={<LoginPage />} />
          <Route path="/daftar" element={<RegisterAccountPage />} />
          <Route path="/" element={
            <>
              <Hero />
              {/* Efek Transisi Gradien di bawah Hero */}
              <div className="w-full h-[250px] bg-gradient-to-b from-dblue-end to-white pointer-events-none shrink-0" />
              <RatingSection />
              <ClassificationSection />
              <BlogSection />
              <KpieSection />
            </>
          } />
        </Routes>
      </main>

      {/* Memanggil komponen Footer */}
      <Footer />
    </div>
  );
}

export default App;
