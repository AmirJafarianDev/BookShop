
import Link from 'next/link';
import { cookies } from 'next/headers'; 
import { CiLogin } from 'react-icons/ci';
import { CgProfile } from 'react-icons/cg';

async function Header() {
  const token=cookies().get('token')?.value
  console.log(token)

  return (
    <header className="flex justify-between w-[80%] m-auto rounded-xl mt-4 h-16 bg-blue-600">
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
        {token ? (
          <Link href={"/profile"}>
            <button className="size-10 bg-white rounded-2xl cursor-pointer">
              <CgProfile className="flex justify-center items-center m-auto text-3xl text-blue-500" />
            </button>
          </Link>
        ) : (
          <Link href="/signIn">
            <button
              className="
                flex flex-row-reverse items-center justify-center
                w-16 h-8 rounded-xl bg-white text-blue-600
                cursor-pointer gap-x-1 px-2
              "
            >
              <span>ورود</span>
              <CiLogin className="text-xl" />
            </button>
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;