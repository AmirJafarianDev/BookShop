import Link from "next/link";
import { CiLogin } from "react-icons/ci";

function Header() {
  return (
    <header className="flex justify-between w-[80%] m-auto rounded-xl mt-4  h-16 bg-blue-600">
      <div className="flex h-14">
        <ul className="flex space-x-6 pr-4 md:pr-8 items-center justify-center ">
          <li className="text-white text-sm md:text-xl hover:text-gray-400">
            <Link href="/">صفحه اصلی</Link>
          </li>
          <li className="text-white text-sm md:text-xl hover:text-gray-400">
            <Link href="/All-Book">مشاهده کتاب ها</Link>
          </li>
        </ul>
      </div>
      <div className="flex h-8 my-auto pl-8">
        <Link href="/signIn">
          <button
            className="
            flex 
            flex-row-reverse 
            items-center   
            justify-center   
            w-16           
            h-8              
            rounded-xl 
            bg-white 
            text-blue-600 
            cursor-pointer
            gap-x-1         
            px-2        
          "
          >
            <span>ورود</span>

            <CiLogin className="text-xl" />
          </button>
        </Link>
      </div>
    </header>
  );
}

export default Header;
