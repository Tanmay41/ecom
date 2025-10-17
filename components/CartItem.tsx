import React from "react";
import { Plus, Minus, Trash2 } from "lucide-react";
import Image from "next/image";

interface CartItemProps {
  image: string;
  name: string;
  price: number;
  amount: number;
  onIncrease?: () => void;
  onDecrease?: () => void;
  onDelete?: () => void;
}

function formatPriceAUD(price: number) {
  return price.toLocaleString("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

const CartItem: React.FC<CartItemProps> = ({
  image,
  name,
  price,
  amount,
  onIncrease,
  onDecrease,
  onDelete,
}) => {
  return (
    <li
      className="flex items-center py-4 px-6 gap-4 rounded-2xl relative overflow-hidden"
      style={{
        background:
          "linear-gradient(90deg,rgb(221, 255, 238) 0%,rgb(255, 222, 245) 100%)",
        boxShadow: "0 2px 12px 0 rgba(163, 230, 53, 0.08)",
        border: "1px solid rgb(202, 202, 202)",
      }}
    >
      {/* Decorative background shapes */}
      <div
        className="absolute left-0 top-0 w-24 h-24 bg-lime-200 opacity-30 rounded-full -z-10"
        style={{ filter: "blur(24px)", transform: "translate(-30%,-30%)" }}
        aria-hidden="true"
      />
      <div
        className="absolute right-0 bottom-0 w-20 h-20 bg-lime-400 opacity-20 rounded-full -z-10"
        style={{ filter: "blur(20px)", transform: "translate(30%,30%)" }}
        aria-hidden="true"
      />
      <Image
        src={image}
        alt={name}
        width={64}
        height={64}
        className="w-16 h-16 object-cover rounded-xl border"
        unoptimized
      />
      <div className="flex-1">
        <div className="font-semibold">{name}</div>
        <div className="text-gray-500 text-sm">
          {formatPriceAUD(price)} x {amount}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors border"
          onClick={onDecrease}
          aria-label="Decrease quantity"
          disabled={amount <= 1 && !onDelete}
        >
          {amount === 1 && onDelete ? (
            <Trash2 className="w-4 h-4 text-gray-700" />
          ) : (
            <Minus className="w-4 h-4 text-gray-700" />
          )}
        </button>
        <span className="text-gray-900 font-semibold min-w-[28px] text-center text-lg">
          {amount}
        </span>
        <button
          className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors border"
          onClick={onIncrease}
          aria-label="Increase quantity"
        >
          <Plus className="w-4 h-4 text-gray-700" />
        </button>
        <button
          className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-red-100 transition-colors border ml-2"
          onClick={onDelete}
          aria-label="Delete item"
        >
          <Trash2 className="w-4 h-4 text-red-500" />
        </button>
      </div>
      <div className="font-bold ml-4 min-w-[70px] text-right">
        {formatPriceAUD(price * amount)}
      </div>
    </li>
  );
};

export default CartItem;
