import React from 'react';

export default function ClassificationCard({ title, desc, img }) {
  return (
    <div className="flex-none snap-center w-[85vw] lg:w-[991px] h-auto lg:h-[238px] rounded-[16px] bg-white border border-gray-100 shadow-[inset_0px_4px_6px_rgba(0,0,0,0.15),0px_4px_4px_rgba(0,0,0,0.05)] flex flex-col lg:flex-row gap-[16px] lg:gap-[14px] items-center lg:items-start px-[20px] lg:px-[36px] py-[24px] lg:py-[36px]">
      {/* Icon */}
      <div className="relative shrink-0 w-[100px] h-[100px] lg:w-[166px] lg:h-[166px]">
        <img src={`${import.meta.env.VITE_BACKEND_URL}${img}`} alt={title} className="w-full h-full object-contain" />
      </div>

      {/* Text */}
      <div className="flex flex-col gap-[8px] flex-1">
        <h3 className="text-[24px] lg:text-[36px] text-center w-full font-bold leading-[1.2] text-gradient-primary pb-[10px] -mb-[10px]">
          {title}
        </h3>
        <p className="text-[14px] lg:text-[21px] font-normal text-light-black leading-[1.5] text-center lg:text-justify max-w-[779px] mx-auto">
          {desc}
        </p>
      </div>
    </div>
  );
}
