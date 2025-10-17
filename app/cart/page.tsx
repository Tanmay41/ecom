"use client";
import React, { useEffect, useState } from "react";
import products from "../../public/products.json";
import CartItem from "@/components/CartItem";
import Header from "@/components/Header";
import PayPalPayment from "@/components/PayPalPayment";
import { usePayPal } from "@/contexts/PayPalContext";
import Cookies from "js-cookie";

const CART_LENGTH = products.length;

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

function formatPrice(price: number) {
  return `A$${price.toFixed(2)}`;
}

const getCartFromCookie = (): number[] => {
  try {
    const cartData = Cookies.get('cart');
    if (cartData) {
      const arr = JSON.parse(cartData);
      if (Array.isArray(arr) && arr.length === CART_LENGTH) {
        return arr;
      }
    }
  } catch (error) {
    console.error('Error parsing cart cookie:', error);
  }
  return Array(CART_LENGTH).fill(0);
};

const setCartToCookie = (cart: number[]) => {
  Cookies.set('cart', JSON.stringify(cart), { 
    expires: 30,
    path: '/',
    sameSite: 'lax'
  });
};

const Cart = () => {
  const [cart, setCart] = useState<number[]>(Array(CART_LENGTH).fill(0));
  const [cartProducts, setCartProducts] = useState<
    (Product & { amount: number })[]
  >([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const { paymentError } = usePayPal();

  useEffect(() => {
    const cartData = getCartFromCookie();
    setCart(cartData);

    const items: (Product & { amount: number })[] = products
      .map((product, idx) => {
        const amount = cartData[idx] || 0;
        if (amount > 0) {
          return { ...product, amount };
        }
        return null;
      })
      .filter(Boolean) as (Product & { amount: number })[];
    setCartProducts(items);
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (!isInitialized) return;

    const items: (Product & { amount: number })[] = products
      .map((product, idx) => {
        const amount = cart[idx] || 0;
        if (amount > 0) {
          return { ...product, amount };
        }
        return null;
      })
      .filter(Boolean) as (Product & { amount: number })[];
    setCartProducts(items);
    setCartToCookie(cart);
  }, [cart, isInitialized]);

  const handleIncrease = (id: number) => {
    setCart((prevCart) => {
      const newCart = [...prevCart];
      newCart[id - 1] = (newCart[id - 1] || 0) + 1;
      return newCart;
    });
  };

  const handleDecrease = (id: number) => {
    setCart((prevCart) => {
      const newCart = [...prevCart];
      newCart[id - 1] = Math.max((newCart[id - 1] || 0) - 1, 0);
      return newCart;
    });
  };

  const handleDelete = (id: number) => {
    setCart((prevCart) => {
      const newCart = [...prevCart];
      newCart[id - 1] = 0;
      return newCart;
    });
  };

  const subtotal = cartProducts.reduce(
    (sum, item) => sum + item.price * item.amount,
    0
  );
  const shipping = 0;
  const total = subtotal + shipping;

  const handlePaymentSuccess = (details: unknown) => {
    console.log('Payment successful:', details);
    const emptyCart = Array(CART_LENGTH).fill(0);
    setCart(emptyCart);
    setCartToCookie(emptyCart);
    alert('Payment successful! Your order has been placed.');
  };

  const handlePaymentError = (error: unknown) => {
    console.error('Payment error:', error);
    alert('Payment failed. Please try again.');
  };

  const handlePaymentCancel = () => {
    console.log('Payment cancelled');
  };

  return (
    <>
      <Header />
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8 text-center">Your Shopping Cart</h1>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 bg-white rounded-[2rem] shadow-lg p-8 min-h-[300px]">
            <h2 className="text-xl font-semibold mb-4">Items in Cart</h2>
            {cartProducts.length === 0 ? (
              <div className="text-gray-500 text-center py-12">
                Your cart is empty.
              </div>
            ) : (
              <ul className="divide-y">
                {cartProducts.map((item) => (
                  <CartItem
                    key={item.id}
                    image={item.image}
                    name={item.name}
                    price={item.price}
                    amount={item.amount}
                    onIncrease={() => handleIncrease(item.id)}
                    onDecrease={() => handleDecrease(item.id)}
                    onDelete={() => handleDelete(item.id)}
                  />
                ))}
              </ul>
            )}
          </div>
          <div className="w-full md:w-80 bg-white rounded-[2rem] shadow-lg p-8 h-fit">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>{formatPrice(shipping)}</span>
            </div>
            <div className="border-t my-4"></div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
            {cartProducts.length > 0 ? (
              <div className="mt-6">
                <PayPalPayment
                  total={total}
                  currency="AUD"
                  onSuccess={handlePaymentSuccess}
                  onError={handlePaymentError}
                  onCancel={handlePaymentCancel}
                />
                {paymentError && (
                  <div className="mt-2 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
                    {paymentError}
                  </div>
                )}
              </div>
            ) : (
              <button
                className="mt-6 w-full bg-gray-400 text-white font-semibold py-3 rounded-full cursor-not-allowed text-lg"
                disabled
              >
                Cart is Empty
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;