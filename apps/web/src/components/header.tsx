"use client";

import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/contexts/user-context";

import Image from "next/image";

import Link from "next/link";

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { userData, setUserData } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const controlNavbar = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
        setIsMenuOpen(false);
      } else {
        setIsVisible(true);
      }

      lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", controlNavbar);

    return () => window.removeEventListener("scroll", controlNavbar);
  }, []);

  async function handleLogout() {
    try {
      await fetch("http://localhost:2012/api/v1/auth/logout", {
        method: "DELETE",
        credentials: "include",
      });
      setUserData(null);
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <header
      className={`fixed z-50 w-full py-3 shadow-md bg-black transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-[72px]"
      }`}
    >
      <div className="mx-auto flex w-full max-w-[1100px] items-center justify-between px-4 font-medium text-white">
        <div className="flex overflow-hidden justify-between items-center  px-5 h-10">
          <Link
            href="/"
            className="relative text-xl font-bold text-gray-900 w-36 h-36 md:block"
          >
            <Image
              src={"/logo-minpro-2.png"}
              alt="blog logo"
              fill
              className="bg-black"
            />
          </Link>
        </div>

        <button
          className="block md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path
                  d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
                  fill="#FFFFFF"
                />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path
                  d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"
                  fill="#FFFFFF"
                />
              </svg>
            )}
          </svg>
        </button>

        <nav className="hidden md:block">
          <ul className="flex gap-6 rounded-full">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/events">Events</Link>
            </li>
            <li>
              <Link href="/information">Information</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
          </ul>
        </nav>

        {userData ? (
          <div className="grid grid-cols-3">
            <p>Hi,</p>
            <Link
              href={`/dashboard/${userData.role === "CUSTOMER" ? "customer" : "event-organizer"}`}
              className="font-bold"
            >
              {userData.name}
            </Link>
            <button
              className="bg-black hover:bg-gray-800 transition px-2  rounded-2xl"
              onClick={handleLogout}
            >
              {" "}
              Log out
            </button>
          </div>
        ) : (
          <nav className="hidden md:block">
            <ul className="flex gap-3">
              <li>
                <Link
                  className=" text-white hover:text-white hover:bg-white/10 px-4 rounded-full"
                  href="/auth/login"
                >
                  {" "}
                  Sign In
                </Link>
              </li>
              <li>
                <Link
                  className=" text-white hover:text-white  hover:bg-rose-600 transition px-4 rounded-2xl"
                  href="/auth/register"
                >
                  {" "}
                  Register
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>

      {isMenuOpen && (
        <div className="mt-3 px-4 md:hidden">
          <nav className="px-4 py-3 text-center text-white">
            <ul className="space-y-8">
              <li>
                <Link href="/" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="./events"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  href="./information"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  Information
                </Link>
              </li>
              <li>
                <Link href="./about" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                  About
                </Link>
              </li>

              <li className="flex flex-cols items-center text-center justify-center gap-3 pt-2">
                <Link
                  className=" text-white hover:text-white hover:bg-white/10 px-4 rounded-full relative block h-[30px] w-[30px]"
                  href="/auth/login"
                >
                  Sign In
                </Link>
                <Link
                  className="bg-rose-600 hover:bg-rose-700 px-4 rounded-full relative block h-[30px] w-[30px]"
                  href="/auth/register"
                >
                  Register
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
    // <section
    //   className={`fixed z-50 w-full py-3 shadow-md backdrop-blur-2xl transition-transform duration-300 ${
    //     isVisible ? "translate-y-0" : "-translate-y-[72px]"
    //   }`}
    // >
    //   <div className="mx-auto w-full flex z-50 items-center max-w-[1100px] justify-between px-4 text-white font-bold">
    //     <button
    //       className="block md:hidden"
    //       onClick={() => setIsMenuOpen(!isMenuOpen)}
    //     >
    //       {" "}
    //       <svg
    //         className="h-6 w-6"
    //         fill="none"
    //         stroke="currentColor"
    //         viewBox="0 0 24 24"
    //         xmlns="http://www.w3.org/2000/svg"
    //       >
    //         {isMenuOpen ? (
    //           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
    //             <path
    //               d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
    //               fill="#FFFFFF"
    //             />
    //           </svg>
    //         ) : (
    //           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
    //             <path
    //               d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"
    //               fill="#FFFFFF"
    //             />
    //           </svg>
    //         )}
    //       </svg>
    //     </button>

    //     <nav className=" md:flex gap-6 justify-between mx-auto grid grid-cols-7 ">
    //       {navLinks.map((link) => (
    //         <Link
    //           key={link.name}
    //           href={link.href}
    //           className="text-sm font-medium text-white/80 transition-colors hover:text-red-500"
    //         >
    //           {link.name}
    //         </Link>
    //       ))}
    //       <div className="gap-7  grid grid-cols-2 justify-between">
    //         <button className="justify-start text-white hover:text-white hover:bg-white/10 px-4 rounded-full">
    //           <Link href="./auth/login"></Link>Sign In
    //         </button>
    //         <button className="bg-rose-600 hover:bg-rose-700 px-4 rounded-full">
    //           Buy Tickets
    //         </button>
    //       </div>
    //     </nav>
    //   </div>

    //   {isMenuOpen && (
    //     <div className="flex flex-col gap-6 mt-8">
    //       {navLinks.map((link) => (
    //         <Link
    //           key={link.name}
    //           href={link.href}
    //           className="text-lg font-medium text-white/80 transition-colors hover:text-red-500"
    //         >
    //           {link.name}
    //         </Link>
    //       ))}
    //     </div>
    //   )}
    // </section>
  );
}
