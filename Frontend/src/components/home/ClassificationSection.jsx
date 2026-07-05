import React, { useState, useEffect } from 'react';
import SectionHeader from '../ui/SectionHeader';
import SliderNavButton from '../ui/SliderNavButton';
import ClassificationCard from '../ui/ClassificationCard';
import { useInfiniteSlider } from '../../hooks/useInfiniteSlider';

export default function ClassificationSection() {
  const [classifications, setClassifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/meta/classifications`)
      .then(res => res.json())
      .then(data => {
        if (data.data && data.data.length > 0) {
          const mappedClassifications = data.data.map(c => ({
            id: c.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
            title: c.name,
            desc: c.description,
            img: c.icon_url
          }));
          setClassifications(mappedClassifications);
        }
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Error fetching classifications:", err);
        setIsLoading(false);
      });
  }, []);

  const {
    scrollRef,
    activeIndex,
    scrollLeft,
    scrollRight,
    scrollTo,
    handleScrollEvent,
    extendedItems
  } = useInfiniteSlider(classifications);

  return (
    <section className="w-full bg-white pt-[30px] lg:pt-[50px] pb-[60px] lg:pb-[100px] flex flex-col items-center relative overflow-hidden">
      
      <SectionHeader 
        title="Pahami Tanda Klasifikasi Konten" 
        subtitle="Kenali arti setiap tanda klasifikasi konten untuk membantu Anda memahami unsur yang terdapat dalam gim sebelum memainkannya" 
      />

      {/* Slider Container Wrapper */}
      <div className="relative mt-[30px] lg:mt-[60px] w-full">
        
        <SliderNavButton direction="left" onClick={scrollLeft} />
        <SliderNavButton direction="right" onClick={scrollRight} />

        {/* Scrollable Area */}
        <div 
          ref={scrollRef}
          onScroll={handleScrollEvent}
          className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-[16px] lg:gap-[78px] px-[20px] lg:px-[calc(50%-495.5px)] pt-[4px] pb-[10px]"
        >
          {isLoading ? (
            Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="flex-none snap-center w-[85vw] lg:w-[991px] h-auto lg:h-[238px] rounded-[16px] bg-white border border-gray-100 shadow-[inset_0px_4px_6px_rgba(0,0,0,0.15),0px_4px_4px_rgba(0,0,0,0.05)] flex flex-col lg:flex-row gap-[16px] lg:gap-[14px] items-center lg:items-start px-[20px] lg:px-[36px] py-[24px] lg:py-[36px] animate-pulse">
                <div className="relative shrink-0 w-[100px] h-[100px] lg:w-[166px] lg:h-[166px] bg-gray-200 rounded-[20px]"></div>
                <div className="flex flex-col gap-[16px] flex-1 w-full lg:pl-[20px]">
                  <div className="h-[28px] lg:h-[40px] bg-gray-200 rounded-[8px] w-full max-w-[300px] mx-auto"></div>
                  <div className="flex flex-col gap-[8px] w-full">
                    <div className="h-[16px] lg:h-[20px] bg-gray-200 rounded-[8px] w-full max-w-[779px] mx-auto"></div>
                    <div className="h-[16px] lg:h-[20px] bg-gray-200 rounded-[8px] w-[90%] max-w-[779px] mx-auto"></div>
                    <div className="h-[16px] lg:h-[20px] bg-gray-200 rounded-[8px] w-[70%] max-w-[779px] mx-auto"></div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            extendedItems.map((item) => (
              <ClassificationCard 
                key={item.uniqueId} 
                title={item.title} 
                desc={item.desc} 
                img={item.img} 
              />
            ))
          )}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-[20px] px-[20px] flex-wrap">
          {classifications.map((_, index) => (
            <button 
              key={index}
              onClick={() => scrollTo(index)}
              className={`w-[10px] h-[10px] lg:w-[12px] lg:h-[12px] rounded-full transition-colors ${activeIndex === index ? 'bg-[#981b1b]' : 'bg-gray-100'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

      </div>

      {/* Description Text */}
      <p className="mt-[30px] lg:mt-[50px] text-[16px] lg:text-[21px] font-normal text-light-black leading-[1.5] text-center max-w-[1080px] px-[20px] lg:px-4">
        Setiap gim memiliki karakteristik konten yang berbeda. Melalui klasifikasi konten, pengguna dapat memahami unsur-unsur yang terdapat dalam gim sebagai dasar penentuan kategori usia yang sesuai.
      </p>

    </section>
  );
}
