import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function GameDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [game, setGame] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/games`)
      .then(res => res.json())
      .then(data => {
        if (data.data && data.data.length > 0) {
          // Cari game berdasarkan ID
          const targetGame = data.data.find(g => g.id === (parseInt(id, 10) || 1));
          if (targetGame) {
            // Mapping struktur data detail gim
            const mappedGame = {
              id: targetGame.id,
              title: targetGame.title,
              publisher: targetGame.publisher,
              description: targetGame.description,
              rating: { age: targetGame.rating.name, icon: targetGame.rating.icon_url },
              klasifikasi: targetGame.classifications.map(d => ({ name: d.name, icon: d.icon_url })),
              genres: targetGame.genres.map(genre => genre.name),
              platforms: targetGame.platforms.map(p => ({ name: p.name, icon: p.icon_url })),
              coverImage: targetGame.cover_image,
              galleryImages: targetGame.gallery_images
            };
            setGame(mappedGame);
          }
        }
      })
      .catch(err => console.error("Error fetching game details:", err));
  }, [id]);

  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = game?.galleryImages || [];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleSearch = () => {
    const val = document.getElementById('detailSearch').value;
    if (val.trim()) {
      navigate(`/search?q=${encodeURIComponent(val.trim())}`);
    } else {
      navigate('/search');
    }
  };

  // Efek geser otomatis setiap 3 detik
  useEffect(() => {
    if (!game) return;
    const slideInterval = setInterval(nextSlide, 3000);
    return () => clearInterval(slideInterval);
  }, [game, nextSlide]);

  if (!game) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-white">
        <h2 className="text-[24px] text-light-black">Game tidak ditemukan.</h2>
      </div>
    );
  }

  return (
    <div className="w-full bg-white relative flex flex-col items-center pt-[30px] lg:pt-[50px] pb-[60px] lg:pb-[100px] min-h-screen overflow-hidden">
      
      {/* CSS Khusus untuk Carousel Responsif */}
      <style>{`
        .responsive-carousel {
          transform: translateX(calc(50vw - 42.5vw - ${currentSlide * 85}vw - ${currentSlide * 16}px));
        }
        @media (min-width: 1024px) {
          .responsive-carousel {
            transform: translateX(${184.5 - currentSlide * 759}px);
          }
        }
      `}</style>

      {/* Search Input Bar */}
      <div className="w-[90%] lg:w-full max-w-[709px] mx-auto h-[50px] lg:h-[67px] bg-white border border-[#f0f0f0] rounded-[222px] drop-shadow-[0px_4px_2px_rgba(0,0,0,0.15)] flex items-center justify-between px-[20px] lg:px-[50px] py-[10px] z-20">
        <input 
          id="detailSearch"
          type="text" 
          defaultValue={game.title}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          className="flex-1 bg-transparent border-none outline-none text-[16px] lg:text-[21px] text-[#1a1a1a] font-normal w-full"
        />
        <div onClick={handleSearch} className="w-[35px] h-[35px] lg:w-[45px] lg:h-[45px] rounded-full flex items-center justify-center shrink-0 hover:bg-gray-100 cursor-pointer transition-colors ml-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-light-black opacity-50 w-[20px] h-[20px] lg:w-[24px] lg:h-[24px]">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
            <path d="M21 21l-6 -6" />
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-[1080px] mx-auto mt-[40px] lg:mt-[60px] flex flex-col lg:flex-row justify-between items-center lg:items-start gap-[40px] lg:gap-0 px-[20px] lg:px-0">
        
        {/* Left Side: Game Header + Description */}
        <div className="w-full lg:w-[643px] flex flex-col gap-[24px] lg:gap-[40px] shrink-0">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row gap-[24px] lg:gap-[36px] items-center md:items-start text-center md:text-left">
            <div className="w-[100px] h-[100px] lg:w-[120px] lg:h-[120px] rounded-[24px] border-[6px] lg:border-[8px] border-[#2367ce] overflow-hidden shrink-0 shadow-sm">
              <img src={`${import.meta.env.VITE_BACKEND_URL}${game.coverImage}`} alt={`${game.title} Cover`} className="w-full h-full object-cover" />
            </div>
            {/* Padding top 32px agar teks Genshin Impact sejajar horizontal dengan teks Rating di kartu sebelah kanan */}
            <div className="flex flex-col gap-[4px] text-[#1a1a1a] pt-0 md:pt-[16px] lg:pt-[32px]">
              <h3 className="font-extrabold text-[22px] lg:text-[27px] leading-[1.2]">{game.title}</h3>
              <p className="font-normal text-[16px] lg:text-[21px] leading-[1.5]">{game.publisher}</p>
            </div>
          </div>

          {/* Description */}
          <div className="text-[14px] lg:text-[16px] text-justify leading-[1.5] text-[#1a1a1a] whitespace-pre-wrap">
            {game.description.map((paragraph, idx) => (
              <p key={idx} className={idx < game.description.length - 1 ? "mb-4" : ""}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Right Side: Floating Info Card */}
        <div className="w-full md:w-[80%] lg:w-[389px] bg-white rounded-[24px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.15)] p-[24px] lg:p-[28px] flex flex-col gap-[24px] lg:gap-[28px] shrink-0">
          
          {/* Rating */}
          <div className="w-full flex flex-col items-center lg:items-start gap-[8px] lg:gap-[12px]">
            <p className="font-normal text-[18px] lg:text-[21px] text-[#1a1a1a] leading-[1.2]">Rating</p>
            <img src={`${import.meta.env.VITE_BACKEND_URL}${game.rating.icon}`} alt={game.rating.age} className="h-[50px] lg:h-[70px] w-auto object-contain" />
          </div>

          {/* Klasifikasi */}
          <div className="w-full flex flex-col items-center lg:items-start gap-[8px] lg:gap-[12px]">
            <p className="font-normal text-[18px] lg:text-[21px] text-[#1a1a1a] leading-[1.2]">Klasifikasi</p>
            <div className="flex items-center justify-center lg:justify-start gap-[8px] lg:gap-[12px] w-full flex-wrap">
               {game.klasifikasi.map((item, idx) => (
                 <div key={idx} className="relative group flex items-center justify-center cursor-pointer">
                   <img src={`${import.meta.env.VITE_BACKEND_URL}${item.icon}`} alt={`Klasifikasi ${item.name}`} className="w-[60px] h-[60px] lg:w-[84px] lg:h-[84px] object-contain transition-transform group-hover:scale-105" />
                   
                   {/* Custom Tooltip (Speech Bubble) */}
                   <div className="absolute bottom-full mb-[8px] lg:mb-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center bg-[#f2f2f2] rounded-[24px] px-[12px] lg:px-[16px] py-[6px] lg:py-[8px] shadow-[0px_2px_4px_rgba(0,0,0,0.1)] pointer-events-none whitespace-nowrap z-30">
                     <span className="text-[#555555] text-[12px] lg:text-[14px] font-normal leading-none">
                       {item.name}
                     </span>
                     {/* Triangle Arrow pointing down */}
                     <div className="absolute top-full left-1/2 -translate-x-1/2 border-[4px] lg:border-[6px] border-transparent border-t-[#f2f2f2]"></div>
                   </div>
                 </div>
               ))}
            </div>
          </div>

          {/* Genre */}
          <div className="w-full flex flex-col items-center lg:items-start gap-[8px] lg:gap-[12px]">
            <p className="font-normal text-[18px] lg:text-[21px] text-[#1a1a1a] leading-[1.2]">Genre</p>
            <div className="flex gap-[6px] lg:gap-[8px] justify-center lg:justify-start flex-wrap w-full">
              {game.genres.map(genre => (
                <div key={genre} className="bg-white border border-[#1a1a1a] rounded-[222px] px-[12px] lg:px-[16px] py-[4px] lg:py-[6px] text-[14px] lg:text-[16px] text-[#1a1a1a] leading-none">
                  {genre}
                </div>
              ))}
            </div>
          </div>

          {/* Platform */}
          <div className="w-full flex flex-col items-center lg:items-start gap-[8px] lg:gap-[12px]">
            <p className="font-normal text-[18px] lg:text-[21px] text-[#1a1a1a] leading-[1.2]">Platform</p>
            <div className="flex gap-[8px] lg:gap-[12px] justify-center lg:justify-start items-center w-full flex-wrap">
              {game.platforms.map(platform => (
                <img key={platform.name} src={`${import.meta.env.VITE_BACKEND_URL}${platform.icon}`} alt={platform.name} className="w-[24px] h-[24px] lg:w-[28px] lg:h-[28px] object-contain" title={platform.name} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Genshin Preview Carousel */}
      <div className="w-full max-w-[1080px] mx-auto mt-[60px] lg:mt-[100px] mb-[60px] lg:mb-[100px] flex flex-col relative z-10 px-0 lg:px-0">
        <div className="w-full relative h-[250px] md:h-[350px] lg:h-[400px] overflow-hidden">
           {/* Deretan Gambar */}
           <div 
             className="responsive-carousel flex gap-[16px] lg:gap-[48px] items-center absolute top-0 left-0 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] h-full w-full"
           >
             {slides.map((src, index) => (
               <div key={index} className={`relative w-[85vw] lg:w-[711px] h-[220px] md:h-[320px] lg:h-[400px] shrink-0 bg-gray-200 transition-shadow duration-500 rounded-[8px] overflow-hidden ${currentSlide === index ? 'shadow-[0px_10px_30px_rgba(0,0,0,0.3)] z-10' : 'shadow-none z-0'}`}>
                 <img src={`${import.meta.env.VITE_BACKEND_URL}${src}`} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                 
                 {/* Play Button Overlay (Optional for Video) */}
                 {index === 0 && (
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60px] h-[60px] lg:w-[98px] lg:h-[96px] bg-white/50 rounded-full shadow-[0px_4px_4px_rgba(0,0,0,0.15)] flex items-center justify-center pointer-events-none">
                     <svg width="48" height="48" viewBox="0 0 24 24" fill="#2367ce" xmlns="http://www.w3.org/2000/svg" className="w-[30px] h-[30px] lg:w-[48px] lg:h-[48px]">
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
             className="absolute left-[10px] md:left-[40px] lg:left-[160.5px] top-1/2 -translate-y-1/2 w-[40px] h-[40px] lg:w-[80px] lg:h-[80px] rounded-full bg-white shadow-[0px_4px_8px_rgba(0,0,0,0.15)] flex items-center justify-center z-20 hover:-translate-x-[4px] lg:hover:-translate-x-[calc(50%+4px)] lg:-translate-x-1/2 transition-transform cursor-pointer"
           >
             <svg viewBox="0 0 24 24" fill="none" stroke="#2367ce" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-[20px] h-[20px] lg:w-[28px] lg:h-[28px]">
               <path d="M15 18l-6-6 6-6"/>
             </svg>
           </button>

           {/* Tombol Panah Kanan */}
           <button 
             onClick={nextSlide}
             className="absolute right-[10px] md:right-[40px] lg:right-[160.5px] top-1/2 -translate-y-1/2 w-[40px] h-[40px] lg:w-[80px] lg:h-[80px] rounded-full bg-white shadow-[0px_4px_8px_rgba(0,0,0,0.15)] flex items-center justify-center z-20 hover:translate-x-[4px] lg:hover:translate-x-[calc(50%+4px)] lg:translate-x-1/2 transition-transform cursor-pointer"
           >
             <svg viewBox="0 0 24 24" fill="none" stroke="#2367ce" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-[20px] h-[20px] lg:w-[28px] lg:h-[28px]">
               <path d="M9 18l6-6-6-6"/>
             </svg>
           </button>
        </div>
      </div>

    </div>
  );
}
