"use client";

import Link from "next/link";
import { SlBasket } from "react-icons/sl";

import { useEffect, useState } from "react";
import useBasketStore from "@/app/store/basketStore";

function BasketIconClient() {
  const [isMounted, setIsMounted] = useState(false);
  const totalItems = useBasketStore((state) => state.getTotalItemsCount());

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const displayCount = isMounted ? totalItems : 0;

  return (
    <Link href={"/basket"} className="relative">
      <div className="size-10 bg-white rounded-xl flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
        {displayCount > 0 && (
          <div className="absolute flex items-center justify-center -top-2 -right-2 size-5 rounded-full bg-red-500 text-white text-xs font-semibold">
            <span>{displayCount > 9 ? "9+" : displayCount}</span>
          </div>
        )}
        <SlBasket className="text-blue-500 text-xl" />
      </div>
    </Link>
  );
}

export default BasketIconClient;
