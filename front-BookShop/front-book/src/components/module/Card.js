import Link from "next/link";
import { Suspense } from "react";

function Card({ item }) {
  console.log(item);
  return (
    <div className="relative flex w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md mt-20">
      <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 ">
        <img src={`/assets/image/${item.image}`} />
      </div>
      <div className="p-6">
        <div className="flex gap-x-4 items-center">
          <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
            عنوان کتاب :
          </h5>
          <span>{item.title}</span>
        </div>
        <div className="flex items-center gap-x-4">
          <p className="block font-semibold  text-xl leading-relaxed text-inherit antialiased">
            قیمت کتاب :
          </p>
          <span>{item.price} تومان</span>
        </div>
      </div>
      <div className="p-6 pt-0 flex justify-between">
        <Suspense
          fallback={
            <div className="flex flex-row gap-2 items-center justify-center mt-20">
              <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
              <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
              <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
            </div>
          }
        >
          <Link href={`/book/${item.id}`}>
            <button
              data-ripple-light="true"
              type="button"
              className="select-none cursor-pointer rounded-lg bg-blue-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            >
              مشاهده جزئیات
            </button>
          </Link>
        </Suspense>
        <button
          data-ripple-light="true"
          type="button"
          className="select-none cursor-pointer rounded-lg bg-blue-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        >
          افزودن به سبد خرید
        </button>
      </div>
    </div>
  );
}

export default Card;
