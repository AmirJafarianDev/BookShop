import {
  ShoppingCartIcon,
  TagIcon,
  UserCircleIcon,
  BookOpenIcon,
  ArchiveBoxIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

async function BookDetails({ id }) {
  let bookData = null;
  let fetchError = null;

  try {
    const response = await fetch(`http://localhost:3000/book/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const apiResponse = await response.json();

    bookData = apiResponse;
  } catch (error) {
    console.error("Error fetching book details:", error);
    fetchError = error.message;
  }

  if (fetchError) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 text-center"
        dir="rtl"
      >
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-lg w-full">
          <InformationCircleIcon className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-red-700 mb-3">خطا!</h2>
          <p className="text-gray-600 mb-1">
            متاسفانه در بارگذاری اطلاعات کتاب مشکلی پیش آمد.
          </p>
          <p className="text-sm text-gray-500 bg-red-50 p-3 rounded border border-red-200 break-words">
            {fetchError}
          </p>
          <a
            href="/"
            className="mt-6 inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-150 shadow-md hover:shadow-lg"
          >
            بازگشت به صفحه اصلی
          </a>
        </div>
      </div>
    );
  }

  if (!bookData || Object.keys(bookData).length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 text-center"
        dir="rtl"
      >
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-lg w-full">
          <InformationCircleIcon className="h-16 w-16 text-orange-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-orange-600 mb-3">
            کتاب یافت نشد
          </h2>
          <p className="text-gray-600">
            کتابی با این مشخصات در سیستم موجود نیست.
          </p>
          <a
            href="/"
            className="mt-6 inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-150 shadow-md hover:shadow-lg"
          >
            بازگشت به صفحه اصلی
          </a>
        </div>
      </div>
    );
  }

  const {
    title = "بدون عنوان",
    summary = "توضیحات برای این کتاب ارائه نشده است.",
    author = "ناشناس",
    price = 0,
    image,
    quantity = 0,
  } = bookData;

  const formattedPrice = new Intl.NumberFormat("fa-IR").format(price);

  return (
    <div
      className="w-[80%] mr-[10%]  min-h-screen py-8 sm:py-12 px-4 sm:px-6 lg:px-8 text-right"
      dir="rtl"
    >
      <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="w-full h-64 sm:h-80 md:h-96 bg-gray-200">
          <img
            className="w-full h-full object-cover"
            src={`/assets/image/${image}`}
            alt={`جلد کتاب ${title}`}
          />
        </div>

        <div className="p-6 sm:p-8 md:p-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight text-center md:text-right">
            {title}
          </h1>

          <div className="mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-gray-200">
            <h2 className="text-xl sm:text-2xl font-semibold text-blue-700 mb-3 flex items-center">
              <BookOpenIcon className="h-6 w-6 sm:h-7 sm:w-7 ml-3 text-blue-600" />
              خلاصه کتاب
            </h2>
            <p className="text-gray-700 leading-relaxed sm:leading-loose text-justify whitespace-pre-line">
              {summary}
            </p>
          </div>

          <div className="space-y-5">
            <div className="flex items-center text-gray-700 text-lg">
              <UserCircleIcon className="h-6 w-6 ml-3 text-gray-500" />
              <span className="font-medium">نویسنده:</span>
              <span className="mr-2">{author}</span>
            </div>

            <div className="flex items-center text-gray-700 text-lg">
              <ArchiveBoxIcon className="h-6 w-6 ml-3 text-gray-500" />
              <span className="font-medium">موجودی:</span>
              <span className="mr-2">
                {quantity > 0 ? (
                  `${quantity} عدد`
                ) : (
                  <span className="text-red-600 font-semibold">ناموجود</span>
                )}
              </span>
            </div>

            <div className="flex items-baseline text-2xl sm:text-3xl font-bold text-green-600 pt-2">
              <TagIcon className="h-7 w-7 sm:h-8 sm:w-8 ml-3 text-green-500" />
              <span className="font-medium">قیمت:</span>
              <span className="mr-2">{formattedPrice}</span>
              <span className="text-lg sm:text-xl font-normal mr-1">تومان</span>
            </div>
          </div>
          <Link href={"/All-Book"}>
            <div className="mt-8 sm:mt-10">
              <button
                type="button"
                className={`cursor-pointer w-full flex items-center justify-center px-8 py-3.5 sm:py-4 border border-transparent text-base sm:text-lg font-medium rounded-xl text-white transition duration-150 ease-in-out
                                ${
                                  quantity > 0
                                    ? "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
                                    : "bg-gray-400 cursor-not-allowed"
                                }
                                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 shadow-lg hover:shadow-xl transform hover:scale-105`}
              >
                بازگشت به صفحه قبلی
              </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
