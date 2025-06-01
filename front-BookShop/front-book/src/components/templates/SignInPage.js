"use client";
import Link from "next/link";
import { useActionState } from "react";
import { toast, Toaster } from "react-hot-toast";

function SignInPage() {
  const [state, signInAction, isPending] = useActionState(signInHandler, null);
  async function signInHandler(previousState, formData) {
    const data = Object.fromEntries(formData.entries());
    // console.log(data);
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (result?.message == "Invalid credentials") {
        toast.error("نام کاربری یا رمز عبور اشتباه است");
      } else {
        toast.success("ورود با موفقیت انجام شد");
      }
    } catch (error) {
      return { error: error.message };
    }
  }
  return (
    <form className="mt-10" action={signInAction}>
      <div className="flex items-center justify-center ">
        <div className="bg-gray-900 border-[4px] border-blue-900 rounded-2xl hover:border-blue-500 transition-all duration-200">
          <div className="mx-auto flex items-center space-y-4 py-16 px-12 font-semibold text-gray-500 flex-col">
            <h1 className="text-white text-2xl">فرم ورود</h1>
            <input
              className="w-full p-2 bg-blue-900 rounded-md border border-gray-700 focus:border-blue-700 hover:border-blue-500 transition-all duration-200"
              placeholder="نام کاربری"
              type="text"
              name="username"
            />
            <input
              className="w-full p-2 bg-blue-900 rounded-md border border-gray-700 focus:border-blue-700 hover:border-blue-500 transition-all duration-200"
              placeholder="رمز عبور"
              type="password"
              name="password"
            />
            <Toaster position="top-center" reverseOrder={false} />
            {isPending ? (
              <div className="flex flex-row gap-2">
                <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
                <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
                <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
              </div>
            ) : (
              <button className="w-full p-2 cursor-pointer bg-gray-50 rounded-full font-bold text-gray-900 border-[4px] border-gray-700 hover:border-blue-500 transition-all duration-200">
                ورود
              </button>
            )}

            <p>
              آیا حساب کاربری نداری؟
              <Link
                className="font-semibold text-white hover:text-blue-500 transition-all duration-200"
                href="/signUp"
              >
                ثبت نام
              </Link>
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}

export default SignInPage;
