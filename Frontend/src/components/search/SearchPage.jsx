import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from '../ui/Button';

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [games, setGames] = useState([]); // Inisialisasi kosong
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/games`)
      .then(res => res.json())
      .then(data => {
        if (data.data && data.data.length > 0) {
          // Mapping data dari backend ke state aplikasi
          const mappedGames = data.data.map(g => ({
            id: g.id,
            title: g.title,
            publisher: g.publisher,
            description: g.description,
            rating: { age: g.rating.name, icon: g.rating.icon_url },
            klasifikasi: g.classifications.map(d => ({ name: d.name, icon: d.icon_url })),
            genres: g.genres.map(genre => genre.name),
            platforms: g.platforms.map(p => ({ name: p.name, icon: p.icon_url })),
            coverImage: g.cover_image,
            galleryImages: g.gallery_images
          }));
          setGames(mappedGames);
        }
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Error fetching games:", err);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    setSearchQuery(searchParams.get('q') || '');
    
    const ratingParam = searchParams.get('rating');
    const genreParam = searchParams.get('genre');
    const platformParam = searchParams.get('platform');
    
    setSelectedFilters({
      rating: ratingParam ? ratingParam.split(',') : [],
      genre: genreParam ? genreParam.split(',') : [],
      platform: platformParam ? platformParam.split(',') : []
    });
  }, [searchParams]);
  const [dropdowns, setDropdowns] = useState({
    rating: true,
    genre: true,
    platform: true
  });
  
  const [selectedFilters, setSelectedFilters] = useState({
    rating: [],
    genre: [],
    platform: []
  });

  const ratingOptions = ['3+', '7+', '13+', '15+', '18+'];
  const genreOptions = ['Balapan', 'Edukasi', 'Fighting', 'Horror', 'Petualangan', 'Open World', 'Puzzle', 'Simulasi', 'RPG', 'Shooter', 'Survival'];
  const platformOptions = ['Android', 'Windows', 'iOS', 'MacOS', 'Playstation'];

  const toggleDropdown = (dropdownName) => {
    setDropdowns(prev => ({ ...prev, [dropdownName]: !prev[dropdownName] }));
  };

  // Menambah/menghapus opsi filter & sinkronisasi dengan URL params
  const toggleFilter = (category, option) => {
    setSelectedFilters(prev => {
      const current = prev[category];
      let newSelection;
      if (current.includes(option)) {
        newSelection = current.filter(item => item !== option);
      } else {
        newSelection = [...current, option];
      }
      
      setSearchParams(prevParams => {
        if (newSelection.length > 0) {
          prevParams.set(category === 'rating' ? 'rating' : category, newSelection.join(','));
        } else {
          prevParams.delete(category === 'rating' ? 'rating' : category);
        }
        return prevParams;
      });
      
      return { ...prev, [category]: newSelection };
    });
  };

  // Filter gabungan (Pencarian Teks + Rating + Genre + Platform)
  const filteredGames = games.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRating = selectedFilters.rating.length === 0 || selectedFilters.rating.includes(game.rating.age);
    const matchesGenre = selectedFilters.genre.length === 0 || selectedFilters.genre.some(g => game.genres.includes(g));
    const matchesPlatform = selectedFilters.platform.length === 0 || selectedFilters.platform.some(p => game.platforms.some(gamePlatform => gamePlatform.name === p));
    return matchesSearch && matchesRating && matchesGenre && matchesPlatform;
  });

  return (
    <div className="w-full bg-white relative flex flex-col items-center pt-[30px] lg:pt-[50px] pb-[60px] lg:pb-[100px] min-h-screen">
      
      {/* Search Input Bar */}
      <div className="w-[90%] lg:w-full max-w-[709px] mx-auto h-[56px] lg:h-[67px] bg-white border border-[#f0f0f0] rounded-[222px] drop-shadow-[0px_4px_2px_rgba(0,0,0,0.15)] flex items-center justify-between px-[20px] lg:px-[50px] py-[10px] z-20">
        <input 
          type="text" 
          placeholder="Cari gim favoritmu..."
          value={searchQuery}
          onChange={(e) => {
            const val = e.target.value;
            setSearchQuery(val);
            setSearchParams(prev => {
              if (val) {
                prev.set('q', val);
              } else {
                prev.delete('q');
              }
              return prev;
            });
          }}
          className="flex-1 bg-transparent border-none outline-none text-[16px] lg:text-[21px] text-[#1a1a1a] font-normal w-full"
        />
        <div className="w-[36px] h-[36px] lg:w-[45px] lg:h-[45px] rounded-full flex items-center justify-center shrink-0 hover:bg-gray-100 cursor-pointer transition-colors ml-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-light-black opacity-50 w-[20px] h-[20px] lg:w-[24px] lg:h-[24px]">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
            <path d="M21 21l-6 -6" />
          </svg>
        </div>
      </div>

      <div className="w-[90%] lg:w-full lg:max-w-[1080px] mx-auto mt-[40px] lg:mt-[80px] flex flex-col relative z-10 px-[10px] lg:px-0">
        
        {/* Kontainer atas: Kiri (Hasil) dan Kanan (Filter) */}
        <div className="w-full flex flex-col-reverse lg:flex-row justify-between items-start gap-[40px] lg:gap-0">
          
          {/* Left Side: Search Results */}
          <div className="w-full lg:w-[767px] flex flex-col gap-[16px] shrink-0">
            
            {/* Dynamic Result Cards or Skeleton */}
            {isLoading ? (
              // Skeleton Loading Animation
              Array.from({ length: 3 }).map((_, idx) => (
                <div key={idx} className="w-full bg-white rounded-[24px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.15)] flex flex-col md:flex-row items-center justify-between px-[20px] lg:px-[36px] py-[20px] animate-pulse gap-[16px] md:gap-0">
                  <div className="flex flex-col md:flex-row items-center gap-[16px] lg:gap-[36px] w-full">
                    <div className="w-[100px] h-[100px] lg:w-[120px] lg:h-[120px] rounded-[24px] bg-gray-200 shrink-0"></div>
                    <div className="flex flex-col gap-[12px] flex-1 w-full items-center md:items-start py-[10px]">
                      <div className="h-[24px] lg:h-[32px] bg-gray-200 rounded-[8px] w-[80%] md:w-3/4"></div>
                      <div className="h-[20px] lg:h-[24px] bg-gray-200 rounded-[8px] w-[50%] md:w-1/2"></div>
                    </div>
                  </div>
                  <div className="w-[60px] h-[60px] lg:w-[80px] lg:h-[80px] shrink-0 bg-gray-200 rounded-full"></div>
                </div>
              ))
            ) : filteredGames.length > 0 ? (
              filteredGames.map(game => (
                <div key={game.id} onClick={() => navigate(`/game/${game.id}`)} className="w-full bg-white rounded-[24px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.15)] flex flex-col md:flex-row items-center justify-between px-[20px] lg:px-[36px] py-[20px] hover:-translate-y-1 transition-transform cursor-pointer gap-[16px] md:gap-0">
                  <div className="flex flex-col md:flex-row items-center gap-[16px] lg:gap-[36px]">
                    <div className="w-[100px] h-[100px] lg:w-[120px] lg:h-[120px] rounded-[24px] border-[6px] lg:border-[8px] border-[#2367ce] overflow-hidden shrink-0">
                      <img src={`${import.meta.env.VITE_BACKEND_URL}${game.coverImage}`} alt={game.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col gap-[4px] text-[#1a1a1a] text-center md:text-left">
                      <h3 className="font-extrabold text-[20px] lg:text-[27px] leading-[1.2]">{game.title}</h3>
                      <p className="font-normal text-[16px] lg:text-[21px] leading-[1.5]">{game.publisher}</p>
                    </div>
                  </div>
                  <div className="w-[60px] h-[60px] lg:w-[80px] lg:h-[80px] shrink-0">
                    <img src={`${import.meta.env.VITE_BACKEND_URL}${game.rating.icon}`} alt={`Rating ${game.rating.age}`} className="w-full h-full object-contain" />
                  </div>
                </div>
              ))
            ) : (
              <div className="w-full bg-white rounded-[24px] shadow-sm flex items-center justify-center p-[40px]">
                <p className="text-[16px] lg:text-[21px] text-[#1a1a1a] font-normal text-center">Tidak ada gim yang cocok dengan pencarian Anda.</p>
              </div>
            )}

            <div className="w-full py-[10px] flex justify-center mt-[10px]">
              <p className="text-[16px] lg:text-[21px] text-[#1a1a1a] font-extralight leading-[1.2] text-center">
                {filteredGames.length > 0 ? "Anda telah mencapai akhir hasil pencarian." : ""}
              </p>
            </div>

          </div>

          {/* Right Side: Filters (akan tampil di atas hasil pencarian pada Mobile) */}
          <div className="w-full lg:w-[235px] shrink-0 flex flex-col gap-[16px]">
            
            <div className="w-full relative group z-30">
              <Button 
                onClick={() => toggleDropdown('rating')}
                className="!w-full !px-[20px] lg:!px-[24px] !py-[10px] !rounded-[16px] !bg-none !bg-white !text-[#1a1a1a] !font-normal !shadow-[0px_4px_4px_0px_rgba(0,0,0,0.15)] !justify-between items-center relative z-20" style={{ backgroundImage: 'none' }}
              >
                <span className="text-[18px] lg:text-[21px]">Rating</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none" className={`transition-transform duration-300 ${dropdowns.rating ? 'rotate-180' : ''}`}>
                  <path d="M5 9l7 7 7-7z" />
                </svg>
              </Button>
              <div className={`grid transition-all duration-300 ease-in-out ${dropdowns.rating ? 'grid-rows-[1fr] opacity-100 mt-[12px] lg:mt-[16px]' : 'grid-rows-[0fr] opacity-0 mt-0'}`}>
                <div className="overflow-hidden w-full bg-white rounded-[16px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.15)]">
                  <div className="flex flex-col py-[8px]">
                    {ratingOptions.map(option => {
                      const isSelected = selectedFilters.rating.includes(option);
                      return (
                        <button 
                          key={option} 
                          onClick={() => toggleFilter('rating', option)}
                          className="w-full px-[20px] lg:px-[24px] py-[10px] lg:py-[12px] flex items-center justify-between group hover:bg-gray-50 transition-all"
                        >
                          <span className={`text-[16px] lg:text-[21px] text-[#1a1a1a] font-normal transition-opacity ${isSelected ? 'opacity-100 text-[#2367ce]' : 'opacity-50 group-hover:opacity-100'}`}>{option}</span>
                          <div className={`w-[20px] h-[20px] rounded-full border-[2px] transition-all flex items-center justify-center ${isSelected ? 'border-[#2367ce] bg-[#2367ce]' : 'border-[#1a1a1a] opacity-30 group-hover:opacity-100'}`}>
                            {isSelected && <div className="w-[8px] h-[8px] bg-white rounded-full"></div>}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full relative group z-20">
              <Button 
                onClick={() => toggleDropdown('genre')}
                className="!w-full !px-[20px] lg:!px-[24px] !py-[10px] !rounded-[16px] !bg-none !bg-white !text-[#1a1a1a] !font-normal !shadow-[0px_4px_4px_0px_rgba(0,0,0,0.15)] !justify-between items-center relative z-20" style={{ backgroundImage: 'none' }}
              >
                <span className="text-[18px] lg:text-[21px]">Genre</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none" className={`transition-transform duration-300 ${dropdowns.genre ? 'rotate-180' : ''}`}>
                  <path d="M5 9l7 7 7-7z" />
                </svg>
              </Button>
              <div className={`grid transition-all duration-300 ease-in-out ${dropdowns.genre ? 'grid-rows-[1fr] opacity-100 mt-[12px] lg:mt-[16px]' : 'grid-rows-[0fr] opacity-0 mt-0'}`}>
                <div className="overflow-hidden w-full bg-white rounded-[16px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.15)]">
                  <div className="flex flex-col py-[8px]">
                    {genreOptions.map(option => {
                      const isSelected = selectedFilters.genre.includes(option);
                      return (
                        <button 
                          key={option} 
                          onClick={() => toggleFilter('genre', option)}
                          className="w-full px-[20px] lg:px-[24px] py-[10px] lg:py-[12px] flex items-center justify-between group hover:bg-gray-50 transition-all"
                        >
                          <span className={`text-[16px] lg:text-[21px] text-[#1a1a1a] font-normal transition-opacity ${isSelected ? 'opacity-100 text-[#2367ce]' : 'opacity-50 group-hover:opacity-100'}`}>{option}</span>
                          <div className={`w-[20px] h-[20px] rounded-full border-[2px] transition-all flex items-center justify-center ${isSelected ? 'border-[#2367ce] bg-[#2367ce]' : 'border-[#1a1a1a] opacity-30 group-hover:opacity-100'}`}>
                            {isSelected && <div className="w-[8px] h-[8px] bg-white rounded-full"></div>}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full relative group z-10">
              <Button 
                onClick={() => toggleDropdown('platform')}
                className="!w-full !px-[20px] lg:!px-[24px] !py-[10px] !rounded-[16px] !bg-none !bg-white !text-[#1a1a1a] !font-normal !shadow-[0px_4px_4px_0px_rgba(0,0,0,0.15)] !justify-between items-center relative z-20" style={{ backgroundImage: 'none' }}
              >
                <span className="text-[18px] lg:text-[21px]">Platform</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none" className={`transition-transform duration-300 ${dropdowns.platform ? 'rotate-180' : ''}`}>
                  <path d="M5 9l7 7 7-7z" />
                </svg>
              </Button>
              <div className={`grid transition-all duration-300 ease-in-out ${dropdowns.platform ? 'grid-rows-[1fr] opacity-100 mt-[12px] lg:mt-[16px]' : 'grid-rows-[0fr] opacity-0 mt-0'}`}>
                <div className="overflow-hidden w-full bg-white rounded-[16px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.15)]">
                  <div className="flex flex-col py-[8px]">
                    {platformOptions.map(option => {
                      const isSelected = selectedFilters.platform.includes(option);
                      return (
                        <button 
                          key={option} 
                          onClick={() => toggleFilter('platform', option)}
                          className="w-full px-[20px] lg:px-[24px] py-[10px] lg:py-[12px] flex items-center justify-between group hover:bg-gray-50 transition-all"
                        >
                          <span className={`text-[16px] lg:text-[21px] text-[#1a1a1a] font-normal transition-opacity ${isSelected ? 'opacity-100 text-[#2367ce]' : 'opacity-50 group-hover:opacity-100'}`}>{option}</span>
                          <div className={`w-[20px] h-[20px] rounded-full border-[2px] transition-all flex items-center justify-center ${isSelected ? 'border-[#2367ce] bg-[#2367ce]' : 'border-[#1a1a1a] opacity-30 group-hover:opacity-100'}`}>
                            {isSelected && <div className="w-[8px] h-[8px] bg-white rounded-full"></div>}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Pagination dipindah ke bawah, merespon tinggi tertinggi dari kolom kiri/kanan */}
        <div className="w-full lg:w-[767px] flex flex-col lg:flex-row items-center justify-between mt-[40px] lg:mt-[100px] gap-[20px] lg:gap-0">
          <p className="text-[16px] lg:text-[21px] text-[#1a1a1a] font-extralight leading-[1.2]">
            Menampilkan {filteredGames.length === 0 ? 0 : 1}–{Math.min(filteredGames.length, 10)} dari {filteredGames.length} data
          </p>
          <div className="flex items-center gap-[12px]">
            <button className="w-[36px] h-[36px] lg:w-[39px] lg:h-[39px] rounded-[8px] bg-gradient-to-b from-dblue-start to-dblue-end flex items-center justify-center text-white opacity-80 hover:opacity-100 cursor-not-allowed shadow-md">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="lg:w-[24px] lg:h-[24px]">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button className="w-[36px] h-[36px] lg:w-[39px] lg:h-[39px] rounded-[8px] border-[3px] border-[#2367ce] flex items-center justify-center text-[18px] lg:text-[21px] font-bold text-[#1a1a1a]">
              1
            </button>
            <button className="w-[36px] h-[36px] lg:w-[39px] lg:h-[39px] rounded-[8px] bg-gradient-to-b from-dblue-start to-dblue-end flex items-center justify-center text-white opacity-80 hover:opacity-100 cursor-not-allowed shadow-md">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="lg:w-[24px] lg:h-[24px]">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
