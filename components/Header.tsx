"use client";
import React, { useState } from 'react';
import { Search, ShoppingCart, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Header = () => {
  const [search, setSearch] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    router.push(`/products?search=${search}`);
  };
  return (
    <header className="flex items-center justify-between mb-8 bg-white/80 backdrop-blur-sm rounded-2xl px-10 py-4 shadow-sm border-1 border-gray-200 max-w-5xl mx-auto w-full mt-8">
      <Link href="/" className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">Æ</span>
        </div>
        <span className="text-xl font-semibold">AETiC.</span>
      </Link>
      
      <div className="flex-1 max-w-xl mx-12">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search products..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
              <Search className="w-4 h-4 text-white" onClick={handleSearch} />
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <Link href="/cart">
          <ShoppingCart className="w-6 h-6 text-gray-600 hover:text-black cursor-pointer transition-colors" />
        </Link>
        <div>
          <div className="w-10 h-10 bg-orange-400 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;