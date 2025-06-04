"use client";

import { useState, useEffect } from "react";
import Card from "../module/Card.js";
import BookFilterSearch from "../module/BookFilterSearch.js";

async function getAllBooks() {
  try {
    const response = await fetch("http://localhost:3000/book/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
    if (!response.ok) {
      console.error("Failed to fetch books, status:", response.status);
      return [];
    }
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
}

function AllBookPage() {
  const [allBooks, setAllBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [filterCriteria, setFilterCriteria] = useState({
    searchTerm: "",
    minPrice: "",
    maxPrice: "",
  });

  useEffect(() => {
    async function loadBooks() {
      setIsLoading(true);
      const books = await getAllBooks();
      setAllBooks(books);
      setFilteredBooks(books);
      setIsLoading(false);
    }
    loadBooks();
  }, []);

  useEffect(() => {
    let booksToDisplay = [...allBooks];

    if (filterCriteria.searchTerm) {
      booksToDisplay = booksToDisplay.filter((book) =>
        book.title
          .toLowerCase()
          .includes(filterCriteria.searchTerm.toLowerCase())
      );
    }

    const minP = parseFloat(filterCriteria.minPrice);
    const maxP = parseFloat(filterCriteria.maxPrice);

    if (!isNaN(minP)) {
      booksToDisplay = booksToDisplay.filter(
        (book) => parseFloat(book.price) >= minP
      );
    }

    if (!isNaN(maxP)) {
      booksToDisplay = booksToDisplay.filter(
        (book) => parseFloat(book.price) <= maxP
      );
    }

    setFilteredBooks(booksToDisplay);
  }, [filterCriteria, allBooks]);

  const handleFilterApply = (criteria) => {
    setFilterCriteria(criteria);
  };

  if (isLoading) {
    return (
      <div className="flex flex-row gap-2 items-center justify-center mt-20">
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
      </div>
    );
  }

  return (
    <div className="w-[90%] sm:w-[85%] md:w-[80%] mx-auto mt-5 mb-20 px-2 sm:px-4 lg:px-6 py-5 rounded-lg">
      <BookFilterSearch onFilterApply={handleFilterApply} />
      {filteredBooks.length > 0 ? (
        <div className="flex gap-4 md:gap-6 flex-wrap justify-center sm:justify-between">
          {filteredBooks.map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-gray-700 bg-white rounded-lg shadow">
          هیچ کتابی با معیارهای جستجوی شما یافت نشد.
        </div>
      )}
    </div>
  );
}

export default AllBookPage;
