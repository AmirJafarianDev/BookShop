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
  //   console.log(myProduct);

  return <Item data={myProduct} />;
}

export default MyProductPage;
