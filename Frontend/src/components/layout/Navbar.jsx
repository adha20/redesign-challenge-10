import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoIgrs from '../../assets/logo-igrs.png';
import iconLogout from '../../assets/icon-logout.svg';
import Button from '../ui/Button';

export default function Navbar({ className = '' }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('igrs_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('igrs_user');
    window.location.href = '/';
  };

  return (
    <nav className={`w-full bg-white shadow-md sticky top-0 z-50 ${className}`}>
      <div className="flex flex-wrap lg:flex-nowrap h-auto min-h-[69px] items-center justify-between px-[16px] lg:px-[100px] w-full max-w-[1280px] mx-auto py-[12px] lg:py-0">
        
        {/* Bagian Kiri: Logo IGRS */}
        <Link 
          to="/"
          className="flex gap-[8px] items-center shrink-0 w-auto lg:w-[136px] cursor-pointer"
        >
          <div className="w-[40px] h-[40px] lg:w-[60px] lg:h-[60px] shrink-0">
            <img alt="Logo IGRS" className="w-full h-full object-cover" src={logoIgrs} />
          </div>
          <p className="bg-clip-text bg-gradient-to-b from-dblue-start to-dblue-end text-transparent font-black text-[20px] lg:text-[27px] tracking-[2px] lg:tracking-[2.7px] leading-[1.2]">
            IGRS
          </p>
        </Link>

        {/* Bagian Kanan: Link Navigasi & Tombol Masuk / Profil */}
        <div className="contents lg:flex lg:items-center lg:justify-between lg:shrink-0 lg:w-[783px]">
          {/* Link Navigasi */}
          <div className="flex gap-[16px] lg:gap-[32px] items-center font-extrabold text-[12px] lg:text-[16px] leading-[1.2] whitespace-nowrap overflow-x-auto w-full lg:w-auto order-last lg:order-none pt-[12px] lg:pt-0 no-scrollbar justify-start lg:justify-center">
            <Link to="/" className="bg-clip-text bg-gradient-to-b from-dblue-start to-dblue-end text-transparent hover:opacity-80 transition-opacity">
              Beranda
            </Link>
            <Link to="/rekomendasi" className="bg-clip-text bg-gradient-to-b from-dblue-start to-dblue-end text-transparent hover:opacity-80 transition-opacity">
              Rekomendasi
            </Link>
            <Link to="/daftar-gim" className="bg-clip-text bg-gradient-to-b from-dblue-start to-dblue-end text-transparent hover:opacity-80 transition-opacity">
              Daftarkan Gim
            </Link>
            <Link to="/about" className="bg-clip-text bg-gradient-to-b from-dblue-start to-dblue-end text-transparent hover:opacity-80 transition-opacity">
              Tentang kami
            </Link>
          </div>
          
          {/* Tombol Masuk atau Tampilan Profil */}
          {user ? (
            <div className="relative order-2 lg:order-none">
              <div 
                className="flex items-center gap-[8px] lg:gap-[12px] cursor-pointer"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span className="font-extrabold text-[14px] lg:text-[16px] text-[#2367ce] capitalize">
                  {user.company || user.name}
                </span>
                <div className="w-[36px] h-[36px] lg:w-[45px] lg:h-[45px] rounded-full overflow-hidden border-[2px] lg:border-[2.5px] border-[#2367ce] bg-[#f0f0f0] flex items-center justify-center shrink-0">
                  {user.avatar ? (
                    <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <img src={`https://ui-avatars.com/api/?name=${user.company || user.name}&background=random&color=fff&size=100`} alt="Profile" className="w-full h-full object-cover" />
                  )}
                </div>
              </div>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 top-[45px] lg:top-[60px] w-[180px] lg:w-[200px] bg-[#fdfdfd] shadow-[0_8px_16px_rgba(0,0,0,0.15)] rounded-[12px] flex flex-col overflow-hidden border border-[#f0f0f0] z-50">
                  <button className="text-left px-4 lg:px-5 py-2 lg:py-3 text-[14px] lg:text-[16px] font-light text-[#888888] hover:bg-gray-50 transition-colors">
                    Profil
                  </button>
                  <button className="text-left px-4 lg:px-5 py-2 lg:py-3 text-[14px] lg:text-[16px] font-light text-[#888888] hover:bg-gray-50 transition-colors">
                    Keamanan
                  </button>
                  <button className="text-left px-4 lg:px-5 py-2 lg:py-3 text-[14px] lg:text-[16px] font-light text-[#888888] hover:bg-gray-50 transition-colors">
                    Setelan
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="text-left px-4 lg:px-5 py-2 lg:py-3 text-[14px] lg:text-[16px] text-white bg-gradient-to-b from-[#ce2323] to-[#8b1818] flex items-center gap-2 lg:gap-3 hover:opacity-90 transition-opacity"
                  >
                    <img src={iconLogout} alt="Keluar" className="w-[20px] h-[20px] lg:w-[24px] lg:h-[24px] object-contain" />
                    Keluar
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="order-2 lg:order-none">
              <Button onClick={() => navigate('/masuk')} className="!text-[14px] lg:!text-[16px] !font-extrabold !px-[16px] lg:!px-[24px] !py-[8px] lg:!py-[12px]">
                Masuk
              </Button>
            </div>
          )}
        </div>
        
      </div>
    </nav>
  );
}
