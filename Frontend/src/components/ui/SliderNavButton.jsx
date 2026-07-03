import React from 'react';

export default function SliderNavButton({ direction, onClick, className = "" }) {
  const isLeft = direction === 'left';
  const positionClass = isLeft 
    ? 'left-[10px] lg:left-[calc(50%-550.5px)]' 
    : 'right-[10px] lg:right-[calc(50%-550.5px)]';

  return (
    <button 
      onClick={onClick}
      className={`hidden lg:block absolute ${positionClass} top-[123px] -translate-y-1/2 z-10 text-[#981b1b] cursor-pointer bg-transparent border-none outline-none hover:scale-110 transition-transform ${className}`}
      aria-label={isLeft ? 'Previous' : 'Next'}
    >
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
        {isLeft ? (
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        )}
      </svg>
    </button>
  );
}
