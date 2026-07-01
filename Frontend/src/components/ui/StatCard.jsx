import React from 'react';

export default function StatCard({ iconSrc, title, description, className = '' }) {
  return (
    <div className={`flex gap-[8px] items-center z-30 ${className}`}>
      <img alt="Stat icon" className="w-[58px] h-[58px] shrink-0" src={iconSrc} />
      <div className="flex flex-col leading-[1.2]">
        <p className="font-extrabold text-[27px] text-light-black">{title}</p>
        <p className="font-normal text-[16px] text-light-black">{description}</p>
      </div>
    </div>
  );
}
