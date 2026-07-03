import React from 'react';
import Button from '../ui/Button';
import logoIgrs from '../../assets/logo-igrs.png';
import imgImage11 from '../../assets/about-img-1.png';
import imgImage12 from '../../assets/about-img-2.png';
import imgImage14 from '../../assets/about-img-3.png';
import iconDownload from '../../assets/icon-download.svg';
import iconUpload from '../../assets/icon-upload.svg';

export default function AboutUs() {
  return (
    <div className="w-full bg-white relative flex flex-col items-center pb-[60px] lg:pb-[100px]">
      
      {/* Hero Section */}
      <div className="w-full relative h-[400px] lg:h-[640px] bg-gradient-to-b from-[#2367ce] to-[#123468] overflow-hidden flex flex-col items-center justify-center shrink-0">
        {/* Background faded logo */}
        <img src={logoIgrs} alt="" className="absolute left-[-50px] lg:left-[-135px] top-[calc(50%-20px)] lg:top-[calc(50%-50px)] -translate-y-1/2 opacity-10 w-[600px] lg:w-[1250px] h-[600px] lg:h-[1250px] object-cover pointer-events-none mix-blend-screen" />
        
        {/* Foreground Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center text-white -translate-y-[20px] lg:-translate-y-[40px] px-[20px]">
          <img src={logoIgrs} alt="Logo IGRS" className="w-[150px] h-[150px] lg:w-[270px] lg:h-[270px] object-contain" />
          <h1 className="font-bold text-[40px] lg:text-[61px] tracking-wide leading-[1.2] mb-[8px]">Tentang Kami</h1>
          <p className="font-normal text-[14px] lg:text-[21px] tracking-widest leading-[1.5]">INDONESIA GAME RATING SYSTEM</p>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="w-full max-w-[1080px] mx-auto mt-[60px] lg:mt-[150px] flex flex-col relative z-20 px-[20px] lg:px-0">
        
        {/* Description and Image Grid */}
        <div className="w-full flex flex-col lg:flex-row justify-between items-stretch gap-[40px] lg:gap-[80px]">
          
          {/* Left Text */}
          <div className="flex flex-col justify-between flex-1">
            <div className="flex flex-col gap-[16px]">
              <h2 className="bg-clip-text text-transparent bg-gradient-to-b from-[#2367ce] to-[#123468] font-bold text-[32px] lg:text-[47px] leading-[1.2] text-center lg:text-left">
                IGRS
              </h2>
              <p className="font-light text-[16px] lg:text-[21px] leading-[1.5] text-[#1a1a1a] text-justify">
                Indonesia Game Rating System (IGRS) merupakan layanan publik yang diselenggarakan oleh Kementerian Komunikasi dan Digital (Komdigi) untuk memberikan klasifikasi usia dan konten pada gim yang beredar di Indonesia. Melalui sistem klasifikasi yang transparan dan sesuai dengan peraturan yang berlaku, IGRS bertujuan membantu masyarakat, khususnya orang tua, dalam memilih gim yang sesuai dengan kelompok usia, sekaligus mendukung pengembang dan penerbit gim dalam memenuhi standar klasifikasi nasional.
              </p>
            </div>
            
            <div className="flex justify-center lg:justify-start">
              <Button href="https://drive.google.com/file/d/1r1o63RaGCASRWhixh--4G24_9jeGnu9p/view" target="_blank" className="!w-fit !px-[24px] lg:!px-[40px] !py-[12px] lg:!py-[16px] flex gap-[12px] lg:gap-[16px] mt-[32px] lg:mt-[48px]">
                <img src={iconDownload} alt="Download" className="w-[20px] h-[22px] lg:w-[25px] lg:h-[27px]" />
                <span className="text-[16px] lg:text-[21px]">Panduan IGRS</span>
              </Button>
            </div>
          </div>

          {/* Right Images (Collage) */}
          <div className="flex flex-col gap-[20px] shrink-0 w-full lg:w-[380px] h-[400px] lg:h-auto">
             {/* Top Row */}
             <div className="flex gap-[20px] h-[55%]">
                {/* Top Left (Ramping) */}
                <div className="w-[30%] lg:w-[110px] rounded-[24px] overflow-hidden bg-gray-100 h-full">
                   <img src={imgImage12} alt="IGRS Stage" className="w-full h-full object-cover" />
                </div>
                {/* Top Right (Persegi) */}
                <div className="flex-1 rounded-[24px] overflow-hidden bg-gray-100 h-full">
                   <img src={imgImage11} alt="Screens" className="w-full h-full object-cover" />
                </div>
             </div>
             {/* Bottom Row (Persegi Panjang) */}
             <div className="w-full flex-1 rounded-[24px] overflow-hidden bg-gray-100">
                <img src={imgImage14} alt="Speakers" className="w-full h-full object-cover" />
             </div>
          </div>
        </div>

        {/* Visi dan Misi Section */}
        <div className="w-full flex flex-col gap-[16px] mt-[80px] lg:mt-[180px] mb-[60px] lg:mb-[100px]">
          
          {/* Visi */}
          <div className="w-full bg-gradient-to-br from-[#1d5ab6] to-[#123568] rounded-[32px] shadow-lg px-[24px] lg:px-[60px] py-[24px] flex flex-col items-center text-center text-white gap-[16px]">
            <h3 className="font-bold text-[28px] lg:text-[40px] uppercase tracking-wide">VISI</h3>
            <p className="font-light text-[16px] lg:text-[21px] leading-[1.6]">
              Mewujudkan ekosistem gim di Indonesia yang aman, bertanggung jawab, dan berkelanjutan melalui sistem klasifikasi yang terpercaya, transparan, dan berorientasi pada perlindungan masyarakat.
            </p>
          </div>

          {/* Misi */}
          <div className="w-full bg-gradient-to-br from-[#1d5ab6] to-[#123568] rounded-[32px] shadow-lg px-[24px] lg:px-[60px] py-[24px] flex flex-col items-center text-white gap-[16px] lg:gap-[24px]">
            <h3 className="font-bold text-[28px] lg:text-[40px] uppercase tracking-wide">MISI</h3>
            <ol className="flex flex-col gap-[8px] font-light text-[16px] lg:text-[21px] leading-[1.6] w-full list-decimal pl-[16px] lg:pl-[24px]">
              <li className="pl-[8px]">
                Menyediakan layanan klasifikasi gim yang mudah, akurat, dan transparan sesuai dengan ketentuan yang berlaku.
              </li>
              <li className="pl-[8px]">
                Memberikan informasi klasifikasi usia dan konten sebagai acuan bagi masyarakat dalam memilih gim yang sesuai.
              </li>
              <li className="pl-[8px]">
                Mendukung pengembang dan penerbit gim dalam proses klasifikasi melalui layanan yang efisien dan akuntabel.
              </li>
              <li className="pl-[8px]">
                Meningkatkan perlindungan masyarakat, khususnya anak dan remaja, dari paparan konten gim yang tidak sesuai dengan kelompok usianya.
              </li>
              <li className="pl-[8px]">
                Mendorong pertumbuhan industri gim nasional yang bertanggung jawab dan selaras dengan nilai sosial, budaya, serta regulasi di Indonesia.
              </li>
            </ol>
          </div>
        </div>
        
        {/* Form Hubungi Kami */}
        <div className="w-full rounded-[24px] border border-[#f0f0f0] bg-white px-[20px] lg:px-[48px] py-[26px] flex flex-col gap-[24px] drop-shadow-[0px_4px_2px_rgba(0,0,0,0.15)] shadow-[inset_0px_4px_4px_0px_rgba(0,0,0,0.15)] relative">
          <h2 className="bg-clip-text text-transparent bg-gradient-to-b from-[#2367ce] to-[#123468] font-bold text-[32px] lg:text-[47px] leading-[1.2] text-center w-full shrink-0">
            Hubungi Kami
          </h2>

          <div className="flex flex-col lg:flex-row gap-[16px] lg:gap-[36px] w-full shrink-0">
            <div className="flex-1 flex flex-col gap-[8px]">
              <label className="text-[16px] lg:text-[21px] text-[#1a1a1a] leading-[1.5]">Nama<span className="text-[#ce2323]">*</span></label>
              <input type="text" placeholder="Masukkan Nama" className="w-full border border-[#f0f0f0] shadow-[0_6px_8px_-2px_rgba(0,0,0,0.15)] rounded-[222px] px-[24px] lg:px-[50px] py-[10px] text-[16px] lg:text-[21px] outline-none focus:border-[#2367ce] placeholder:opacity-50" />
            </div>
            <div className="flex-1 flex flex-col gap-[8px]">
              <label className="text-[16px] lg:text-[21px] text-[#1a1a1a] leading-[1.5]">Email<span className="text-[#ce2323]">*</span></label>
              <input type="email" placeholder="contoh@gmail.com" className="w-full border border-[#f0f0f0] shadow-[0_6px_8px_-2px_rgba(0,0,0,0.15)] rounded-[222px] px-[24px] lg:px-[50px] py-[10px] text-[16px] lg:text-[21px] outline-none focus:border-[#2367ce] placeholder:opacity-50 placeholder:underline" />
            </div>
          </div>

          <div className="w-full flex flex-col gap-[8px] shrink-0">
            <label className="text-[16px] lg:text-[21px] text-[#1a1a1a] leading-[1.5]">Subjek<span className="text-[#ce2323]">*</span></label>
            <input type="text" placeholder="Masukkan Subjek" className="w-full border border-[#f0f0f0] shadow-[0_6px_8px_-2px_rgba(0,0,0,0.15)] rounded-[222px] px-[24px] lg:px-[50px] py-[10px] text-[16px] lg:text-[21px] outline-none focus:border-[#2367ce] placeholder:opacity-50" />
          </div>

          <div className="w-full flex flex-col gap-[8px] shrink-0">
            <label className="text-[16px] lg:text-[21px] text-[#1a1a1a] leading-[1.5]">Pesan<span className="text-[#ce2323]">*</span></label>
            <input type="text" placeholder="Masukkan Pesan" className="w-full border border-[#f0f0f0] shadow-[0_6px_8px_-2px_rgba(0,0,0,0.15)] rounded-[222px] px-[24px] lg:px-[50px] py-[10px] text-[16px] lg:text-[21px] outline-none focus:border-[#2367ce] placeholder:opacity-50" />
          </div>

          <div className="w-full flex flex-col gap-[10px] shrink-0">
            <label className="text-[16px] lg:text-[21px] text-[#1a1a1a] leading-[1.5]">Lampirkan File Pendukung<span className="text-[#ce2323]">*</span></label>
            <button className="bg-gradient-to-b border border-[#ce2323] border-solid from-[#ce2323] to-[#681212] w-full md:w-[474px] px-[24px] lg:px-[40px] py-[12px] lg:py-[16px] rounded-[222px] flex items-center justify-center gap-[12px] lg:gap-[16px] text-white hover:opacity-90 hover:scale-[1.02] hover:shadow-lg transition-all duration-300 cursor-pointer">
              <img src={iconUpload} alt="Upload" className="w-[24px] h-[24px] lg:w-[32px] lg:h-[32px]" />
              <span className="font-bold text-[16px] lg:text-[21px] leading-[1.2]">Unggah File Pendukung</span>
            </button>
            <p className="text-[14px] lg:text-[16px] text-[#1a1a1a] opacity-50 leading-[1.2]">File yang diperbolehkan yaitu png, jpg, jpeg, pdf. Maksimal 2MB</p>
          </div>

          <button className="bg-gradient-to-b from-[#2367ce] to-[#123468] flex items-center justify-center px-[24px] lg:px-[40px] py-[12px] lg:py-[16px] rounded-[222px] w-full shrink-0 mt-0 lg:mt-[-8px] hover:opacity-90 hover:scale-[1.01] hover:shadow-lg transition-all duration-300 cursor-pointer">
            <span className="font-bold text-[16px] lg:text-[21px] leading-[1.2] text-white">Kirim</span>
          </button>

        </div>

      </div>
    </div>
  );
}
