import React, { useRef, useState, useEffect } from 'react';
import Button from '../ui/Button';

// Impor gambar klasifikasi yang baru diunduh
import imgHorror from '../../assets/class-horror.png';
import imgInteraksi from '../../assets/class-interaksi.png';
import imgPenampilan from '../../assets/class-penampilan.png';
import imgKekerasan from '../../assets/class-kekerasan.png';
import imgPornografi from '../../assets/class-pornografi.png';
import imgRokok from '../../assets/class-rokok.png';
import imgDarah from '../../assets/class-darah.png';
import imgBahasa from '../../assets/class-bahasa.png';
import imgJudi from '../../assets/class-judi.png';

export default function ClassificationSection() {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isInitialized = useRef(false);
  const scrollTimeoutRef = useRef(null);

  // Fungsi untuk mendapatkan lebar scroll dinamis (desktop vs mobile)
  const getScrollAmount = () => {
    return window.innerWidth >= 1024 ? 1069 : (window.innerWidth * 0.85) + 16;
  };

  // Auto-scroll ke kanan setiap 4 detik
  useEffect(() => {
    const timer = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
      }
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const handleScrollEvent = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const scrollAmt = getScrollAmount();
      const newIndex = Math.round(scrollLeft / scrollAmt);
      
      // Update pagination aktif (karena ada 3 set, kita gunakan modulo 9)
      setActiveIndex(newIndex % 9);

      // Silent jump untuk efek infinite loop yang mulus (tanpa rewind animasi)
      clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        if (!scrollRef.current) return;
        
        // Jika sudah melewati set ke-2 (masuk ke set 3, index 18)
        if (newIndex >= 18) {
          // Lompat diam-diam kembali ke set 2 (index 9)
          scrollRef.current.scrollLeft = (newIndex - 9) * scrollAmt;
        } 
        // Jika mundur dan melewati set 2 (masuk ke batas akhir set 1, index 8)
        else if (newIndex <= 8 && newIndex > 0) {
          // Lompat diam-diam ke set 2 (index 17)
          scrollRef.current.scrollLeft = (newIndex + 9) * scrollAmt;
        }
      }, 150); // Tunggu sampai animasi scroll/snap selesai
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
    }
  };

  const classifications = [
    {
      id: 'horror',
      title: 'Horror',
      desc: 'Konten yang menampilkan unsur menakutkan, seperti makhluk menyeramkan, suasana mencekam, atau efek visual dan suara yang dapat memicu rasa takut pada pemain.',
      img: imgHorror
    },
    {
      id: 'interaksi',
      title: 'Interaksi Daring',
      desc: 'Gim memungkinkan pemain berkomunikasi atau berinteraksi dengan pengguna lain melalui internet, seperti fitur obrolan, permainan multipemain, atau pertukaran konten.',
      img: imgInteraksi
    },
    {
      id: 'penampilan',
      title: 'Penampilan Tokoh',
      desc: 'Menunjukkan adanya karakter dengan penampilan, pakaian, atau visual tertentu yang dapat memengaruhi penilaian kesesuaian konten berdasarkan kelompok usia.',
      img: imgPenampilan
    },
    {
      id: 'kekerasan',
      title: 'Kekerasan',
      desc: 'Mengandung adegan perkelahian, penyerangan, penggunaan senjata, atau tindakan yang menyebabkan cedera terhadap karakter lain.',
      img: imgKekerasan
    },
    {
      id: 'pornografi',
      title: 'Pornografi',
      desc: 'Menampilkan unsur seksual, ketelanjangan, atau materi yang mengandung muatan pornografi sehingga hanya sesuai untuk kelompok usia tertentu.',
      img: imgPornografi
    },
    {
      id: 'rokok',
      title: 'Rokok, Narkotika, dan Alkohol',
      desc: 'Mengandung penggambaran penggunaan, konsumsi, atau referensi terhadap rokok, narkotika, maupun minuman beralkohol di dalam permainan.',
      img: imgRokok
    },
    {
      id: 'darah',
      title: 'Darah',
      desc: 'Menampilkan visual darah, luka serius, pemotongan anggota tubuh, atau tindakan ekstrem lainnya yang berpotensi mengganggu sebagian pemain.',
      img: imgDarah
    },
    {
      id: 'bahasa',
      title: 'Bahasa Kasar',
      desc: 'Mengandung kata-kata yang bersifat kasar, menghina, vulgar, atau tidak pantas yang digunakan dalam dialog maupun interaksi antarkarakter.',
      img: imgBahasa
    },
    {
      id: 'judi',
      title: 'Simulasi Judi',
      desc: 'Memiliki mekanisme permainan yang menyerupai aktivitas perjudian, seperti taruhan, permainan berbasis peluang, atau sistem yang mensimulasikan praktik judi tanpa melibatkan uang asli.',
      img: imgJudi
    }
  ];

  // Duplikasi array 3 kali (kiri, tengah, kanan) untuk infinite loop
  const extendedClassifications = [
    ...classifications.map((c) => ({ ...c, uniqueId: `set1-${c.id}` })),
    ...classifications.map((c) => ({ ...c, uniqueId: `set2-${c.id}` })),
    ...classifications.map((c) => ({ ...c, uniqueId: `set3-${c.id}` }))
  ];

  // Set posisi scroll awal ke set ke-2 (index 9) secara instan saat pertama kali render
  useEffect(() => {
    if (scrollRef.current && !isInitialized.current) {
      scrollRef.current.scrollLeft = 9 * getScrollAmount();
      isInitialized.current = true;
    }
  }, []);

  return (
    <section className="w-full bg-white pt-[30px] lg:pt-[50px] pb-[60px] lg:pb-[100px] flex flex-col items-center relative overflow-hidden">
      
      {/* Title & Subtitle */}
      <div className="flex flex-col gap-[8px] lg:gap-[10px] items-center text-center px-[16px] lg:px-4 max-w-[1015px] mx-auto w-full">
        <h2 className="text-[32px] lg:text-[47px] font-bold leading-[1.2] bg-clip-text text-transparent bg-gradient-to-b from-[#ce2323] to-[#681212] pb-[10px] -mb-[10px]">
          Pahami Tanda Klasifikasi Konten
        </h2>
        <p className="text-[16px] lg:text-[21px] font-extralight text-light-black">
          Kenali arti setiap tanda klasifikasi konten untuk membantu Anda memahami unsur yang terdapat dalam gim sebelum memainkannya
        </p>
      </div>

      {/* Slider Container Wrapper */}
      <div className="relative mt-[30px] lg:mt-[60px] w-full">
        
        {/* Navigation Buttons */}
        <button 
          onClick={scrollLeft}
          className="hidden lg:block absolute left-[10px] lg:left-[calc(50%-550.5px)] top-[123px] -translate-y-1/2 z-10 text-[#981b1b] cursor-pointer bg-transparent border-none outline-none hover:scale-110 transition-transform"
          aria-label="Previous"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button 
          onClick={scrollRight}
          className="hidden lg:block absolute right-[10px] lg:right-[calc(50%-550.5px)] top-[123px] -translate-y-1/2 z-10 text-[#981b1b] cursor-pointer bg-transparent border-none outline-none hover:scale-110 transition-transform"
          aria-label="Next"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Scrollable Area */}
        <div 
          ref={scrollRef}
          onScroll={handleScrollEvent}
          className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-[16px] lg:gap-[78px] px-[20px] lg:px-[calc(50%-495.5px)] pt-[4px] pb-[10px]"
        >
          {extendedClassifications.map((item) => (
            <div 
              key={item.uniqueId} 
              className="flex-none snap-center w-[85vw] lg:w-[991px] h-auto lg:h-[238px] rounded-[16px] bg-white border border-gray-100 shadow-[inset_0px_4px_6px_rgba(0,0,0,0.15),0px_4px_4px_rgba(0,0,0,0.05)] flex flex-col lg:flex-row gap-[16px] lg:gap-[14px] items-center lg:items-start px-[20px] lg:px-[36px] py-[24px] lg:py-[36px]"
            >
              {/* Icon */}
              <div className="relative shrink-0 w-[100px] h-[100px] lg:w-[166px] lg:h-[166px]">
                <img src={item.img} alt={item.title} className="w-full h-full object-contain" />
              </div>

              {/* Text */}
              <div className="flex flex-col gap-[8px] flex-1">
                <h3 className="text-[24px] lg:text-[36px] text-center w-full font-bold leading-[1.2] bg-clip-text text-transparent bg-gradient-to-b from-[#ce2323] to-[#681212] pb-[10px] -mb-[10px]">
                  {item.title}
                </h3>
                <p className="text-[14px] lg:text-[21px] font-normal text-light-black leading-[1.5] text-center lg:text-justify max-w-[779px] mx-auto">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-[20px] px-[20px] flex-wrap">
          {classifications.map((_, index) => (
            <button 
              key={index}
              onClick={() => {
                if (scrollRef.current) {
                  scrollRef.current.scrollTo({
                    left: index * getScrollAmount(),
                    behavior: 'smooth'
                  });
                }
              }}
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
