import React from 'react';

export default function RatingSection() {
  const [ratings, setRatings] = React.useState([]);

  React.useEffect(() => {
    fetch('http://localhost:5000/api/meta/ratings')
      .then(res => res.json())
      .then(data => {
        if (data.data && data.data.length > 0) {
          const mappedRatings = data.data.map(r => ({
            id: r.name,
            src: r.icon_url,
            title: `Rating ${r.name}`
          }));
          setRatings(mappedRatings);
        }
      })
      .catch(err => console.error("Error fetching ratings:", err));
  }, []);

  return (
    <section className="w-full bg-white pt-[30px] lg:pt-[50px] pb-[60px] lg:pb-[100px] flex flex-col items-center z-20 relative">
      
      {/* Title & Subtitle */}
      <div className="flex flex-col gap-[8px] lg:gap-[10px] items-center text-center px-[16px] lg:px-4 max-w-[1235px] mx-auto w-full">
        <h2 className="text-[32px] lg:text-[47px] font-extrabold leading-[1.2] bg-clip-text text-transparent bg-gradient-to-b from-dblue-start to-dblue-end pb-[10px] -mb-[10px]">
          Cek Gim Berdasarkan Rating
        </h2>
        <p className="text-[16px] lg:text-[21px] font-extralight text-light-black">
          Temukan berbagai Gim dengan rating yang sesuai untuk usia anda
        </p>
      </div>

      {/* Blue Gradient Box for Rating Cards */}
      <div className="mt-[30px] lg:mt-[50px] w-[90%] lg:w-[1080px] h-auto lg:h-[323px] py-[40px] lg:py-0 bg-gradient-to-b from-dblue-start to-dblue-end rounded-[24px] flex items-center justify-center px-[20px] lg:px-[40px] shadow-lg">
        <div className="flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-end w-full gap-[30px] lg:gap-[20px]">
          {ratings.map((rating) => (
            <div 
              key={rating.id} 
              className="flex flex-col items-center gap-[12px] lg:gap-[16px] w-[140px] lg:w-[193px] hover:-translate-y-2 lg:hover:-translate-y-3 transition-transform duration-300 cursor-pointer"
            >
              <div className="w-full aspect-square">
                <img 
                  src={rating.src} 
                  alt={rating.title} 
                  loading="lazy"
                  className="w-full h-full object-cover" 
                />
              </div>
              <p className="text-[20px] lg:text-[27px] font-bold text-white leading-[1.2] text-center">
                {rating.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Description Text */}
      <p className="mt-[30px] lg:mt-[50px] text-[16px] lg:text-[21px] font-normal text-light-black leading-[1.5] text-center max-w-[1013px] px-[20px] lg:px-4">
        Mulailah dengan memilih kategori rating sesuai kebutuhan. Sistem akan menampilkan daftar genre yang tersedia pada rating tersebut beserta gim-gim yang telah diklasifikasikan, sehingga proses pencarian menjadi lebih cepat dan relevan.
      </p>
      
    </section>
  );
}
