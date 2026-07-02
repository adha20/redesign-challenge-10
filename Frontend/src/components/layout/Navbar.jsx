import React from 'react';
import { Link } from 'react-router-dom';
import logoIgrs from '../../assets/logo-igrs.png';
import Button from '../ui/Button';

export default function Navbar({ className = '' }) {
  return (
    <nav className={`w-full bg-white shadow-md sticky top-0 z-50 ${className}`}>
      <div className="flex h-[69px] items-center justify-between px-6 lg:px-[100px] w-full max-w-[1280px] mx-auto">
        
        {/* Bagian Kiri: Logo IGRS */}
        <Link 
          to="/"
          className="flex gap-[8px] items-center shrink-0 w-[136px] cursor-pointer"
        >
          <div className="w-[60px] h-[60px] shrink-0">
            <img alt="Logo IGRS" className="w-full h-full object-cover" src={logoIgrs} />
          </div>
          <p className="bg-clip-text bg-gradient-to-b from-dblue-start to-dblue-end text-transparent font-black text-[27px] tracking-[2.7px] leading-[1.2]">
            IGRS
          </p>
        </Link>

        {/* Bagian Kanan: Link Navigasi & Tombol Masuk */}
        <div className="flex items-center justify-between shrink-0 w-[783px]">
          {/* Link Navigasi */}
          <div className="flex gap-[32px] items-center font-extrabold text-[16px] leading-[1.2] whitespace-nowrap">
            <Link to="/" className="bg-clip-text bg-gradient-to-b from-dblue-start to-dblue-end text-transparent hover:opacity-80 transition-opacity">
              Beranda
            </Link>
            <a href="#" onClick={(e) => e.preventDefault()} className="bg-clip-text bg-gradient-to-b from-dblue-start to-dblue-end text-transparent hover:opacity-80 transition-opacity">
              Rekomendasi
            </a>
            <a href="#" onClick={(e) => e.preventDefault()} className="bg-clip-text bg-gradient-to-b from-dblue-start to-dblue-end text-transparent hover:opacity-80 transition-opacity">
              Daftarkan Gim
            </a>
            <Link to="/about" className="bg-clip-text bg-gradient-to-b from-dblue-start to-dblue-end text-transparent hover:opacity-80 transition-opacity">
              Tentang kami
            </Link>
          </div>
          
          {/* Tombol Masuk */}
          <Button className="!text-[16px] !font-extrabold">
            Masuk
          </Button>
        </div>
        
      </div>
    </nav>
  );
}
