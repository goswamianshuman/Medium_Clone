import Image from "next/image";
import Link from "next/link";
function Header() {
  return (
    <header className="z-[999] flex border-b-[1.5px] sticky top-0 border-black bg-yellow-400 h-[80px] w-screen items-center justify-around ">
      <Link
        className="flex items-center justify-center max-w-max gap-3 font-bold text-2xl"
        href="/"
      >
        <Image
          src="/medium.png"
          className="object-contain "
          alt="logo"
          width={250}
          height={250}
        />
      </Link>

      <div className="flex gap-5 items-center justify-start max-w-max">
        <ul className="hidden md:flex items-center justify-center list-none gap-5 text-sm font-semibold">
          <li className="cursor-pointer opacity-80 hover:opacity-100 transition-all ease-in duration-300 ">
            Our Story
          </li>
          <li className="cursor-pointer opacity-80 hover:opacity-100 transition-all ease-in duration-300 ">
            Membership
          </li>
          <li className="cursor-pointer opacity-80 hover:opacity-100 transition-all ease-in duration-300 ">
            Write
          </li>
        </ul>

        <button className="hidden md:flex max-w-max text-black border-solid border-[1px] border-black hover:text-white hover:bg-black hover:border-none text-md font-semibold rounded-[10px] pl-6 pr-6 pt-2 pb-2 transition-all ease-out duration-300 ">
          Sign in
        </button>
        <button className="max-w-max text-white text-md font-semibold rounded-[50px] pl-4 pr-4 pt-2 pb-2 sm:pl-6 sm:pr-6 sm:pt-2 sm:pb-2 bg-black ">
          Get started
        </button>
      </div>
    </header>
  );
}

export default Header;
