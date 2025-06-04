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
    <div className="flex h-60 w-fit mt-[40px] mr-[155px]">
      <div className="flex-shrink-0 w-[220px] sm:w-[300px] flex items-center flex-col justify-around h-64 rounded-[10px] shadow-2xl divide-solid divide-gray-400 ">
        <CgProfile className="text-4xl pt-2" />
        <p className="text-gray-500 mt-[5px] text-[1.1rem]">{username}</p>
        <span className="border-t border-gray-600"></span>
        <div className="flex flex-col gap-y-0.5 flex-wrap items-center justify-around mb-5 space-y-8">
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
      <div className="flex-1 ml-4">{children}</div>
    </div>
  );
}

export default ProfileSidebar;
