"use client";
import { Button } from "@/components/common/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const page = () => {
  const [input, setInput] = useState();
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("user", true);
    router.push("/");
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 sm:px-6">
      <Button
        initial={{ opacity: 0, x: -20 }}
        whileInView={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        onClick={() => router.push("/")}
        text={"Go Back"}
        className="fixed top-20 md:top-25 lg:top-35 left-4 z-20 px-4 py-1.5 rounded-lg bg-black text-whity text-base md:text-xl hover:-translate-x-2 duration-300 ease-in"
      />
      <div className="py-10 sm:py-16 md:py-20 px-4 sm:px-6 border border-prime-1 rounded-lg w-full max-w-md md:max-w-125.5 flex flex-col gap-8 sm:gap-12 md:gap-15">
        <div className="flex flex-col gap-4 sm:gap-5">
          <h3 className="text-2xl sm:text-3xl md:text-32px font-semibold leading-150 font-roboto text-center sm:text-left">
            Log In
          </h3>

          <form
            action=""
            onSubmit={(e) => handleSubmit(e)}
            className="flex flex-col gap-4 sm:gap-5"
          >
            <input
              required
              type="email"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
              placeholder="Email"
              className="w-full rounded-md p-3 text-sm sm:text-base text-login-placeholder border border-border-gray/12 outline-prime-2"
            />

            <Button
              text={"Login"}
              className={"w-full py-3 sm:py-4 font-semibold"}
              variant={"primary"}
            />
          </form>
        </div>

        <div className="border-t border-border-gray/12 pt-4 sm:pt-5 text-center sm:text-left">
          <p className="text-xs sm:text-sm leading-160 text-border-gray/20">
            New to Pizza Nest ?{" "}
            <Link href={"/register"} className="text-prime-1">
              Create an Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
