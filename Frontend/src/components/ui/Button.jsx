import React from 'react';

export default function Button({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}) {
  const baseStyle = "flex items-center justify-center shrink-0 hover:opacity-90 hover:scale-[1.02] hover:shadow-lg transition-all duration-300 cursor-pointer";
  
  const variants = {
    primary: "bg-gradient-to-b from-dblue-start to-dblue-end text-white font-extrabold rounded-full px-[40px] py-[8px]",
    icon: "bg-gradient-to-b from-dblue-start to-dblue-end text-white rounded-[10px] w-[45px] h-[45px]",
  };

  if (props.href) {
    return (
      <a className={`${baseStyle} ${variants[variant] || variants.primary} ${className}`} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={`${baseStyle} ${variants[variant] || variants.primary} ${className}`} {...props}>
      {children}
    </button>
  );
}
