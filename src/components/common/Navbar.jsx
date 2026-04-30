"use client";
import Link from "next/link";
import Icons from "./Icons";
import { NAV_LINKS } from "@/utils/helper";
import { useCart } from "../CartProvider";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [user, setUser] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("user"));
    setUser(saved);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const router = useRouter();
  const { cartItem, setCartItem } = useCart();

  const handleLogOut = () => {
    Swal.fire({
      title: "Log out?",
      text: "Are you sure you want to log out of your account?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Log Out",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#e53935",
      cancelButtonColor: "#6b7280",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("user");
        localStorage.removeItem("products");
        localStorage.removeItem("quantities");
        setCartItem(0);
        setUser(null);
        Swal.fire({
          title: "Logged Out",
          text: "You have been successfully logged out.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        router.push("/");
      }
    });
  };

  return (
    <div
      ref={navRef}
      className="w-full shadow-top py-3 lg:pt-6 lg:pb-7.5 fixed top-0 left-0  bg-white px-4 z-50"
    >
      <header className="max-w-285 w-full mx-auto flex items-center">
        {/* Logo */}
        <Link
          onClick={() => {
            setMenuOpen(false);
            window.scroll({
              top: 0,
              behavior: "smooth",
            });
          }}
          href={"/"}
          className="text-2xl md:text-34px font-medium font-nunito-sans bg-clip-text text-transparent bg-linear-to-r from-prime-1 to-prime-2 leading-135 whitespace-nowrap"
        >
          Pizza Nest
        </Link>
        {/*  FIXED LOCATION LINK */}
        <a
          href="https://www.google.com/maps?q=Hisar+India"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden lg:flex items-center border-r border-r-border-white gap-1 ml-4 xl:ml-15.75 pr-2.25 lg:pt-1"
        >
          <Icons icon={"location"} />
          <div className="flex flex-col pb-0.5 gap-px">
            <span className="text-xs leading-110 font-roboto text-gray">
              Location
            </span>
            <span className="font-nunito leading-100">
              Hisar, Haryana 125001
            </span>
          </div>
        </a>
        {/* Search */}
        <div className="hidden md:relative md:flex gap-2.25 border border-border-white py-2.75 ml-8 xl:ml-11.5 items-center lg:max-w-80 xl:max-w-109.25 w-full rounded-lg px-3">
          <Icons icon={"search"} />
          <input
            type="text"
            placeholder="Search for what you want..."
            className="absolute inset-0 px-10.25  outline-prime-2 placeholder:text-placeholder text-gray rounded-lg "
          />
        </div>
        {/* Nav Links */}
        <Link
          href={"/cart"}
          className={`md:hidden fixed right-18 cursor-pointer`}
        >
          <Icons pathClass={"group-hover:stroke-prime-1"} icon={"cart"} />
          <span className="absolute -top-2 -right-3 bg-red text-whity text-[10px] font-inter flex justify-center items-center rounded-full size-5">
            {cartItem || 0}
          </span>
        </Link>
        <div className="hidden md:flex justify-between max-w-48.75 w-full ml-8">
          {NAV_LINKS.map((item, index) => (
            <Link
              href={item.text === "Login" ? (user ? "#" : "/login") : item.href}
              key={index}
              className={`${item.text ? "flex gap-0.5 items-center" : "relative"} group ${item.text && "li"}`}
            >
              <span className={`${item.svg === "cart" ? "relative" : ""}`}>
                <Icons
                  icon={item.svg}
                  pathClass={"group-hover:stroke-prime-1"}
                />
                {item.svg === "cart" && (
                  <span className="absolute -top-2 -right-3 bg-red text-whity text-[10px] font-inter flex justify-center items-center rounded-full size-5">
                    {cartItem || 0}
                  </span>
                )}
              </span>
              {item.text && (
                <span className="leading-110 text-dummy-blue font-nunito group-hover:text-prime-1">
                  {item.text === "Login" ? (
                    user ? (
                      <span
                        onClick={handleLogOut}
                        className="leading-110 text-dummy-blue font-nunito group-hover:text-prime-1"
                      >
                        Log Out
                      </span>
                    ) : (
                      item.text
                    )
                  ) : (
                    item.text
                  )}
                </span>
              )}
            </Link>
          ))}
        </div>
        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="ml-auto md:hidden flex flex-col gap-1.5 cursor-pointer"
        >
          <span
            className={`block h-0.5 w-6 bg-gray-800 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 bg-gray-800 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 bg-gray-800 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </header>
      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-white px-4 pb-5 flex flex-col gap-4 border-t border-border-white mt-3 overflow-hidden"
          >
            {/* Search */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="relative flex gap-2.25 border border-border-white py-2.25 items-center w-full rounded-lg px-3 mt-3 max-w-100"
            >
              <Icons icon={"search"} />
              <input
                type="text"
                placeholder="Search for what you want..."
                className="absolute inset-0 px-10.25 outline-prime-2 placeholder:text-placeholder text-gray truncate rounded-lg "
              />
            </motion.div>

            {NAV_LINKS.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.07 }}
              >
                <Link
                  href={
                    item.text === "Login" ? (user ? "#" : "/login") : item.href
                  }
                  onClick={() => setMenuOpen(false)}
                  className="flex gap-2 items-center text-dummy-blue font-nunito group li"
                >
                  <span
                    className={`${item.svg === "cart" ? "relative" : ""} ${item.svg === "cart" && "md:block hidden"}`}
                  >
                    <Icons
                      icon={item.svg}
                      pathClass={"group-hover:stroke-prime-1"}
                    />
                    {item.svg === "cart" && (
                      <span className="absolute -top-2 -right-3 bg-red text-whity text-[10px] font-inter flex justify-center items-center rounded-full size-5">
                        {cartItem || 0}
                      </span>
                    )}
                  </span>
                  {item.text && (
                    <span className="leading-110 text-dummy-blue font-nunito group-hover:text-prime-1">
                      {item.text === "Login" ? (
                        user ? (
                          <span
                            onClick={handleLogOut}
                            className="leading-110 text-dummy-blue font-nunito group-hover:text-prime-1"
                          >
                            Log Out
                          </span>
                        ) : (
                          item.text
                        )
                      ) : (
                        item.text
                      )}
                    </span>
                  )}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
