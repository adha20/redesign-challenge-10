import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StatCard from '../ui/StatCard';

import imgImage6 from '../../assets/image6.png';
import imgImage2 from '../../assets/image2.png';
import imgImage3 from '../../assets/image3.png';
import img72 from '../../assets/rating-3.png';
import img42 from '../../assets/rating-7.png';
import img512 from '../../assets/rating-13.png';
import img282 from '../../assets/rating-15.png';
import img62 from '../../assets/rating-18.png';

export default function Hero() {
  const [heroSearch, setHeroSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (heroSearch.trim()) {
      navigate(`/search?q=${encodeURIComponent(heroSearch.trim())}`);
    } else {
      navigate('/search');
    }
  };

  return (
    <section className="relative w-full min-h-[550px] lg:min-h-[722px] bg-gradient-to-b from-dblue-start to-dblue-end flex flex-col lg:block">
      
      {/* Container Putih (Masking) yang melebar penuh dikurangi margin tipis 22.5px di kiri-kanan */}
      <div className="relative w-[calc(100%-32px)] lg:w-[calc(100%-45px)] h-[520px] lg:h-[722px] mx-auto bg-white rounded-bl-[50px] lg:rounded-bl-[150px] rounded-br-[50px] lg:rounded-br-[150px] overflow-hidden z-10 shrink-0 mt-[16px] lg:mt-0">
        
        {/* Wrapper Konten Utama 1235px agar teks & gambar tetap rapi di tengah */}
        <div className="relative w-full lg:w-[1235px] h-full mx-auto">
          
          {/* Teks & Pencarian */}
          <div className="absolute top-[30px] lg:top-[45px] left-1/2 -translate-x-1/2 flex flex-col items-center w-full z-40 px-[16px] lg:px-0">
            <div className="text-center w-full max-w-[779px] flex flex-col gap-[8px] lg:gap-[10px]">
              <h1 className="font-extrabold text-[32px] lg:text-[47px] leading-[1.2] bg-clip-text text-transparent bg-gradient-to-b from-dblue-start to-dblue-end pb-[10px] -mb-[10px]">
                Cek Rating Gim Anda!
              </h1>
              <p className="font-extralight text-[16px] lg:text-[21px] text-light-black leading-[1.2]">
                Laman resmi pengklasifikasi usia dan konten dalam Gim yang beredar di Indonesia
              </p>
            </div>

            {/* Search Bar Group */}
            <div className="mt-[24px] lg:mt-[40px] w-full max-w-[709px] h-[56px] lg:h-[67px] bg-[#f0f0f0] rounded-[222px] shadow-sm flex items-center px-[16px] lg:px-6 gap-2 hover:bg-[#e5e5e5] hover:shadow-md transition-all duration-300 focus-within:bg-white focus-within:ring-2 focus-within:ring-dblue-start focus-within:shadow-lg cursor-text">
              <input 
                type="text" 
                placeholder="Cari Gim..." 
                value={heroSearch}
                onChange={(e) => setHeroSearch(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-[16px] lg:text-[21px] font-normal text-light-black placeholder:text-light-black/50 h-full px-[8px] lg:px-4 w-full"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch();
                  }
                }}
              />
              <button onClick={handleSearch} className="w-[36px] h-[36px] lg:w-[45px] lg:h-[45px] flex items-center justify-center shrink-0 text-light-black opacity-50 cursor-pointer hover:opacity-100 transition-opacity">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[20px] h-[20px] lg:w-[24px] lg:h-[24px]">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                  <path d="M21 21l-6 -6" />
                </svg>
              </button>
            </div>
          </div>

          {/* Collage Images */}
            
          {/* Gambar Dekorasi Tengah (Image 6) */}
          <div className="absolute left-1/2 -translate-x-1/2 top-[280px] lg:top-[295px] w-[75%] lg:w-[524px] h-[180px] lg:h-[318px] rounded-[16px] lg:rounded-[36px] shadow-custom-float z-30 overflow-hidden pointer-events-auto">
            <img alt="Hero Center" className="w-full h-full object-cover" src={imgImage6} />
          </div>

          {/* Gambar Kiri Miring (Image 2) */}
          <div className="flex absolute left-[-2%] lg:left-[139px] top-[380px] lg:top-[494px] w-[55%] lg:w-[555px] h-[140px] lg:h-[354px] z-20 items-center justify-center pointer-events-none">
            <div className="flex-none -rotate-[6.75deg] w-full lg:w-auto h-full lg:h-auto">
              <div className="w-full lg:w-[524px] h-full lg:h-[295px] rounded-[16px] lg:rounded-[36px] overflow-hidden shadow-custom-float pointer-events-auto">
                <img alt="Hero Left" className="w-full h-full object-cover" src={imgImage2} />
              </div>
            </div>
          </div>

          {/* Gambar Kanan Miring (Image 3) */}
          <div className="flex absolute right-[-2%] lg:right-auto lg:left-[517px] top-[400px] lg:top-[522px] w-[55%] lg:w-[575px] h-[140px] lg:h-[400px] z-10 items-center justify-center pointer-events-none">
            <div className="flex-none rotate-[12.33deg] w-full lg:w-auto h-full lg:h-auto">
              <div className="w-full lg:w-[524px] h-full lg:h-[295px] rounded-[16px] lg:rounded-[36px] overflow-hidden shadow-custom-float pointer-events-auto">
                <img alt="Hero Right" className="w-full h-full object-cover" src={imgImage3} />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Inner Wrapper 1235px untuk Stat Cards (Di luar mask putih agar tidak terpotong) */}
      <div className="relative lg:absolute lg:top-0 lg:left-1/2 lg:-translate-x-1/2 w-full lg:w-[1235px] h-auto lg:h-[722px] pointer-events-none z-20 flex flex-col lg:block items-center gap-[16px] px-[16px] lg:px-0 py-[32px] lg:py-0">
        
        {/* Statistik Kiri Atas (+3700 Gim) */}
        <StatCard 
          className="relative lg:absolute lg:left-[28px] lg:top-[370px] z-30 pointer-events-auto w-full max-w-[340px] lg:w-auto" 
          iconSrc={img72} 
          title="+3700 Gim" 
          description="Untuk umur 3 tahun keatas (3+)" 
        />

        {/* Statistik Kiri Bawah (+10 Gim) */}
        <StatCard 
          className="relative lg:absolute lg:left-[28px] lg:top-[452px] z-30 pointer-events-auto w-full max-w-[340px] lg:w-auto" 
          iconSrc={img42} 
          title="+10 Gim" 
          description="Untuk umur 7 tahun keatas (7+)" 
        />

        {/* Statistik Kanan Atas (+2500 Gim) */}
        <StatCard 
          className="relative lg:absolute lg:left-[901px] lg:top-[341px] z-30 pointer-events-auto w-full max-w-[340px] lg:w-auto" 
          iconSrc={img512} 
          title="+2500 Gim" 
          description="Untuk umur 13 tahun keatas (13+)" 
        />

        {/* Statistik Kanan Tengah (+290 Gim) */}
        <StatCard 
          className="relative lg:absolute lg:left-[901px] lg:top-[423px] z-30 pointer-events-auto w-full max-w-[340px] lg:w-auto" 
          iconSrc={img282} 
          title="+290 Gim" 
          description="Untuk umur 15 tahun keatas (15+)" 
        />

        {/* Statistik Kanan Bawah (+1400 Gim) */}
        <StatCard 
          className="relative lg:absolute lg:left-[901px] lg:top-[505px] z-30 pointer-events-auto w-full max-w-[340px] lg:w-auto" 
          iconSrc={img62} 
          title="+1400 Gim" 
          description="Untuk umur 18 tahun keatas (18+)" 
        />
        
      </div>
    </section>
  );
}
