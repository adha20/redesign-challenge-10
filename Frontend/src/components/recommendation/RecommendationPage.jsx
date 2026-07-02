import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';

export default function RecommendationPage() {
  const navigate = useNavigate();
  
  const [dropdowns, setDropdowns] = useState({
    usia: false,
    genre: false,
    platform: false
  });
  
  const [selected, setSelected] = useState({
    usia: [],
    genre: [],
    platform: []
  });

  const ratingOptions = ['Usia 3+', 'Usia 7+', 'Usia 13+', 'Usia 15+', 'Usia 18+'];
  const genreOptions = ['Balapan', 'Edukasi', 'Fighting', 'Horror', 'Petualangan', 'Open World', 'Puzzle', 'Simulasi', 'RPG', 'Shooter', 'Survival'];
  const platformOptions = ['Android', 'Windows', 'iOS', 'MacOS', 'Playstation'];

  const toggleDropdown = (name) => {
    setDropdowns(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const selectOption = (category, option, isMulti = false) => {
    setSelected(prev => {
      if (isMulti) {
        const current = prev[category];
        if (current.includes(option)) {
          return { ...prev, [category]: current.filter(item => item !== option) };
        } else {
          return { ...prev, [category]: [...current, option] };
        }
      } else {
        return { ...prev, [category]: [option] };
      }
    });
    if (!isMulti) {
      setDropdowns(prev => ({ ...prev, [category]: false }));
    }
  };

  const handleSearchClick = () => {
    const params = new URLSearchParams();
    if (selected.usia.length > 0) {
      // Hilangkan awalan 'Usia ' jika ada agar sesuai dengan format di SearchPage
      const rating = selected.usia[0].replace('Usia ', '');
      params.append('rating', rating);
    }
    if (selected.genre.length > 0) {
      params.append('genre', selected.genre.join(','));
    }
    if (selected.platform.length > 0) {
      params.append('platform', selected.platform[0]);
    }
    navigate(`/search?${params.toString()}`);
  };

  const DropdownIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M5 9l7 7 7-7z" />
    </svg>
  );

  return (
    <div className="w-full bg-white relative flex flex-col items-center pt-[50px] pb-[100px] min-h-[calc(100vh-69px)]">
      
      {/* Konten Utama */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-[1080px] mx-auto">
        
        {/* Judul dan Subjudul */}
        <div className="text-center flex flex-col gap-[10px] w-full max-w-[779px]">
          <h1 className="font-extrabold text-[47px] leading-[1.2] bg-clip-text text-transparent bg-gradient-to-b from-dblue-start to-dblue-end pb-[10px] -mb-[10px]">
            Cari Kebutuhan Anda
          </h1>
          <p className="font-extralight text-[21px] text-light-black leading-[1.5]">
            Temukan rekomendasi Gim untuk anda atau orang kesayangan anda
          </p>
        </div>

        {/* Form Filter (Visual Only) */}
        <div className="mt-[60px] flex flex-col items-center gap-[32px] w-full">
          
          {/* Usia */}
          <div className="w-[709px] flex flex-col gap-[8px] relative z-30">
            <label className="text-[21px] text-light-black font-normal leading-[1.5]">Usia</label>
            <div 
              onClick={() => toggleDropdown('usia')}
              className="bg-white border border-[#f0f0f0] rounded-[222px] px-[50px] py-[10px] w-full flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors shadow-[0_6px_8px_-2px_rgba(0,0,0,0.15)] relative z-20"
            >
              <p className={`text-[21px] ${selected.usia.length === 0 ? 'opacity-50 text-[#1a1a1a]' : 'text-[#1a1a1a]'}`}>
                {selected.usia.length === 0 ? 'Pilih Usia' : selected.usia[0]}
              </p>
              <div className={`transition-transform duration-300 ${dropdowns.usia ? 'rotate-180' : ''}`}>
                <DropdownIcon />
              </div>
            </div>
            {/* Dropdown Menu */}
            <div className={`absolute top-[100px] left-0 w-full bg-[#f0f0f0] rounded-[24px] shadow-md transition-all duration-300 origin-top overflow-hidden z-10 ${dropdowns.usia ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'}`}>
              <div className="flex flex-col py-[16px]">
                {ratingOptions.map(option => (
                  <button 
                    key={option} 
                    onClick={() => selectOption('usia', option, false)}
                    className="w-full text-left px-[50px] py-[8px] text-[21px] text-[#1a1a1a] opacity-50 hover:opacity-100 hover:bg-gray-200 transition-all"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Genre */}
          <div className="w-[709px] flex flex-col gap-[8px] relative z-20">
            <label className="text-[21px] text-light-black font-normal leading-[1.5]">Genre (bisa pilih lebih dari 1)</label>
            <div 
              onClick={() => toggleDropdown('genre')}
              className="bg-white border border-[#f0f0f0] rounded-[22px] px-[50px] min-h-[52px] py-[10px] w-full flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors shadow-[0_6px_8px_-2px_rgba(0,0,0,0.15)] relative z-20"
            >
              <div className="flex gap-[12px] flex-wrap items-center w-full pr-[16px]">
                {selected.genre.length === 0 ? (
                  <p className="text-[21px] opacity-50 text-[#1a1a1a]">Pilih Genre</p>
                ) : (
                  <>
                    {selected.genre.map(g => (
                      <div 
                        key={g} 
                        className="flex items-center gap-[8px] border border-[#1a1a1a] rounded-[222px] px-[16px] py-[4px] bg-white"
                      >
                        <span className="text-[16px] text-[#1a1a1a]">{g}</span>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            selectOption('genre', g, true);
                          }}
                          className="text-[#1a1a1a] font-bold text-[16px] leading-none hover:opacity-70 flex items-center justify-center mt-[-2px]"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    <p className="text-[21px] opacity-50 text-[#1a1a1a] ml-[4px]">Pilih lainnya...</p>
                  </>
                )}
              </div>
              <div className={`transition-transform duration-300 ${dropdowns.genre ? 'rotate-180' : ''} shrink-0`}>
                <DropdownIcon />
              </div>
            </div>
            {/* Dropdown Menu */}
            <div className={`absolute top-[100px] left-0 w-full bg-[#f0f0f0] rounded-[24px] shadow-md transition-all duration-300 origin-top overflow-hidden z-10 max-h-[300px] overflow-y-auto ${dropdowns.genre ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'}`}>
              <div className="flex flex-col py-[16px]">
                {genreOptions.map(option => (
                  <button 
                    key={option} 
                    onClick={() => selectOption('genre', option, true)}
                    className={`w-full text-left px-[50px] py-[8px] text-[21px] transition-all hover:bg-gray-200 ${selected.genre.includes(option) ? 'text-dblue-start font-bold opacity-100' : 'text-[#1a1a1a] opacity-50 hover:opacity-100'}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Platform */}
          <div className="w-[709px] flex flex-col gap-[8px] relative z-10">
            <label className="text-[21px] text-light-black font-normal leading-[1.5]">Platform</label>
            <div 
              onClick={() => toggleDropdown('platform')}
              className="bg-white border border-[#f0f0f0] rounded-[222px] px-[50px] py-[10px] w-full flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors shadow-[0_6px_8px_-2px_rgba(0,0,0,0.15)] relative z-20"
            >
              <p className={`text-[21px] ${selected.platform.length === 0 ? 'opacity-50 text-[#1a1a1a]' : 'text-[#1a1a1a]'}`}>
                {selected.platform.length === 0 ? 'Pilih Platform' : selected.platform[0]}
              </p>
              <div className={`transition-transform duration-300 ${dropdowns.platform ? 'rotate-180' : ''}`}>
                <DropdownIcon />
              </div>
            </div>
            {/* Dropdown Menu */}
            <div className={`absolute top-[90px] left-0 w-full bg-[#f0f0f0] rounded-[24px] shadow-md transition-all duration-300 origin-top overflow-hidden z-10 ${dropdowns.platform ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'}`}>
              <div className="flex flex-col py-[16px]">
                {platformOptions.map(option => (
                  <button 
                    key={option} 
                    onClick={() => selectOption('platform', option, false)}
                    className="w-full text-left px-[50px] py-[8px] text-[21px] text-[#1a1a1a] opacity-50 hover:opacity-100 hover:bg-gray-200 transition-all"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Tombol Cari */}
          <div className="mt-[30px] w-[709px]">
            <Button 
              onClick={handleSearchClick}
              className="!w-full !justify-center !py-[16px] !rounded-[222px] !text-[21px] !font-bold shadow-md"
            >
              Cari
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
}
