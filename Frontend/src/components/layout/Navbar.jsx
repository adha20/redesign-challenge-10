import React from 'react';
import logoIgrs from '../../assets/logo-igrs.png';

export default function Navbar({ className = '' }) {
  return (
    <nav className={`w-full bg-white shadow-md relative z-50 ${className}`}>
      <div className="flex h-[69px] items-center justify-between px-6 lg:px-[100px] w-full max-w-[1280px] mx-auto">
        
        {/* Bagian Kiri: Logo IGRS */}
        <div className="flex gap-[8px] items-center shrink-0 w-[136px] cursor-pointer">
          <div className="w-[60px] h-[60px] shrink-0">
            <img alt="Logo IGRS" className="w-full h-full object-cover" src={logoIgrs} />
          </div>
          <p className="bg-clip-text bg-gradient-to-b from-dblue-start to-dblue-end text-transparent font-black text-[27px] tracking-[2.7px] leading-[1.2]">
            IGRS
          </p>
        </div>

        {/* Bagian Kanan: Link Navigasi & Tombol Masuk */}
        <div className="flex items-center justify-between shrink-0 w-[783px]">
          {/* Link Navigasi */}
          <div className="flex gap-[32px] items-center font-extrabold text-[16px] leading-[1.2] whitespace-nowrap">
            <a href="#" className="bg-clip-text bg-gradient-to-b from-dblue-start to-dblue-end text-transparent hover:opacity-80 transition-opacity">
              Beranda
            </a>
            <a href="#" className="bg-clip-text bg-gradient-to-b from-dblue-start to-dblue-end text-transparent hover:opacity-80 transition-opacity">
              Rekomendasi
            </a>
            <a href="#" className="bg-clip-text bg-gradient-to-b from-dblue-start to-dblue-end text-transparent hover:opacity-80 transition-opacity">
              Daftarkan Gim
            </a>
            <a href="#" className="bg-clip-text bg-gradient-to-b from-dblue-start to-dblue-end text-transparent hover:opacity-80 transition-opacity">
              Tentang kami
            </a>
          </div>
          
          {/* Tombol Masuk */}
          <button className="bg-gradient-to-b from-dblue-start to-dblue-end flex items-center justify-center px-[40px] py-[8px] rounded-full shrink-0 hover:opacity-90 transition-opacity cursor-pointer">
            <span className="font-extrabold leading-[1.2] text-[16px] text-white whitespace-nowrap">
              Masuk
            </span>
          </button>
        </div>
        
      </div>
    </nav>
  );
}
