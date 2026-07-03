import React from 'react';
import logoIgrs from '../../assets/logo-igrs.png';

export default function KpieSection() {
  return (
    <section className="w-full bg-white pt-[30px] lg:pt-[50px] pb-[60px] lg:pb-[100px] flex flex-col items-center">
      
      {/* Title */}
      <div className="w-full max-w-[1080px] mb-[20px] lg:mb-[30px] flex justify-start px-[20px] lg:pl-[88px] lg:pr-0">
        <h2 className="text-[32px] lg:text-[47px] font-bold leading-[1.2] bg-clip-text text-transparent bg-gradient-to-b from-[#2367ce] to-[#123468] max-w-[716px] text-left pb-[10px] -mb-[10px]">
          Klasifikasi Permainan Interaktif<br className="hidden lg:block" />Elektronik (KPIE)
        </h2>
      </div>

      {/* Blue Container */}
      <div className="w-[90%] lg:w-[1080px] h-auto lg:h-[344px] py-[40px] lg:py-0 rounded-[24px] bg-gradient-to-b from-[#2367ce] to-[#123468] flex items-center relative px-[20px] lg:px-0 lg:pl-[35px] shadow-[0px_10px_30px_rgba(0,0,0,0.1)] overflow-hidden lg:overflow-visible">
        
        {/* Text Area */}
        <div className="flex flex-col gap-[20px] lg:gap-[36px] items-start text-white w-full lg:w-[633px] relative z-10">
          <p className="text-[16px] lg:text-[21px] font-normal leading-[1.35] w-full lg:w-[621px] text-left">
            Sistem klasifikasi yang mengelompokkan permainan interaktif elektronik berdasarkan kategori usia dan deskriptor konten. Sistem ini membantu pengguna memahami tingkat kesesuaian sebuah gim sebelum dimainkan.
          </p>

          {/* Statistics */}
          <div className="flex flex-col gap-[12px] lg:gap-0 w-full mt-[10px]">
            <div className="flex flex-col lg:flex-row gap-[4px] lg:gap-[24px] items-start lg:items-center">
              <p className="text-[32px] lg:text-[47px] font-bold leading-[1.2]">+5000</p>
              <p className="text-[14px] lg:text-[21px] font-normal leading-[1.5]">Total Gim yang Terdaftar</p>
            </div>
            <div className="flex flex-col lg:flex-row gap-[4px] lg:gap-[24px] items-start lg:items-center">
              <p className="text-[32px] lg:text-[47px] font-bold leading-[1.2]">+3000</p>
              <p className="text-[14px] lg:text-[21px] font-normal leading-[1.5]">Total Penerbit Gim yang Terdaftar</p>
            </div>
          </div>
        </div>

        {/* Logo Decoration (Right Side, keluar dari kotak pada desktop) */}
        <div className="absolute bottom-[-20px] right-[-20px] lg:bottom-[-63px] lg:right-[-69px] w-[200px] h-[200px] lg:w-[580px] lg:h-[580px] pointer-events-none z-0 opacity-20 lg:opacity-100">
           <img src={logoIgrs} alt="Logo IGRS Background" className="w-full h-full object-contain drop-shadow-lg" />
        </div>
      </div>
    </section>
  );
}
