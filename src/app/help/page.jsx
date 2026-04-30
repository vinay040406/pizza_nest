"use client";
import { Button } from "@/components/common/Button";
import { HELP_DATA } from "@/utils/helper";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import React from "react";

const Page = () => {
  const router = useRouter();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="min-h-full mt-35 mb-10 md:my-35 flex items-center justify-center bg-whity px-4 md:px-6 font-poppins "
    >
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
      <div className="max-w-3xl w-full bg-white shadow-md rounded-xl p-5 md:p-8 flex flex-col gap-5 md:gap-6">
        <h1 className="text-2xl md:text-3xl font-bold text-center">
          Help & Support 🍕
        </h1>

        <p className="text-gray-600 text-center text-sm md:text-base">
          Need assistance? We're here to help you with your Pizza Nest
          experience.
        </p>

        <div className="flex flex-col gap-4 text-gray-700">
          {HELP_DATA.map((item, index) => (
            <div key={index}>
              <h3 className="font-semibold text-base md:text-lg">
                {item.title}
              </h3>
              <p className="text-xs md:text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button
            text={"Contact Support"}
            variant={"primary"}
            className="px-6 md:px-8 py-2 md:py-2.5 w-full sm:w-auto"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Page;
