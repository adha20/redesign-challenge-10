import React from 'react';
import Button from '../ui/Button';
import logoIgrs from '../../assets/logo-igrs.svg';
import iconTwitter from '../../assets/icon-twitter.svg';
import iconFacebook from '../../assets/icon-facebook.svg';
import iconInstagram from '../../assets/icon-instagram.svg';

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-b from-[#2367ce] to-[#123468] text-white pt-[40px] pb-[40px] px-[20px] lg:px-[100px] relative overflow-hidden">
      <div className="w-full mx-auto flex flex-col lg:flex-row justify-between items-center lg:items-stretch gap-[40px] lg:gap-0 relative z-10">
        
        {/* Kiri: Logo, Deskripsi, dan Sosmed */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <div className="flex items-center gap-[16px] lg:gap-[24px] mb-[12px]">
            <img src={logoIgrs} alt="Logo IGRS" className="w-[60px] lg:w-[100px] object-contain" />
            <span className="text-[32px] lg:text-[47px] font-extrabold tracking-[6px] lg:tracking-[10px]">I G R S</span>
          </div>
          <p className="text-[14px] lg:text-[21px] leading-[1.5] font-normal mb-[20px] w-full max-w-[500px]">
            Indonesia Game Rating System (IGRS) merupakan<br className="hidden lg:block" />
            pengklasifikasian Permainan Interaktif Elektronik<br className="hidden lg:block" />
            (PIE) atau game berdasarkan konten dan<br className="hidden lg:block" />
            kelompok usia pengguna.
          </p>
          
          <p className="text-[16px] lg:text-[21px] font-bold mb-[8px]">
            Hubungi Kami
          </p>
          <div className="flex gap-[20px] lg:gap-[25px]">
            <Button href="https://twitter.com" target="_blank" rel="noopener noreferrer" variant="icon" className="!bg-none !p-0 !w-[28px] !h-[28px] lg:!w-[36px] lg:!h-[36px] shadow-none !rounded-none">
              <img src={iconTwitter} alt="Twitter" className="w-full h-full object-contain" />
            </Button>
            <Button href="https://facebook.com" target="_blank" rel="noopener noreferrer" variant="icon" className="!bg-none !p-0 !w-[28px] !h-[28px] lg:!w-[36px] lg:!h-[36px] shadow-none !rounded-none">
              <img src={iconFacebook} alt="Facebook" className="w-full h-full object-contain" />
            </Button>
            <Button href="https://instagram.com" target="_blank" rel="noopener noreferrer" variant="icon" className="!bg-none !p-0 !w-[28px] !h-[28px] lg:!w-[36px] lg:!h-[36px] shadow-none !rounded-none">
              <img src={iconInstagram} alt="Instagram" className="w-full h-full object-contain" />
            </Button>
          </div>
        </div>

        {/* Kanan: Alamat dan Tautan */}
        <div className="flex flex-col items-center lg:items-end text-center lg:text-right justify-end mt-4 lg:mt-0">
          <p className="text-[16px] lg:text-[21px] font-bold mb-[8px]">
            Alamat Kami
          </p>
          <p className="text-[14px] lg:text-[21px] font-normal leading-[1.5] mb-[20px]">
            Jl. Medan Merdeka Barat<br />
            No.9, RT.002/RW.003,<br />
            Gambir, Jakarta Pusat,<br />
            DKI Jakarta 10110
          </p>

          <p className="text-[16px] lg:text-[21px] font-bold mb-[8px] cursor-pointer hover:opacity-80">
            Syarat dan Ketentuan
          </p>
          <p className="text-[16px] lg:text-[21px] font-bold cursor-pointer hover:opacity-80">
            Kebijakan Privasi
          </p>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-[40px] lg:mt-[60px] text-center w-full text-[12px] lg:text-[16px] font-normal opacity-90 relative z-10 px-[10px] lg:px-0">
        © IGRS 2026 - Direktorat Jenderal Ekosistem Digital | Kementerian Komunikasi dan Digital RI
      </div>
    </footer>
  );
}
