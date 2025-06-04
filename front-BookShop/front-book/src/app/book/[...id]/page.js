import BookDetails from "@/components/templates/BookDetails";
import React from "react";

function page(req) {
  const { id } = req.params;
  return <BookDetails id={id} />;
}

export default page;
