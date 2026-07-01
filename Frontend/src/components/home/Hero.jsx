import React from 'react';
import Button from '../ui/Button';
import StatCard from '../ui/StatCard';

import imgImage6 from '../../assets/image6.png';
import imgImage2 from '../../assets/image2.png';
import imgImage3 from '../../assets/image3.png';
import img72 from '../../assets/rating-3.png';
import img42 from '../../assets/rating-7.png';
import img512 from '../../assets/rating-13.png';
import img282 from '../../assets/rating-15.png';
import img62 from '../../assets/rating-18.png';
import imgTablerSearch from '../../assets/search-icon.svg';

export default function Hero() {
  return (
    <section className="relative w-full min-h-[722px] bg-gradient-to-b from-dblue-start to-dblue-end">
      
      {/* Container Putih (Masking) yang melebar penuh dikurangi margin tipis 22.5px di kiri-kanan */}
      <div className="relative w-[calc(100%-45px)] h-[722px] mx-auto bg-white rounded-bl-[150px] rounded-br-[150px] overflow-hidden z-10">
        
        {/* Wrapper Konten Utama 1235px agar teks & gambar tetap rapi di tengah */}
        <div className="relative w-[1235px] h-full mx-auto">
          
          {/* Teks & Pencarian */}
          <div className="absolute top-[45px] left-1/2 -translate-x-1/2 flex flex-col items-center w-full z-30">
            <div className="text-center w-full max-w-[779px] flex flex-col gap-[10px]">
              <h1 className="font-bold text-[47px] leading-[1.2] bg-clip-text text-transparent bg-gradient-to-b from-dblue-start to-dblue-end pb-[10px] -mb-[10px]">
                Cek Rating Gim Anda!
              </h1>
              <p className="font-extralight text-[21px] text-light-black leading-[1.2]">
                Laman resmi pengklasifikasi usia dan konten dalam Gim yang beredar di Indonesia
              </p>
            </div>

            {/* Search Bar Group */}
            <div className="mt-[40px] w-[709px] h-[67px] bg-[#f0f0f0] rounded-[222px] shadow-sm flex items-center px-6 gap-2 hover:bg-[#e5e5e5] hover:shadow-md transition-all duration-300 focus-within:bg-white focus-within:ring-2 focus-within:ring-dblue-start focus-within:shadow-lg cursor-text">
              <input 
                type="text" 
                placeholder="Cari Gim..." 
                className="flex-1 bg-transparent border-none outline-none text-[21px] font-normal text-light-black placeholder:text-light-black/50 h-full px-4"
              />
              <button className="w-[45px] h-[45px] flex items-center justify-center shrink-0 text-light-black opacity-50">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                  <path d="M21 21l-6 -6" />
                </svg>
              </button>
            </div>
          </div>

          {/* Gambar Dekorasi Tengah (Image 6) */}
          <div className="absolute left-[calc(50%-6.5px)] -translate-x-1/2 top-[295px] w-[524px] h-[318px] rounded-[36px] shadow-custom-float z-10 overflow-hidden">
            <img alt="Hero Center" className="w-full h-full object-cover" src={imgImage6} />
          </div>

          {/* Gambar Kiri Miring (Image 2) */}
          <div className="absolute left-[139px] top-[494px] w-[555px] h-[354px] z-20 flex items-center justify-center pointer-events-none">
            <div className="flex-none -rotate-[6.75deg]">
              <div className="w-[524px] h-[295px] rounded-[36px] overflow-hidden shadow-custom-float">
                <img alt="Hero Left" className="w-full h-full object-cover" src={imgImage2} />
              </div>
            </div>
          </div>

          {/* Gambar Kanan Miring (Image 3) */}
          <div className="absolute left-[517px] top-[522px] w-[575px] h-[400px] z-20 flex items-center justify-center pointer-events-none">
            <div className="flex-none rotate-[12.33deg]">
              <div className="w-[524px] h-[295px] rounded-[36px] overflow-hidden shadow-custom-float">
                <img alt="Hero Right" className="w-full h-full object-cover" src={imgImage3} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Inner Wrapper 1235px untuk Stat Cards (Di luar mask putih agar tidak terpotong) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1235px] h-[722px] pointer-events-none z-20">
        
        {/* Statistik Kiri Atas (+3700 Gim) */}
        <StatCard 
          className="absolute left-[28px] top-[370px] z-30 pointer-events-auto" 
          iconSrc={img72} 
          title="+3700 Gim" 
          description="Untuk umur 3 tahun keatas (3+)" 
        />

        {/* Statistik Kiri Bawah (+10 Gim) */}
        <StatCard 
          className="absolute left-[28px] top-[452px] z-30 pointer-events-auto" 
          iconSrc={img42} 
          title="+10 Gim" 
          description="Untuk umur 7 tahun keatas (7+)" 
        />

        {/* Statistik Kanan Atas (+2500 Gim) */}
        <StatCard 
          className="absolute left-[901px] top-[341px] z-30 pointer-events-auto" 
          iconSrc={img512} 
          title="+2500 Gim" 
          description="Untuk umur 13 tahun keatas (13+)" 
        />

        {/* Statistik Kanan Tengah (+290 Gim) */}
        <StatCard 
          className="absolute left-[901px] top-[423px] z-30 pointer-events-auto" 
          iconSrc={img282} 
          title="+290 Gim" 
          description="Untuk umur 15 tahun keatas (15+)" 
        />

        {/* Statistik Kanan Bawah (+1400 Gim) */}
        <StatCard 
          className="absolute left-[901px] top-[505px] z-30 pointer-events-auto" 
          iconSrc={img62} 
          title="+1400 Gim" 
          description="Untuk umur 18 tahun keatas (18+)" 
        />
        
      </div>
    </section>
  );
}
