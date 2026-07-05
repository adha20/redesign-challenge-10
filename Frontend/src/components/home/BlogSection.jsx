import React, { useState, useEffect } from 'react';
import Button from '../ui/Button';

export default function BlogSection() {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/blogs`)
      .then(res => res.json())
      .then(data => {
        if (data.data && data.data.length > 0) {
          setBlogs(data.data);
        }
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Error fetching blogs:", err);
        setIsLoading(false);
      });
  }, []);

  return (
    <section className="w-full bg-white pt-[30px] lg:pt-[50px] pb-[60px] lg:pb-[100px] flex flex-col items-center relative z-0">
      
      {/* Title & Subtitle */}
      <div className="flex flex-col gap-[8px] lg:gap-[10px] items-center text-center px-[16px] lg:px-4 max-w-[779px] mx-auto w-full z-10">
        <h2 className="text-[32px] lg:text-[47px] font-extrabold leading-[1.2] bg-clip-text text-transparent bg-gradient-to-b from-[#2367ce] to-[#123468] pb-[10px] -mb-[10px]">
          Blog Harian IGRS
        </h2>
        <p className="text-[16px] lg:text-[21px] font-extralight text-light-black">
          Temukan informasi dan berita terbaru seputar Gim di Indonesia
        </p>
      </div>

      {/* Blog List Wrapper */}
      <div className="relative mt-[30px] lg:mt-[60px] flex flex-col items-center justify-center gap-[30px] lg:gap-[50px] w-full lg:w-[1080px] px-[20px] lg:px-0 z-10">
        
        {/* List Blog */}
        {isLoading ? (
          Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className="flex flex-col lg:flex-row gap-[16px] lg:gap-[40px] items-center lg:items-center justify-center w-full animate-pulse">
              <div className="w-[90%] lg:w-[260px] aspect-video lg:aspect-auto lg:h-[146px] rounded-[16px] border-[5px] border-gray-200 bg-gray-200 shrink-0 shadow-[0px_15px_30px_0px_rgba(0,0,0,0.2)]"></div>
              <div className="flex flex-col gap-[12px] lg:gap-[16px] w-[90%] lg:w-[603px]">
                <div className="h-[20px] lg:h-[24px] bg-gray-200 rounded-[8px] w-3/4 mx-auto lg:mx-0"></div>
                <div className="flex flex-col gap-[8px]">
                  <div className="h-[14px] lg:h-[20px] bg-gray-200 rounded-[8px] w-full"></div>
                  <div className="h-[14px] lg:h-[20px] bg-gray-200 rounded-[8px] w-[90%] mx-auto lg:mx-0"></div>
                  <div className="h-[14px] lg:h-[20px] bg-gray-200 rounded-[8px] w-[80%] mx-auto lg:mx-0"></div>
                </div>
              </div>
            </div>
          ))
        ) : (
          blogs.map((blog) => (
            <div key={blog.id} className="flex flex-col lg:flex-row gap-[16px] lg:gap-[40px] items-center lg:items-center justify-center w-full">
              {/* Image Container dengan efek frame border tebal & shadow besar */}
              <div className="w-[90%] lg:w-[260px] aspect-video lg:aspect-auto lg:h-[146px] rounded-[16px] border-[5px] border-[#2367ce] overflow-hidden shrink-0 shadow-[0px_15px_30px_0px_rgba(0,0,0,0.5)] lg:shadow-[0px_30px_75px_0px_rgba(0,0,0,0.5)] relative bg-gradient-to-b from-[#2367ce] to-[#b5d3ff] hover:-translate-y-2 lg:hover:-translate-y-3 transition-transform duration-300 cursor-pointer">
                <img src={`${import.meta.env.VITE_BACKEND_URL}${blog.img}`} alt={blog.title} loading="lazy" className="w-full h-full object-cover" />
                {/* Overlay Gradient linier */}
                <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(119.441deg, rgba(34, 99, 197, 0.3) 0%, rgba(206, 35, 35, 0) 100%)" }} />
              </div>
  
              {/* Teks Blog */}
              <div className="flex flex-col gap-[8px] lg:gap-[10px] w-[90%] lg:w-[603px] text-center lg:text-left">
                <h3 className="text-[18px] lg:text-[21px] font-bold text-[#1a1a1a] leading-[1.2]">
                  {blog.title}
                </h3>
                <p className="text-[14px] lg:text-[21px] font-normal text-[#1a1a1a] leading-[1.5] text-justify">
                  {blog.desc}
                </p>
              </div>
            </div>
          ))
        )}

        {/* Tombol Button */}
        <Button variant="primary" className="py-[12px] lg:py-[16px] px-[24px] lg:px-[40px] text-[16px] lg:text-[21px] font-bold mt-[10px]">
          Lihat Selengkapnya
        </Button>
      </div>
    </section>
  );
}
