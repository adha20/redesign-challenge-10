import React from 'react';
import Button from '../ui/Button';
import logoIgrs from '../../assets/logo-igrs.png';
import iconTwitter from '../../assets/icon-twitter.svg';
import iconFacebook from '../../assets/icon-facebook.svg';
import iconInstagram from '../../assets/icon-instagram.svg';

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-b from-[#2367ce] to-[#123468] text-white pt-[40px] pb-[40px] px-[100px] relative overflow-hidden">
      <div className="w-full mx-auto flex justify-between items-stretch relative z-10">
        
        {/* Kiri: Logo, Deskripsi, dan Sosmed */}
        <div className="flex flex-col">
          <div className="flex items-center gap-[24px] mb-[12px]">
            <img src={logoIgrs} alt="Logo IGRS" className="w-[100px] object-contain" />
            <span className="text-[47px] font-extrabold tracking-[10px]">I G R S</span>
          </div>
          <p className="text-[21px] leading-[1.5] font-normal mb-[20px] w-[500px]">
            Indonesia Game Rating System (IGRS) merupakan<br />
            pengklasifikasian Permainan Interaktif Elektronik<br />
            (PIE) atau game berdasarkan konten dan<br />
            kelompok usia pengguna.
          </p>
          
          <p className="text-[21px] font-bold mb-[8px]">
            Hubungi Kami
          </p>
          <div className="flex gap-[25px]">
            <Button href="https://twitter.com" target="_blank" rel="noopener noreferrer" variant="icon" className="!bg-none !p-0 !w-[36px] !h-[36px] shadow-none !rounded-none">
              <img src={iconTwitter} alt="Twitter" className="w-full h-full object-contain" />
            </Button>
            <Button href="https://facebook.com" target="_blank" rel="noopener noreferrer" variant="icon" className="!bg-none !p-0 !w-[36px] !h-[36px] shadow-none !rounded-none">
              <img src={iconFacebook} alt="Facebook" className="w-full h-full object-contain" />
            </Button>
            <Button href="https://instagram.com" target="_blank" rel="noopener noreferrer" variant="icon" className="!bg-none !p-0 !w-[36px] !h-[36px] shadow-none !rounded-none">
              <img src={iconInstagram} alt="Instagram" className="w-full h-full object-contain" />
            </Button>
          </div>
        </div>

        {/* Kanan: Alamat dan Tautan */}
        <div className="flex flex-col items-end text-right justify-end">
          <p className="text-[21px] font-bold mb-[8px]">
            Alamat Kami
          </p>
          <p className="text-[21px] font-normal leading-[1.5] mb-[20px]">
            Jl. Medan Merdeka Barat<br />
            No.9, RT.002/RW.003,<br />
            Gambir, Jakarta Pusat,<br />
            DKI Jakarta 10110
          </p>

          <p className="text-[21px] font-bold mb-[8px] cursor-pointer hover:opacity-80">
            Syarat dan Ketentuan
          </p>
          <p className="text-[21px] font-bold cursor-pointer hover:opacity-80">
            Kebijakan Privasi
          </p>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-[60px] text-center w-full text-[16px] font-normal opacity-90 relative z-10">
        © IGRS 2026 - Direktorat Jenderal Ekosistem Digital | Kementerian Komunikasi dan Digital RI
      </div>
    </footer>
  );
}
