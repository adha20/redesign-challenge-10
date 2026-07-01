import Navbar from './components/layout/Navbar';
import Hero from './components/home/Hero';

import RatingSection from './components/home/RatingSection';

import ClassificationSection from './components/home/ClassificationSection';
import BlogSection from './components/home/BlogSection';
import KpieSection from './components/home/KpieSection';

function App() {
  return (
    <div className="min-h-screen bg-light-white font-sans text-light-black flex flex-col">
      {/* Memanggil komponen Navbar */}
      <Navbar />
      
      {/* Area Konten Utama (Hero) */}
      <main className="w-full bg-white flex-1 flex flex-col">
        <Hero />
        
        {/* Efek Transisi Gradien di bawah Hero (Mengisi gap biru seperti di desain asli) */}
        <div className="w-full h-[250px] bg-gradient-to-b from-dblue-end to-white pointer-events-none shrink-0" />

        {/* Section Rating */}
        <RatingSection />

        {/* Section Klasifikasi Konten */}
        <ClassificationSection />
        
        {/* Section Blog */}
        <BlogSection />
        
        {/* Section KPIE */}
        <KpieSection />
      </main>
    </div>
  )
}

export default App
