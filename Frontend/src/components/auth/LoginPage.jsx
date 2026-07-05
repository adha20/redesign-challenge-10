import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import { dummyUsers } from '../../data/users';

export default function LoginPage() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        // Jika status error (4xx/5xx)
        if (data.details && data.details.length > 0) {
          throw new Error(data.details[0].message);
        }
        throw new Error(data.message || 'Email atau kata sandi yang Anda masukkan salah.');
      }

      // Jika berhasil
      localStorage.setItem('igrs_user', JSON.stringify(data.data.user));
      localStorage.setItem('igrs_token', data.data.token);
      window.location.href = '/';
      
    } catch (err) {
      setError(err.message || 'Terjadi kesalahan saat masuk. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full bg-white relative flex flex-col items-center pt-[30px] lg:pt-[50px] pb-[60px] lg:pb-[100px] min-h-[calc(100vh-69px)] px-[20px] lg:px-0">
      <div className="relative z-10 flex flex-col items-center w-full max-w-[1080px] mx-auto">
        <div className="text-center flex flex-col gap-[8px] lg:gap-[10px] w-full max-w-[833px]">
          <h1 className="font-extrabold text-[32px] lg:text-[47px] leading-[1.2] bg-clip-text text-transparent bg-gradient-to-b from-dblue-start to-dblue-end pb-[10px] -mb-[10px]">
            Masuk
          </h1>
          <p className="font-extralight text-[16px] lg:text-[21px] text-light-black leading-[1.5]">
            Masuk ke akun IGRS untuk mengelola pendaftaran gim dan memantau proses klasifikasi
          </p>
        </div>

        <form onSubmit={handleLogin} className="mt-[40px] lg:mt-[60px] flex flex-col items-center gap-[24px] w-full max-w-[984px]">
          {error && (
            <div className="w-full bg-[#fde8e8] text-[#9b1c1c] border border-[#fbd5d5] px-4 py-3 rounded-md text-[16px] lg:text-[18px]">
              {error}
            </div>
          )}

          <div className="w-full flex flex-col gap-[8px]">
            <label className="text-[16px] lg:text-[21px] text-[#1a1a1a] font-normal leading-[1.5]">
              Email<span className="text-[#ce2323]">*</span>
            </label>
            <input 
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="contoh@gmail.com"
              className="bg-white border border-[#f0f0f0] rounded-[222px] px-[24px] lg:px-[50px] py-[10px] w-full outline-none text-[16px] lg:text-[21px] text-[#1a1a1a] placeholder:text-[#1a1a1a] placeholder:opacity-50 shadow-[0_6px_8px_-2px_rgba(0,0,0,0.15)] focus:border-[#2367ce]"
            />
          </div>

          <div className="w-full flex flex-col gap-[8px]">
            <label className="text-[16px] lg:text-[21px] text-[#1a1a1a] font-normal leading-[1.5]">
              Kata Sandi<span className="text-[#ce2323]">*</span>
            </label>
            <input 
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan Kata Sandi"
              className="bg-white border border-[#f0f0f0] rounded-[222px] px-[24px] lg:px-[50px] py-[10px] w-full outline-none text-[16px] lg:text-[21px] text-[#1a1a1a] placeholder:text-[#1a1a1a] placeholder:opacity-50 shadow-[0_6px_8px_-2px_rgba(0,0,0,0.15)] focus:border-[#2367ce]"
            />
          </div>

          <div className="mt-[16px] w-full flex flex-col items-center gap-[16px]">
            <Button 
              type="submit"
              disabled={isLoading}
              className="!w-full !justify-center !py-[12px] lg:!py-[16px] !rounded-[222px] !text-[16px] lg:!text-[21px] !font-bold shadow-md disabled:opacity-50"
            >
              {isLoading ? 'Memproses...' : 'Masuk'}
            </Button>
            
            <p className="text-[16px] lg:text-[21px] text-[#1a1a1a]">
              Belum punya akun?{' '}
              <Link to="/daftar" className="font-bold text-[#2367ce] hover:opacity-80 transition-opacity">
                Daftar Di Sini
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
