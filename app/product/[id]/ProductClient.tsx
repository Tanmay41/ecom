"use client";

import React, { useState, useEffect } from "react";
import { Star, ShoppingCart, Plus, Minus, Trash2 } from "lucide-react";
import { useParams } from "next/navigation";
import products from "../../../public/products.json";
import Header from "@/components/Header";
import Cookies from "js-cookie";
import Image from "next/image";

const ProductClient: React.FC = () => {
  const [cart, setCart] = useState<number[]>([]);
  const [isInCart, setIsInCart] = useState(false);
  const [cartAmount, setCartAmount] = useState(0);
  const params = useParams();
  const productId = Number(params.id);
  const product = products.find((product) => product.id === productId);

  const numProducts = products.length;

  useEffect(() => {
    try {
      const cartData = Cookies.get("cart");
      let cart: number[] = new Array(numProducts).fill(0);

      if (cartData) {
        const parsed = JSON.parse(cartData);
        if (Array.isArray(parsed) && parsed.length === numProducts) {
          cart = parsed;
        } else if (Array.isArray(parsed)) {
          cart = [...parsed, ...new Array(numProducts - parsed.length).fill(0)];
        }
      }

      setCart(cart);
      if (product && cart[product.id - 1] > 0) {
        setIsInCart(true);
        setCartAmount(cart[product.id - 1]);
      } else {
        setIsInCart(false);
        setCartAmount(0);
      }
    } catch (error) {
      console.error("Error loading cart from cookie:", error);
      const emptyCart = new Array(numProducts).fill(0);
      setCart(emptyCart);
      setIsInCart(false);
      setCartAmount(0);
    }
  }, [product, numProducts]); // ✅ fixed missing dependency

  const updateCartCookie = (newCart: number[]) => {
    Cookies.set("cart", JSON.stringify(newCart), {
      expires: 30,
      path: "/",
      sameSite: "lax",
    });
  };

  const addToCart = () => {
    if (!product) return;
    const newCart = [...cart];
    newCart[product.id - 1] = 1;
    setCart(newCart);
    setIsInCart(true);
    setCartAmount(1);
    updateCartCookie(newCart);
  };

  const updateCartAmount = (newAmount: number) => {
    if (!product) return;
    const newCart = [...cart];
    if (newAmount <= 0) {
      newCart[product.id - 1] = 0;
      setIsInCart(false);
      setCartAmount(0);
    } else {
      newCart[product.id - 1] = newAmount;
      setIsInCart(true);
      setCartAmount(newAmount);
    }
    setCart(newCart);
    updateCartCookie(newCart);
  };

  const formatPrice = (price: number) => {
    return `A$${price.toLocaleString("en-AU", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star
          key="half"
          className="w-5 h-5 fill-yellow-400/50 text-yellow-400"
        />
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="w-5 h-5 text-gray-300" />
      );
    }

    return stars;
  };

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-2xl font-semibold text-gray-600">
        Product not found.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-10 px-4 md:px-8">
      <Header />
      <div className="max-w-5xl w-full flex flex-col md:flex-row gap-10 bg-white/80 rounded-3xl shadow-xl p-6 md:p-10 mx-auto border-1 border-gray-200">
        {/* Product Images */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="w-full aspect-square bg-gray-100 rounded-2xl overflow-hidden flex items-center justify-center">
            <Image
              src={product.images?.[0] || `/product ${product.id}/image 1.webp`}
              alt={product.name}
              width={600}
              height={600}
              className="object-contain w-full h-full"
              onError={(e) => {
                // @ts-expect-error react image
                e.target.src = `/product ${product.id}/image 1.webp`;
              }}
              priority
            />
          </div>
          {product.images && product.images.length > 1 && (
            <div className="flex gap-2 mt-2">
              {product.images.map((img, idx) => (
                <Image
                  key={idx}
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  width={64}
                  height={64}
                  className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                  onError={(e) => {
                    // @ts-expect-error react image
                    e.target.src = `/product ${product.id}/image 1.webp`;
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {product.name}
            </h1>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center">{renderStars(product.rating)}</div>
              <span className="text-gray-600 text-base">
                {product.rating} ({product.ratingCount} reviews)
              </span>
            </div>
            <div className="text-2xl md:text-3xl font-bold text-lime-600 mb-4">
              {formatPrice(product.price)}
            </div>
            <p className="text-gray-700 text-lg mb-6">{product.description}</p>
          </div>

          {/* Add to Cart */}
          <div className="mt-6 flex justify-end">
            {isInCart ? (
              <div className="flex items-center space-x-3 bg-lime-400 rounded-full px-6 py-3 w-fit">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    updateCartAmount(cartAmount - 1);
                  }}
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  {cartAmount === 1 ? (
                    <Trash2 className="w-5 h-5 text-gray-700" />
                  ) : (
                    <Minus className="w-5 h-5 text-gray-700" />
                  )}
                </button>
                <span className="text-gray-900 font-semibold min-w-[28px] text-center text-lg">
                  {cartAmount}
                </span>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    updateCartAmount(cartAmount + 1);
                  }}
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  <Plus className="w-5 h-5 text-gray-700" />
                </button>
              </div>
            ) : (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  addToCart();
                }}
                className="bg-lime-500 hover:bg-lime-600 px-8 py-3 rounded-full font-semibold text-gray-900 text-lg transition-all hover:scale-105 flex items-center space-x-3 shadow-md"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Add to Cart</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductClient;
