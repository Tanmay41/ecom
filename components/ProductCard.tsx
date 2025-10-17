"use client";
import React, { useState, useEffect } from 'react';
import { Star, ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import productsData from '../public/products.json';
import Cookies from 'js-cookie';
import Image from 'next/image';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  ratingCount: number;
  image: string;
  images: string[];
}

interface ProductCardProps {
  product: Product;
}

const CART_LENGTH = productsData.length;

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [cart, setCart] = useState<number[]>(Array(CART_LENGTH).fill(0));
  const [cartAmount, setCartAmount] = useState(0);

  useEffect(() => {
    try {
      const cartData = Cookies.get('cart');
      if (cartData) {
        const parsed = JSON.parse(cartData);
        if (Array.isArray(parsed) && parsed.length === CART_LENGTH) {
          setCart(parsed);
          setCartAmount(parsed[product.id - 1] || 0);
        } else {
          setCart(Array(CART_LENGTH).fill(0));
          setCartAmount(0);
        }
      } else {
        setCart(Array(CART_LENGTH).fill(0));
        setCartAmount(0);
      }
    } catch (error) {
      console.error('Error loading cart from cookie:', error);
      setCart(Array(CART_LENGTH).fill(0));
      setCartAmount(0);
    }
  }, [product.id]);

  const updateCartCookie = (newCart: number[]) => {
    Cookies.set('cart', JSON.stringify(newCart), { 
      expires: 30,
      path: '/',
      sameSite: 'lax'
    });
  };

  const addToCart = () => {
    const newCart = [...cart];
    newCart[product.id - 1] = 1;
    setCart(newCart);
    setCartAmount(1);
    updateCartCookie(newCart);
  };

  const updateCartAmount = (newAmount: number) => {
    const newCart = [...cart];
    if (newAmount <= 0) {
      newCart[product.id - 1] = 0;
      setCartAmount(0);
    } else {
      newCart[product.id - 1] = newAmount;
      setCartAmount(newAmount);
    }
    setCart(newCart);
    updateCartCookie(newCart);
  };

  const formatPrice = (price: number) => {
    return `A$${price.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="w-4 h-4 fill-yellow-400/50 text-yellow-400" />
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
      );
    }

    return stars;
  };

  const isInCart = cartAmount > 0;

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 pt-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
      <Link href={`/product/${product.id}`}>
        <div className="relative mb-4">
          <Image
            src={`/product ${product.id}/image 1.webp`}
            alt={product.name}
            width={400}
            height={400}
            className="w-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              // @ts-expect-error react image
              e.target.src = `/product ${product.id}/image 1.webp`;
            }}
            unoptimized
          />
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {product.name}
          </h3>
          
          <p className="text-sm text-gray-600 line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              {renderStars(product.rating)}
            </div>
            <span className="text-sm text-gray-500">
              {product.rating} ({product.ratingCount} reviews)
            </span>
          </div>
        </div>
      </Link>

      <div className="flex items-center justify-between pt-2">
        <div className="text-2xl font-bold text-gray-900">
          {formatPrice(product.price)}
        </div>
        
        {isInCart ? (
          <div className="flex items-center space-x-3 bg-lime-400 rounded-full px-4 py-2">
            <button
              onClick={(e) => {
                e.preventDefault();
                updateCartAmount(cartAmount - 1);
              }}
              className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              {cartAmount === 1 ? (
                <Trash2 className="w-4 h-4 text-gray-700" />
              ) : (
                <Minus className="w-4 h-4 text-gray-700" />
              )}
            </button>
            <span className="text-gray-900 font-semibold min-w-[20px] text-center">
              {cartAmount}
            </span>
            <button
              onClick={(e) => {
                e.preventDefault();
                updateCartAmount(cartAmount + 1);
              }}
              className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <Plus className="w-4 h-4 text-gray-700" />
            </button>
          </div>
        ) : (
          <button 
            onClick={(e) => {
              e.preventDefault();
              addToCart();
            }}
            className="bg-lime-400 hover:bg-lime-500 px-6 py-2 rounded-full font-semibold text-gray-900 transition-all hover:scale-105 flex items-center space-x-2"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Add to Cart</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;