import React from 'react';

export default function SectionHeader({ title, subtitle, className = "" }) {
  return (
    <div className={`flex flex-col gap-[8px] lg:gap-[10px] items-center text-center px-[16px] lg:px-4 max-w-[1015px] mx-auto w-full ${className}`}>
      <h2 className="text-[32px] lg:text-[47px] font-extrabold leading-[1.2] text-gradient-primary pb-[10px] -mb-[10px]">
        {title}
      </h2>
      {subtitle && (
        <p className="text-[16px] lg:text-[21px] font-extralight text-light-black">
          {subtitle}
        </p>
      )}
    </div>
  );
}
