import React from 'react';

// Impor ikon rating (kita gunakan aset yang sudah diunduh sebelumnya)
import img3 from '../../assets/rating-3.png';
import img7 from '../../assets/rating-7.png';
import img13 from '../../assets/rating-13.png';
import img15 from '../../assets/rating-15.png';
import img18 from '../../assets/rating-18.png';

export default function RatingSection() {
  const ratings = [
    { id: '3+', src: img3, title: 'Rating 3+' },
    { id: '7+', src: img7, title: 'Rating 7+' },
    { id: '13+', src: img13, title: 'Rating 13+' },
    { id: '15+', src: img15, title: 'Rating 15+' },
    { id: '18+', src: img18, title: 'Rating 18+' },
  ];

  return (
    <section className="w-full bg-white pt-[50px] pb-[100px] flex flex-col items-center z-20 relative">
      
      {/* Title & Subtitle */}
      <div className="flex flex-col gap-[10px] items-center text-center px-4 max-w-[1235px] mx-auto w-full">
        <h2 className="text-[47px] font-bold leading-[1.2] bg-clip-text text-transparent bg-gradient-to-b from-dblue-start to-dblue-end pb-[10px] -mb-[10px]">
          Cek Gim Berdasarkan Rating
        </h2>
        <p className="text-[21px] font-extralight text-light-black">
          Temukan berbagai Gim dengan rating yang sesuai untuk usia anda
        </p>
      </div>

      {/* Blue Gradient Box for Rating Cards */}
      <div className="mt-[50px] w-[1080px] h-[323px] bg-gradient-to-b from-dblue-start to-dblue-end rounded-[24px] flex items-center justify-center px-[40px] shadow-lg">
        <div className="flex justify-between items-end w-full gap-[20px]">
          {ratings.map((rating) => (
            <div 
              key={rating.id} 
              className="flex flex-col items-center gap-[16px] w-[193px] hover:-translate-y-3 transition-transform duration-300 cursor-pointer"
            >
              <div className="w-full aspect-square">
                <img 
                  src={rating.src} 
                  alt={rating.title} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <p className="text-[27px] font-bold text-white leading-[1.2] text-center">
                {rating.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Description Text */}
      <p className="mt-[50px] text-[21px] font-normal text-light-black leading-[1.5] text-center max-w-[1013px] px-4">
        Mulailah dengan memilih kategori rating sesuai kebutuhan. Sistem akan menampilkan daftar genre yang tersedia pada rating tersebut beserta gim-gim yang telah diklasifikasikan, sehingga proses pencarian menjadi lebih cepat dan relevan.
      </p>
      
    </section>
  );
}
