import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../ui/Button';

export default function RegisterAccountPage() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleNext = (e) => {
    e.preventDefault(); // To prevent form submission if wrapped in a form, but here we just manually advance
    setStep(2);
  };
  
  const handleRegister = (e) => {
    e.preventDefault();
    // Simulate successful registration
    navigate('/masuk');
  };

  return (
    <div className="w-full bg-white relative flex flex-col items-center pt-[50px] pb-[100px] min-h-[calc(100vh-69px)]">
      <div className="relative z-10 flex flex-col items-center w-full max-w-[1080px] mx-auto">
        <div className="text-center flex flex-col gap-[10px] w-full max-w-[779px]">
          <h1 className="font-extrabold text-[47px] leading-[1.2] bg-clip-text text-transparent bg-gradient-to-b from-dblue-start to-dblue-end pb-[10px] -mb-[10px]">
            Daftar
          </h1>
          <p className="font-extralight text-[21px] text-light-black leading-[1.5]">
            Mulai perjalanan klasifikasi gim Anda dengan membuat akun IGRS
          </p>
        </div>

        <div className="mt-[60px] w-full max-w-[984px]">
          {step === 1 ? (
            <form onSubmit={handleNext} className="flex flex-col gap-[24px] w-full">
              <div className="flex gap-[36px] w-full">
                <div className="flex-1 flex flex-col gap-[8px]">
                  <label className="text-[21px] text-[#1a1a1a] font-normal leading-[1.5]">
                    Nama Lengkap<span className="text-[#ce2323]">*</span>
                  </label>
                  <input 
                    type="text"
                    required
                    placeholder="Masukkan Nama Lengkap"
                    className="bg-white border border-[#f0f0f0] rounded-[222px] px-[50px] py-[10px] w-full outline-none text-[21px] text-[#1a1a1a] placeholder:text-[#1a1a1a] placeholder:opacity-50 shadow-[0_6px_8px_-2px_rgba(0,0,0,0.15)] focus:border-[#2367ce]"
                  />
                </div>
                <div className="flex-1 flex flex-col gap-[8px]">
                  <label className="text-[21px] text-[#1a1a1a] font-normal leading-[1.5]">
                    Email<span className="text-[#ce2323]">*</span>
                  </label>
                  <input 
                    type="email"
                    required
                    placeholder="contoh@gmail.com"
                    className="bg-white border border-[#f0f0f0] rounded-[222px] px-[50px] py-[10px] w-full outline-none text-[21px] text-[#1a1a1a] placeholder:text-[#1a1a1a] placeholder:opacity-50 shadow-[0_6px_8px_-2px_rgba(0,0,0,0.15)] focus:border-[#2367ce]"
                  />
                </div>
              </div>

              <div className="w-full flex flex-col gap-[8px]">
                <label className="text-[21px] text-[#1a1a1a] font-normal leading-[1.5]">
                  Nama Perusahaan/Studio
                </label>
                <input 
                  type="text"
                  placeholder="Masukkan Nama Perusahaan/Studio"
                  className="bg-white border border-[#f0f0f0] rounded-[222px] px-[50px] py-[10px] w-full outline-none text-[21px] text-[#1a1a1a] placeholder:text-[#1a1a1a] placeholder:opacity-50 shadow-[0_6px_8px_-2px_rgba(0,0,0,0.15)] focus:border-[#2367ce]"
                />
              </div>

              <div className="w-full flex flex-col gap-[8px]">
                <label className="text-[21px] text-[#1a1a1a] font-normal leading-[1.5]">
                  Negara/Asal Pengembang
                </label>
                <input 
                  type="text"
                  placeholder="Masukkan Negara/Asal Pengembang"
                  className="bg-white border border-[#f0f0f0] rounded-[222px] px-[50px] py-[10px] w-full outline-none text-[21px] text-[#1a1a1a] placeholder:text-[#1a1a1a] placeholder:opacity-50 shadow-[0_6px_8px_-2px_rgba(0,0,0,0.15)] focus:border-[#2367ce]"
                />
              </div>

              <div className="mt-[16px] w-full flex flex-col items-center gap-[16px]">
                <Button 
                  type="submit"
                  className="!w-full !justify-center !py-[16px] !rounded-[222px] !text-[21px] !font-bold shadow-md"
                >
                  Lanjut
                </Button>
                
                <p className="text-[21px] text-[#1a1a1a]">
                  Sudah punya akun?{' '}
                  <Link to="/masuk" className="font-bold text-[#2367ce] hover:opacity-80 transition-opacity">
                    Masuk Di Sini
                  </Link>
                </p>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="flex flex-col gap-[24px] w-full">
              <div className="w-full flex flex-col gap-[8px]">
                <label className="text-[21px] text-[#1a1a1a] font-normal leading-[1.5]">
                  Buat Kata Sandi<span className="text-[#ce2323]">*</span>
                </label>
                <input 
                  type="password"
                  required
                  placeholder="********"
                  className="bg-white border border-[#f0f0f0] rounded-[222px] px-[50px] py-[10px] w-full outline-none text-[21px] text-[#1a1a1a] placeholder:text-[#1a1a1a] placeholder:opacity-50 shadow-[0_6px_8px_-2px_rgba(0,0,0,0.15)] focus:border-[#2367ce]"
                />
              </div>

              <div className="w-full flex flex-col gap-[8px]">
                <label className="text-[21px] text-[#1a1a1a] font-normal leading-[1.5]">
                  Masukkan Ulang Kata Sandi<span className="text-[#ce2323]">*</span>
                </label>
                <input 
                  type="password"
                  required
                  placeholder="********"
                  className="bg-white border border-[#f0f0f0] rounded-[222px] px-[50px] py-[10px] w-full outline-none text-[21px] text-[#1a1a1a] placeholder:text-[#1a1a1a] placeholder:opacity-50 shadow-[0_6px_8px_-2px_rgba(0,0,0,0.15)] focus:border-[#2367ce]"
                />
              </div>

              <div className="w-full flex flex-col gap-[8px]">
                <label className="text-[21px] text-[#1a1a1a] font-normal leading-[1.5]">
                  Kode Verifikasi Email<span className="text-[#ce2323]">*</span>
                </label>
                <div className="relative w-full">
                  <input 
                    type="text"
                    required
                    placeholder="Kode berupa 6 digit angka"
                    className="bg-white border border-[#f0f0f0] rounded-[222px] px-[50px] py-[10px] w-full outline-none text-[21px] text-[#1a1a1a] placeholder:text-[#1a1a1a] placeholder:opacity-50 shadow-[0_6px_8px_-2px_rgba(0,0,0,0.15)] focus:border-[#2367ce] pr-[220px]"
                  />
                  <button type="button" className="absolute right-[10px] top-1/2 -translate-y-1/2 bg-gradient-to-b from-[#2367ce] to-[#0f3b82] text-white px-[24px] py-[8px] rounded-[222px] text-[16px] font-bold shadow-md hover:opacity-90 transition-opacity">
                    Kirim Ulang Kode
                  </button>
                </div>
              </div>

              <div className="w-full flex items-center gap-[12px] mt-[10px] px-[10px]">
                <div className="relative flex items-center justify-center shrink-0">
                  <input 
                    type="checkbox" 
                    id="terms" 
                    required 
                    className="w-[24px] h-[24px] appearance-none border-[2.5px] border-[#2367ce] rounded-full cursor-pointer checked:bg-[#2367ce] transition-colors peer"
                  />
                  <svg className="absolute w-4 h-4 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <label htmlFor="terms" className="text-[21px] text-[#1a1a1a] font-light cursor-pointer">
                  Saya telah membaca dan menyetujui <span className="text-[#8cb8f4]">Syarat & Ketentuan</span> dan <span className="text-[#8cb8f4]">Kebijakan Privasi</span>.
                </label>
              </div>

              <div className="mt-[16px] w-full flex flex-col items-center gap-[16px]">
                <div className="flex gap-[16px] w-full items-center">
                  <button 
                    type="button"
                    onClick={(e) => { e.preventDefault(); setStep(1); }}
                    className="w-[58px] h-[58px] shrink-0 rounded-full border-[2.5px] border-[#2367ce] flex items-center justify-center text-[#2367ce] hover:bg-gray-50 transition-colors shadow-md"
                  >
                    <svg className="w-8 h-8 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                  </button>
                  <Button 
                    type="submit"
                    className="flex-1 !justify-center !h-[58px] !rounded-[222px] !text-[21px] !font-bold shadow-md"
                  >
                    Daftar
                  </Button>
                </div>
                
                <p className="text-[21px] text-[#1a1a1a] mt-[8px]">
                  Sudah punya akun?{' '}
                  <Link to="/masuk" className="font-bold text-[#2367ce] hover:opacity-80 transition-opacity">
                    Masuk Di Sini
                  </Link>
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
