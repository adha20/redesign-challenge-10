import React from 'react';
import logoIgrs from '../../assets/logo-igrs.png';

export default function KpieSection() {
  return (
    <section className="w-full bg-white pt-[50px] pb-[100px] flex flex-col items-center">
      
      {/* Title */}
      <div className="w-[1080px] mb-[30px] flex justify-start pl-[88px]">
        <h2 className="text-[47px] font-bold leading-[1.2] bg-clip-text text-transparent bg-gradient-to-b from-[#2367ce] to-[#123468] max-w-[716px] text-left pb-[10px] -mb-[10px]">
          Klasifikasi Permainan Interaktif<br />Elektronik (KPIE)
        </h2>
      </div>

      {/* Blue Container (tanpa overflow-hidden agar logo bisa meluber keluar) */}
      <div className="w-[1080px] h-[344px] rounded-[24px] bg-gradient-to-b from-[#2367ce] to-[#123468] flex items-center relative pl-[35px] shadow-[0px_10px_30px_rgba(0,0,0,0.1)]">
        
        {/* Text Area */}
        <div className="flex flex-col gap-[36px] items-start text-white w-[633px] relative z-10">
          <p className="text-[21px] font-normal leading-[1.35] w-[621px] text-left">
            Sistem klasifikasi yang mengelompokkan permainan interaktif elektronik berdasarkan kategori usia dan deskriptor konten. Sistem ini membantu pengguna memahami tingkat kesesuaian sebuah gim sebelum dimainkan.
          </p>

          {/* Statistics */}
          <div className="flex flex-col gap-0 w-full mt-[10px]">
            <div className="flex gap-[24px] items-center">
              <p className="text-[47px] font-bold leading-[1.2]">+5000</p>
              <p className="text-[21px] font-normal leading-[1.5]">Total Gim yang Terdaftar</p>
            </div>
            <div className="flex gap-[24px] items-center">
              <p className="text-[47px] font-bold leading-[1.2]">+3000</p>
              <p className="text-[21px] font-normal leading-[1.5]">Total Penerbit Gim yang Terdaftar</p>
            </div>
          </div>
        </div>

        {/* Logo Decoration (Right Side, keluar dari kotak) */}
        <div className="absolute bottom-[-63px] right-[-69px] w-[580px] h-[580px] pointer-events-none z-0">
           <img src={logoIgrs} alt="Logo IGRS Background" className="w-full h-full object-contain opacity-100 drop-shadow-lg" />
        </div>
      </div>
    </section>
  );
}
