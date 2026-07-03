import React, { useState, useRef } from 'react';
import Button from '../ui/Button';
import iconUpload from '../../assets/icon-upload.svg';

export default function RegisterGamePage() {
  const [dropdowns, setDropdowns] = useState({
    genre: false,
    platform: false
  });
  
  const [selected, setSelected] = useState({
    genre: [],
    platform: []
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

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

  const DropdownIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M5 9l7 7 7-7z" />
    </svg>
  );

  return (
    <div className="w-full bg-white relative flex flex-col items-center pt-[30px] lg:pt-[50px] pb-[60px] lg:pb-[100px] min-h-[calc(100vh-69px)] px-[20px] lg:px-0">
      
      {/* Konten Utama */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-[1080px] mx-auto">
        
        {/* Judul dan Subjudul */}
        <div className="text-center flex flex-col gap-[8px] lg:gap-[10px] w-full max-w-[779px]">
          <h1 className="font-extrabold text-[32px] lg:text-[47px] leading-[1.2] bg-clip-text text-transparent bg-gradient-to-b from-dblue-start to-dblue-end pb-[10px] -mb-[10px]">
            Daftarkan Gim
          </h1>
          <p className="font-extralight text-[16px] lg:text-[21px] text-light-black leading-[1.5]">
            Mulai proses pendaftaran gim untuk mendapatkan klasifikasi usia sesuai dengan ketentuan IGRS.
          </p>
        </div>

        {/* Form Pendaftaran */}
        <div className="mt-[40px] lg:mt-[60px] flex flex-col items-center gap-[24px] lg:gap-[32px] w-full">
          
          {/* Nama Gim */}
          <div className="w-full lg:w-[984px] flex flex-col gap-[8px]">
            <label className="text-[16px] lg:text-[21px] text-[#1a1a1a] font-normal leading-[1.5]">
              Nama Gim <span className="text-[#ce2323]">*</span>
            </label>
            <input 
              type="text"
              placeholder="Masukkan Nama"
              className="bg-white border border-[#f0f0f0] rounded-[222px] px-[24px] lg:px-[50px] py-[10px] w-full outline-none text-[16px] lg:text-[21px] text-[#1a1a1a] placeholder:text-[#1a1a1a] placeholder:opacity-50 shadow-[0_6px_8px_-2px_rgba(0,0,0,0.15)]"
            />
          </div>

          {/* Genre */}
          <div className="w-full lg:w-[984px] flex flex-col gap-[8px] relative z-20">
            <label className="text-[16px] lg:text-[21px] text-[#1a1a1a] font-normal leading-[1.5]">
              Genre (bisa pilih lebih dari 1) <span className="text-[#ce2323]">*</span>
            </label>
            <div 
              onClick={() => toggleDropdown('genre')}
              className="bg-white border border-[#f0f0f0] rounded-[22px] px-[24px] lg:px-[50px] min-h-[48px] lg:min-h-[52px] py-[10px] w-full flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors shadow-[0_6px_8px_-2px_rgba(0,0,0,0.15)] relative z-20"
            >
              <div className="flex gap-[8px] lg:gap-[12px] flex-wrap items-center w-full pr-[16px]">
                {selected.genre.length === 0 ? (
                  <p className="text-[16px] lg:text-[21px] opacity-50 text-[#1a1a1a]">Pilih Genre</p>
                ) : (
                  <>
                    {selected.genre.map(g => (
                      <div 
                        key={g} 
                        className="flex items-center gap-[8px] border border-[#1a1a1a] rounded-[222px] px-[12px] lg:px-[16px] py-[4px] bg-white"
                      >
                        <span className="text-[14px] lg:text-[16px] text-[#1a1a1a]">{g}</span>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            selectOption('genre', g, true);
                          }}
                          className="text-[#1a1a1a] font-bold text-[14px] lg:text-[16px] leading-none hover:opacity-70 flex items-center justify-center mt-[-2px]"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    <p className="text-[16px] lg:text-[21px] opacity-50 text-[#1a1a1a] ml-[4px]">Pilih lainnya...</p>
                  </>
                )}
              </div>
              <div className={`transition-transform duration-300 ${dropdowns.genre ? 'rotate-180' : ''} shrink-0`}>
                <DropdownIcon />
              </div>
            </div>
            {/* Dropdown Menu */}
            <div className={`absolute top-[85px] lg:top-[100px] left-0 w-full bg-[#f0f0f0] rounded-[24px] shadow-md transition-all duration-300 origin-top overflow-hidden z-10 max-h-[300px] overflow-y-auto ${dropdowns.genre ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'}`}>
              <div className="flex flex-col py-[16px]">
                {genreOptions.map(option => (
                  <button 
                    key={option} 
                    onClick={() => selectOption('genre', option, true)}
                    className={`w-full text-left px-[24px] lg:px-[50px] py-[8px] text-[16px] lg:text-[21px] transition-all hover:bg-gray-200 ${selected.genre.includes(option) ? 'text-dblue-start font-bold opacity-100' : 'text-[#1a1a1a] opacity-50 hover:opacity-100'}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Platform */}
          <div className="w-full lg:w-[984px] flex flex-col gap-[8px] relative z-10">
            <label className="text-[16px] lg:text-[21px] text-[#1a1a1a] font-normal leading-[1.5]">
              Platform <span className="text-[#ce2323]">*</span>
            </label>
            <div 
              onClick={() => toggleDropdown('platform')}
              className="bg-white border border-[#f0f0f0] rounded-[222px] px-[24px] lg:px-[50px] py-[10px] w-full flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors shadow-[0_6px_8px_-2px_rgba(0,0,0,0.15)] relative z-20"
            >
              <p className={`text-[16px] lg:text-[21px] ${selected.platform.length === 0 ? 'opacity-50 text-[#1a1a1a]' : 'text-[#1a1a1a]'}`}>
                {selected.platform.length === 0 ? 'Pilih Platform' : selected.platform[0]}
              </p>
              <div className={`transition-transform duration-300 ${dropdowns.platform ? 'rotate-180' : ''}`}>
                <DropdownIcon />
              </div>
            </div>
            {/* Dropdown Menu */}
            <div className={`absolute top-[85px] lg:top-[100px] left-0 w-full bg-[#f0f0f0] rounded-[24px] shadow-md transition-all duration-300 origin-top overflow-hidden z-10 ${dropdowns.platform ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'}`}>
              <div className="flex flex-col py-[16px]">
                {platformOptions.map(option => (
                  <button 
                    key={option} 
                    onClick={() => selectOption('platform', option, false)}
                    className="w-full text-left px-[24px] lg:px-[50px] py-[8px] text-[16px] lg:text-[21px] text-[#1a1a1a] opacity-50 hover:opacity-100 hover:bg-gray-200 transition-all"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Tautan Gim */}
          <div className="w-full lg:w-[984px] flex flex-col gap-[8px]">
            <label className="text-[16px] lg:text-[21px] text-[#1a1a1a] font-normal leading-[1.5]">
              Tautan Gim / URL <span className="text-[#ce2323]">*</span>
            </label>
            <input 
              type="text"
              placeholder="Masukkan Tautan"
              className="bg-white border border-[#f0f0f0] rounded-[222px] px-[24px] lg:px-[50px] py-[10px] w-full outline-none text-[16px] lg:text-[21px] text-[#1a1a1a] placeholder:text-[#1a1a1a] placeholder:opacity-50 shadow-[0_6px_8px_-2px_rgba(0,0,0,0.15)]"
            />
          </div>

          {/* File Pendukung */}
          <div className="w-full lg:w-[984px] flex flex-col gap-[10px] mt-[10px] items-start shrink-0">
            <label className="text-[16px] lg:text-[21px] text-[#1a1a1a] font-normal leading-[1.5]">
              Foto dan Video Gim <span className="text-[#ce2323]">*</span>
            </label>
            
            <input 
              type="file" 
              className="hidden" 
              ref={fileInputRef} 
              onChange={handleFileChange}
              accept=".zip"
            />

            {!selectedFile ? (
              <>
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-gradient-to-b border border-[#ce2323] border-solid from-[#ce2323] to-[#681212] w-full md:w-[474px] px-[24px] lg:px-[40px] py-[12px] lg:py-[16px] rounded-[222px] flex items-center justify-center gap-[12px] lg:gap-[16px] text-white hover:opacity-90 hover:scale-[1.02] hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  <img src={iconUpload} alt="Upload" className="w-[24px] h-[24px] lg:w-[32px] lg:h-[32px]" />
                  <span className="font-bold text-[16px] lg:text-[21px] leading-[1.2]">Unggah File Pendukung</span>
                </button>
                <p className="text-[14px] lg:text-[16px] text-[#1a1a1a] opacity-50 font-normal mt-[4px]">
                  File yang diperbolehkan yaitu .zip dengan besar maksimal 50 MB.
                </p>
              </>
            ) : (
              <div className="flex flex-col lg:flex-row gap-[16px] lg:gap-[48px] w-full lg:items-start">
                <div className="flex flex-col gap-[10px] w-full md:w-[474px] shrink-0">
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-white border border-[#ce2323] border-solid w-full px-[24px] lg:px-[40px] py-[12px] lg:py-[16px] rounded-[222px] flex items-center justify-center gap-[12px] lg:gap-[16px] text-[#ce2323] hover:bg-gray-50 hover:scale-[1.02] hover:shadow-lg transition-all duration-300 cursor-pointer"
                  >
                    <img src={iconUpload} alt="Upload" className="w-[24px] h-[24px] lg:w-[32px] lg:h-[32px]" style={{ filter: "brightness(0) saturate(100%) invert(25%) sepia(86%) saturate(2805%) hue-rotate(347deg) brightness(87%) contrast(95%)" }} />
                    <span className="font-bold text-[16px] lg:text-[21px] leading-[1.2]">Ganti File Pendukung</span>
                  </button>
                  <p className="text-[14px] lg:text-[16px] text-[#1a1a1a] opacity-50 font-normal mt-[4px]">
                    File yang diperbolehkan yaitu .zip dengan besar maksimal 50 MB.
                  </p>
                </div>
                
                <div className="flex items-center gap-[16px] lg:mt-[16px]">
                  <p className="text-[16px] lg:text-[21px] text-[#1a1a1a] underline leading-[1.5] max-w-[200px] lg:max-w-[400px] truncate" title={selectedFile.name}>
                    {selectedFile.name}
                  </p>
                  <button onClick={handleRemoveFile} className="flex items-center justify-center cursor-pointer hover:opacity-70 transition-opacity text-light-black shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-[20px] h-[20px] lg:w-[24px] lg:h-[24px]">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="15" y1="9" x2="9" y2="15"></line>
                      <line x1="9" y1="9" x2="15" y2="15"></line>
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Tombol Daftar */}
          <div className="mt-[20px] lg:mt-[30px] w-full lg:w-[984px]">
            <Button 
              className="!w-full !justify-center !py-[12px] lg:!py-[16px] !rounded-[222px] shadow-md"
            >
              <span className="font-bold text-[16px] lg:text-[21px] leading-[1.2]">Daftar</span>
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
}
