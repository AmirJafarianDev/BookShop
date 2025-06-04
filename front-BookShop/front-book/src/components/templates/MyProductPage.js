"use client";

import { useEffect, useState } from "react";
import Item from "../module/Item";

function MyProductPage() {
  const [myProduct, setMyProduct] = useState([]);
  useEffect(() => {
    async function getMyProducts() {
      const author = localStorage.getItem("fullName");
      if (!author) {
        setMyProduct([]);
        return;
      }

      const response = await fetch("http://localhost:3000/book/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (result && Array.isArray(result.data)) {
        const filteredProducts = result.data.filter(
          (item) => item.author === author
        );
        setMyProduct(filteredProducts);
      }
    }
    getMyProducts();
  }, [myProduct]);


  return (
    <div className="w-[80%] flex justify-center md:justify-between flex-wrap md:gap-y-2">
    <Item data={myProduct} />
    </div>
);
}

export default MyProductPage;
