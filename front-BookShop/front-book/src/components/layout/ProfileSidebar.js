"use client";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { SlLogout } from "react-icons/sl";

function ProfileSidebar({ children }) {
  const [username, setUsername] = useState(null);
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);
  const router = useRouter();

  return (
    <div className="flex justify-between mt-[40px] w-[400px] mr-[50px] md:w-100">
      <div className="flex items-center flex-col  justify-around h-64 rounded-[10px] sm:w-[350px] sm:h-80 sm:mr-[25%] w-[220px] shadow-2xl divide-solid divide-gray-400 ">
        <CgProfile className="text-4xl pt-2" />
        <p className="text-gray-500 mt-[5px] text-[1.1rem]">{username}</p>
        <span className="border-t border-gray-600"></span>
        <div className="flex flex-row flex-wrap items-center justify-around mb-5 space-y-8">
          <Link href="/profile">حساب کاربری</Link>
          <Link href="/profile/my-product">آگهی های من</Link>
          <Link href="/profile/add-product">ثبت آگهی</Link>
        </div>
        <SlLogout
          className="text-xl text-red-600 cursor-pointer"
          onClick={() => {
            Cookies.remove("token");
            router.push("/");
            router.refresh();
          }}
        />
      </div>
      <div className="w-[100%]">{children}</div>
    </div>
  );
}

export default ProfileSidebar;
