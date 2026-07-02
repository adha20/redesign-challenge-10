import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../ui/Button';
import { getGameById } from '../../data/games';

export default function GameDetailPage() {
  const { id } = useParams();
  const game = getGameById(parseInt(id, 10) || 1); // Mengambil data game berdasarkan ID dari parameter URL

  const [currentSlide, setCurrentSlide] = useState(0);

  if (!game) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-white">
        <h2 className="text-[24px] text-light-black">Game tidak ditemukan.</h2>
      </div>
    );
  }

  const slides = game.galleryImages;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // Efek geser otomatis setiap 3 detik
  React.useEffect(() => {
    const slideInterval = setInterval(nextSlide, 3000);
    return () => clearInterval(slideInterval);
  }, [slides.length]);

  return (
    <div className="w-full bg-white relative flex flex-col items-center pt-[50px] pb-[100px] min-h-screen">
      
      {/* Search Input Bar */}
      <div className="w-full max-w-[709px] mx-auto h-[67px] bg-white border border-[#f0f0f0] rounded-[222px] drop-shadow-[0px_4px_2px_rgba(0,0,0,0.15)] flex items-center justify-between px-[50px] py-[10px] z-20">
        <input 
          type="text" 
          defaultValue={game.title}
          className="flex-1 bg-transparent border-none outline-none text-[21px] text-[#1a1a1a] font-normal"
        />
        <div className="w-[45px] h-[45px] rounded-full flex items-center justify-center shrink-0 hover:bg-gray-100 cursor-pointer transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-light-black opacity-50">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
            <path d="M21 21l-6 -6" />
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-[1080px] mx-auto mt-[60px] flex justify-between items-start">
        
        {/* Left Side: Game Header + Description */}
        <div className="w-[643px] flex flex-col gap-[40px] shrink-0">
          
          {/* Header */}
          <div className="flex gap-[36px] items-start">
            <div className="w-[120px] h-[120px] rounded-[24px] border-[8px] border-[#2367ce] overflow-hidden shrink-0 shadow-sm">
              <img src={game.coverImage} alt={`${game.title} Cover`} className="w-full h-full object-cover" />
            </div>
            {/* Padding top 32px agar teks Genshin Impact sejajar horizontal dengan teks Rating di kartu sebelah kanan */}
            <div className="flex flex-col gap-[4px] text-[#1a1a1a] pt-[32px]">
              <h3 className="font-extrabold text-[27px] leading-[1.2]">{game.title}</h3>
              <p className="font-normal text-[21px] leading-[1.5]">{game.publisher}</p>
            </div>
          </div>

          {/* Description */}
          <div className="text-[16px] text-justify leading-[1.5] text-[#1a1a1a] whitespace-pre-wrap">
            {game.description.map((paragraph, idx) => (
              <p key={idx} className={idx < game.description.length - 1 ? "mb-4" : ""}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Right Side: Floating Info Card */}
        <div className="w-[389px] bg-white rounded-[24px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.15)] p-[32px] flex flex-col gap-[32px] shrink-0">
          
          {/* Rating */}
          <div className="w-full flex flex-col items-start gap-[12px]">
            <p className="font-normal text-[21px] text-[#1a1a1a] leading-[1.2]">Rating</p>
            <img src={game.rating.icon} alt={game.rating.age} className="h-[70px] w-auto object-contain" />
          </div>

          {/* Klasifikasi */}
          <div className="w-full flex flex-col items-start gap-[12px]">
            <p className="font-normal text-[21px] text-[#1a1a1a] leading-[1.2]">Klasifikasi</p>
            <div className="flex items-center justify-start gap-[12px] w-full">
               {game.klasifikasi.map((item, idx) => (
                 <img key={idx} src={item.icon} alt={`Klasifikasi ${item.name}`} className="w-[84px] h-[84px] object-contain" title={item.name} />
               ))}
            </div>
          </div>

          {/* Genre */}
          <div className="w-full flex flex-col items-start gap-[12px]">
            <p className="font-normal text-[21px] text-[#1a1a1a] leading-[1.2]">Genre</p>
            <div className="flex gap-[8px] flex-wrap w-full">
              {game.genres.map(genre => (
                <div key={genre} className="bg-white border border-[#1a1a1a] rounded-[222px] px-[16px] py-[6px] text-[16px] text-[#1a1a1a] leading-none">
                  {genre}
                </div>
              ))}
            </div>
          </div>

          {/* Platform */}
          <div className="w-full flex flex-col items-start gap-[12px]">
            <p className="font-normal text-[21px] text-[#1a1a1a] leading-[1.2]">Platform</p>
            <div className="flex gap-[12px] items-center w-full">
              {game.platforms.map(platform => (
                <img key={platform.name} src={platform.icon} alt={platform.name} className="w-[28px] h-[28px] object-contain" title={platform.name} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Genshin Preview Carousel */}
      <div className="w-full max-w-[1080px] mx-auto mt-[100px] mb-[100px] flex flex-col relative z-10">
        <div className="w-full relative h-[400px] overflow-hidden">
           {/* Deretan Gambar */}
           <div 
             className="flex gap-[48px] items-center absolute top-0 left-0 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
             style={{ transform: `translateX(${184.5 - currentSlide * 759}px)` }}
           >
             {slides.map((src, index) => (
               <div key={index} className={`relative w-[711px] h-[400px] shrink-0 bg-gray-200 transition-shadow duration-500 rounded-[8px] overflow-hidden ${currentSlide === index ? 'shadow-[0px_10px_30px_rgba(0,0,0,0.3)] z-10' : 'shadow-none z-0'}`}>
                 <img src={src} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                 
                 {/* Play Button Overlay (Optional for Video) */}
                 {index === 0 && (
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[98px] h-[96px] bg-white/50 rounded-full shadow-[0px_4px_4px_rgba(0,0,0,0.15)] flex items-center justify-center pointer-events-none">
                     <svg width="48" height="48" viewBox="0 0 24 24" fill="#2367ce" xmlns="http://www.w3.org/2000/svg">
                       <path d="M7.4 20.3C6.7 20.7 5.8 20.2 5.8 19.3V4.7C5.8 3.8 6.7 3.3 7.4 3.7L20.2 11.1C20.9 11.5 20.9 12.5 20.2 12.9L7.4 20.3Z" />
                     </svg>
                   </div>
                 )}
               </div>
             ))}
           </div>

           {/* Tombol Panah Kiri */}
           <button 
             onClick={prevSlide}
             className="absolute left-[160.5px] top-1/2 -translate-y-1/2 -translate-x-1/2 w-[80px] h-[80px] rounded-full bg-white shadow-[0px_4px_8px_rgba(0,0,0,0.15)] flex items-center justify-center z-20 hover:-translate-x-[calc(50%+4px)] transition-transform cursor-pointer"
           >
             <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2367ce" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
               <path d="M15 18l-6-6 6-6"/>
             </svg>
           </button>

           {/* Tombol Panah Kanan */}
           <button 
             onClick={nextSlide}
             className="absolute right-[160.5px] top-1/2 -translate-y-1/2 translate-x-1/2 w-[80px] h-[80px] rounded-full bg-white shadow-[0px_4px_8px_rgba(0,0,0,0.15)] flex items-center justify-center z-20 hover:translate-x-[calc(50%+4px)] transition-transform cursor-pointer"
           >
             <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2367ce" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
               <path d="M9 18l6-6-6-6"/>
             </svg>
           </button>
        </div>
      </div>

    </div>
  );
}
