"use client";
import React, { useState, useMemo, useEffect } from 'react';
import { Search, ShoppingCart, ChevronLeft, ChevronRight, User } from 'lucide-react';
import Link from 'next/link';
import ProductCard from '../../components/ProductCard';
import productsData from '../../public/products.json';
import Cookies from 'js-cookie';

const CART_LENGTH = productsData.length;
const EMPTY_CART = Array(CART_LENGTH).fill(0);

const initializeCartCookie = () => {
  const cartData = Cookies.get('cart');
  if (!cartData) {
    console.log('No cart cookie found, initializing with empty cart');
    Cookies.set('cart', JSON.stringify(EMPTY_CART), { 
      expires: 30,
      path: '/',
      sameSite: 'lax'
    });
  } else {
    console.log('Cart cookie exists, keeping existing data');
  }
};

const getInitialSearch = () => {
  if (typeof window === "undefined") return '';
  const url = new URL(window.location.href);
  return url.searchParams.get('search') || '';
};

const Products = () => {
  const [search, setSearch] = useState(() => getInitialSearch());
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    initializeCartCookie();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);

    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (value.trim()) {
        url.searchParams.set('search', value);
      } else {
        url.searchParams.delete('search');
      }
      window.history.replaceState({}, '', url.toString());
    }
  };

  const filteredProducts = useMemo(() => {
    if (!search.trim()) {
      return productsData;
    }
    return productsData.filter(product =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % filteredProducts.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + filteredProducts.length) % filteredProducts.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <header className="flex items-center justify-between mb-8 bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-sm">
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">Æ</span>
            </div>
            <span className="text-xl font-semibold text-black">AETiC.</span>
          </Link>

          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={handleSearchChange}
                className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-black"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                  <Search className="w-4 h-4" />
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

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Products</h1>
          {search && (
            <p className="text-gray-600">
              Search results for: &quot;{search}&quot; ({filteredProducts.length} found)
            </p>
          )}
        </div>

        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="md:hidden">
          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {filteredProducts.map((product) => (
                  <div key={product.id} className="w-full flex-shrink-0 px-2">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>

            {filteredProducts.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-colors"
                  aria-label="Previous product"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-colors"
                  aria-label="Next product"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </>
            )}
          </div>

          {filteredProducts.length > 1 && (
            <div className="flex justify-center mt-4 space-x-2">
              {filteredProducts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-gray-600' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to product ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;