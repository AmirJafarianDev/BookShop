import EditProductPage from "@/components/templates/EditProductPage";
import React from "react";

function EditProduct({id}) {
  console.log(id)
  return <EditProductPage id={id} />;
}

export default EditProduct;
