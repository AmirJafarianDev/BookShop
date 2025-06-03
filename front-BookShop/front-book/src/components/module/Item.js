import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function Item({ data }) {
  const router = useRouter();
  const deleteHandler = async (id) => {
    console.log(id);
    try {
      const token = Cookies.get("token");
      const response = await fetch(`http://localhost:3000/book/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      console.log(result);
      if (result.message == "success") {
        toast.success("محصول با موفقیت حذف شد!");
        router.push("/profile/my-product");
        router.refresh();
      }
    } catch (error) {
      toast.error("خطایی رخ داده!");
    }
  };
  return data ? (
    data.map((item) => (
      <div
        key={item.id}
        className="w-70 h-60 mr-2 bg-gray-200 rounded-xl shadow-2xl border-2 border-dashed border-blue-400 flex flex-col justify-evenly items-center gap-y-2"
      >
        <div>
          <span className="font-bold">عنوان : </span>
          <span>{item.title}</span>
        </div>
        <div>
          <div>
            <span className="font-bold">قیمت : </span>
            <span>{item.price}</span>
          </div>
          <div>
            <span className="font-bold">تعداد : </span>
            <span>{item.quantity}</span>
          </div>
        </div>
        <div>
          <button class=" cursor-pointer bg-gradient-to-b from-indigo-500 to-indigo-600 shadow-[0px_4px_32px_0_rgba(99,102,241,.70)] px-6 py-3 rounded-xl border-[1px] border-slate-500 text-white font-medium group">
            <div class="relative overflow-hidden">
              <p class="group-hover:-translate-y-7 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                ویرایش
              </p>
              <p class="absolute top-7 left-0 group-hover:top-0 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                ویرایش
              </p>
            </div>
          </button>
          <button
            onClick={() => {
              deleteHandler(item.id);
            }}
            class="cursor-pointer bg-gradient-to-b from-indigo-500 to-indigo-600 shadow-[0px_4px_32px_0_rgba(99,102,241,.70)] px-6 py-3 rounded-xl border-[1px] border-slate-500 text-white font-medium group"
          >
            <div class="relative overflow-hidden">
              <p class="group-hover:-translate-y-7 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                حذف
              </p>
              <p class="absolute top-7 left-0 group-hover:top-0 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                حذف
              </p>
            </div>
          </button>
        </div>
        <div>
          <button class="cursor-pointer bg-gradient-to-b from-indigo-500 to-indigo-600 shadow-[0px_4px_32px_0_rgba(99,102,241,.70)] px-6 py-3 rounded-xl border-[1px] border-slate-500 text-white font-medium group">
            <div class="relative overflow-hidden">
              <p class="group-hover:-translate-y-7 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                مشاهده جزئیات
              </p>
              <p class="absolute top-7 left-0 group-hover:top-0 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                مشاهده جزئیات
              </p>
            </div>
          </button>
        </div>
      </div>
    ))
  ) : (
    <h2>محصولی موجود ندارید!</h2>
  );
}

export default Item;
