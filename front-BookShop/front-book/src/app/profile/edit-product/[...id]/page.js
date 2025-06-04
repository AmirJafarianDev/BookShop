"use client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { useActionState, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function page(req) {
  const [dataOld, setDataOld] = useState({});
  const router = useRouter();
  useEffect(() => {
    const [productId] = req.params.id;
    async function fetchData(productId) {
      const product = await fetch(`http://localhost:3000/book/${productId}`);
      const data = await product.json();
      setDataOld(data);
    }
    fetchData(productId);
  }, []);
  const [state, editBookAction, isPending] = useActionState(
    editBookHandler,
    null
  );
  async function editBookHandler(previousState, formData) {
    const data = await Object.fromEntries(formData.entries());
    let imageName = "";
    if (data.image && typeof data.image.name === "string") {
      imageName = data.image.name;
    } else if (typeof data.image === "string") {
      imageName = data.image;
    }
    console.log(imageName);

    const finalData = await {
      ...data,
      author: localStorage.getItem("fullName"),
      image: imageName,
      id: dataOld.id,
    };
    // console.log(finalData)
    const token = Cookies.get("token");
    try {
      const response = await fetch(
        `http://localhost:3000/book/${finalData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(finalData),
        }
      );
      const result = await response.json();
      //   console.log(result);
      toast.success("کتاب با موفقیت اضافه شد!");
      router.push("/profile/my-product");
      router.refresh();
    } catch (error) {
      return { error: error.message };
    }
  }
  //   console.log(dataOld);
  return (
    <div className="flex flex-col items-center justify-center  mr-5 w-full">
      <div className="max-w-md bg-blue-500 w-60 md:w-90 shadow-2xl rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-200 mb-4">
          فرم ویرایش اطلاعات محصول
        </h2>

        <form className="flex flex-col" action={editBookAction}>
          <input
            placeholder="عنوان کتاب"
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            type="text"
            name="title"
            defaultValue={dataOld.title}
          />
          <input
            placeholder="تصویر کتاب"
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            type="file"
            name="image"
            defaultValue={dataOld.image}
          ></input>
          <input
            placeholder="قیمت"
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            type="text"
            name="price"
            defaultValue={dataOld.price}
          />
          <input
            placeholder="تعداد محصول"
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            type="text"
            name="quantity"
            defaultValue={dataOld.quantity}
          />

          <textarea
            placeholder="خلاصه مطالب کتاب"
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            name="summary"
            defaultValue={dataOld.summary}
          ></textarea>

          <button
            className="bg-white text-blue-500 cursor-pointer font-bold py-2 px-4 rounded-md mt-4 hover:bg-gray-600 hover:text-white transition ease-in-out duration-150"
            type="submit"
          >
            <Toaster position="top-center" reverseOrder={false} />
            {isPending ? (
              <div className="flex flex-row gap-2 items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
                <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
                <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
              </div>
            ) : (
              <span>ویرایش محصول</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default page;
