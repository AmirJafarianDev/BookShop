// components/module/BookFilterSearch.js
"use client";

import { useState } from "react";

function BookFilterSearch({ onFilterApply }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleApplyFilter = () => {
    onFilterApply({
      searchTerm: searchTerm.trim(),
      minPrice: minPrice.trim(),
      maxPrice: maxPrice.trim(),
    });
  };

  const inputClassName =
    "w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-right placeholder-gray-400";
  const labelClassName =
    "block text-sm font-medium text-gray-700 mb-1 text-right";
  const sectionTitleClassName =
    "text-lg font-semibold text-gray-800 mb-3 text-right";

  return (
    <div className="p-4 sm:p-6 mb-6 bg-white rounded-xl shadow-lg space-y-6">
      <div>
        <label htmlFor="searchBook" className={labelClassName}>
          جستجوی کتاب (بر اساس عنوان)
        </label>
        <input
          type="text"
          id="searchBook"
          placeholder="مثلا: روانشناسی تاریک"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={inputClassName}
        />
      </div>

      <div>
        <p className={sectionTitleClassName}>فیلتر برحسب قیمت</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
          <div>
            <label htmlFor="minPrice" className={labelClassName}>
              کمترین قیمت (تومان)
            </label>
            <input
              type="number"
              id="minPrice"
              placeholder="مثلا: 1000"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className={inputClassName}
              min="0"
            />
          </div>
          <div>
            <label htmlFor="maxPrice" className={labelClassName}>
              بیشترین قیمت (تومان)
            </label>
            <input
              type="number"
              id="maxPrice"
              placeholder="مثلا: 50000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className={inputClassName}
              min="0"
            />
          </div>
        </div>
      </div>

      <div>
        <button
          onClick={handleApplyFilter}
          className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-md transition duration-150 ease-in-out"
        >
          اعمال فیلتر
        </button>
      </div>
    </div>
  );
}

export default BookFilterSearch;
