"use client";

import React from "react";

import Link from "next/link";
import { toast } from "react-hot-toast";
import {
  PlusIcon,
  MinusIcon,
  TrashIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import useBasketStore from "@/app/store/basketStore";

function BasketPage() {
  const items = useBasketStore((state) => state.items);
  const incrementItem = useBasketStore((state) => state.incrementItemQuantity);
  const decrementItem = useBasketStore((state) => state.decrementItemQuantity);
  const removeItem = useBasketStore((state) => state.removeItemFromBasket);
  const totalAmount = useBasketStore((state) => state.getBasketTotalAmount());
  const totalItemsCount = useBasketStore((state) => state.getTotalItemsCount());
  const clearBasket = useBasketStore((state) => state.clearBasket);

  if (items.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-center p-8 bg-gray-50"
        dir="rtl"
      >
        <ShoppingBagIcon className="h-24 w-24 text-gray-300 mb-6" />
        <h2 className="text-2xl font-semibold text-gray-700 mb-3">
          سبد خرید شما خالی است!
        </h2>
        <p className="text-gray-500 mb-8">
          به نظر می‌رسد هنوز هیچ کتابی به سبد خرید خود اضافه نکرده‌اید.
        </p>
        <Link
          href="/All-Book"
          className="cursor-pointer px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-150 shadow-md text-lg"
        >
          مشاهده کتاب‌ها
        </Link>
      </div>
    );
  }

  const handleClearBasket = () => {
    clearBasket();
    toast.success("سبد خرید خالی شد.");
  };

  const formattedTotalAmount = new Intl.NumberFormat("fa-IR").format(
    totalAmount
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8" dir="rtl">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* لیست محصولات در سبد */}
        <div className="lg:w-2/3">
          <div className="flex justify-between items-center mb-6 pb-4 border-b">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              سبد خرید شما ({totalItemsCount} کالا)
            </h1>
            {items.length > 0 && (
              <button
                onClick={handleClearBasket}
                className="cursor-pointer text-sm text-red-500 hover:text-red-700 font-medium flex items-center gap-1"
              >
                <TrashIcon className="h-4 w-4" />
                خالی کردن سبد
              </button>
            )}
          </div>
          <div className="space-y-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <Link
                  href={`/book/${item.id}`}
                  className="sm:w-24 sm:h-24 w-32 h-32 flex-shrink-0"
                >
                  <img
                    src={
                      item.image
                        ? `/assets/image/${item.image}`
                        : `https://placehold.co/100x120/E2E8F0/718096?text=${encodeURIComponent(
                            item.title || "کتاب"
                          )}`
                    }
                    alt={item.title}
                    className="w-full h-full object-cover rounded"
                  />
                </Link>
                <div className="flex-grow text-right sm:mr-4 text-center sm:text-right">
                  <Link href={`/book/${item.id}`}>
                    <h2 className="text-lg font-semibold text-gray-800 hover:text-blue-600">
                      {item.title}
                    </h2>
                  </Link>
                  <p className="text-sm text-gray-500">
                    نویسنده: {item.author || "ناشناس"}
                  </p>
                  <p className="text-md font-semibold text-blue-600 mt-1">
                    {new Intl.NumberFormat("fa-IR").format(item.price)} تومان
                  </p>
                </div>
                <div className="flex items-center gap-3 mt-3 sm:mt-0">
                  <button
                    onClick={() => decrementItem(item.id)}
                    className="cursor-pointer p-1.5 rounded-full text-gray-600 hover:bg-gray-200 transition-colors"
                    aria-label="کاهش تعداد"
                  >
                    <MinusIcon className="h-5 w-5" />
                  </button>
                  <span className="text-md font-medium w-8 text-center">
                    {item.quantityInBasket}
                  </span>
                  <button
                    onClick={() => incrementItem(item.id)}
                    className="cursor-pointer p-1.5 rounded-full text-gray-600 hover:bg-gray-200 transition-colors"
                    aria-label="افزایش تعداد"
                  >
                    <PlusIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => {
                      removeItem(item.id);
                      toast.error(`"${item.title}" از سبد حذف شد.`);
                    }}
                    className="cursor-pointer p-1.5 text-red-500 hover:text-red-700"
                    aria-label="حذف محصول"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* خلاصه سبد و پرداخت */}
        <div className="lg:w-1/3">
          <div className="bg-white p-6 rounded-lg shadow-lg sticky top-24">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-4 border-b">
              خلاصه سفارش
            </h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-700">
                <span>مجموع کالاها ({totalItemsCount} عدد):</span>
                <span>{formattedTotalAmount} تومان</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>هزینه ارسال:</span>
                <span className="text-green-600">رایگان</span>{" "}
              </div>
            </div>
            <div className="flex justify-between text-xl font-bold text-gray-800 pt-4 border-t">
              <span>مبلغ قابل پرداخت:</span>
              <span>{formattedTotalAmount} تومان</span>
            </div>
            <button
              disabled={items.length === 0}
              onClick={clearBasket}
              className="cursor-pointer mt-8 w-full bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 shadow-md text-lg font-semibold transition duration-150 disabled:opacity-50"
            >
              ادامه و پرداخت
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BasketPage;
