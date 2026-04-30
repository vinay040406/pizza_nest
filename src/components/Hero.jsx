"use client";
import Image from "next/image";
import { Button } from "./common/Button";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{
        opacity: 1,
      }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
      }}
      className="mt-25 lg:mt-35 max-w-330 w-full mx-auto bg-[url('/assets/webp/hero-bg-image.webp')] bg-cover bg-bottom bg-no-repeat rounded-xl md:rounded-4xl pl-4 lg:pl-22.5 py-5 overflow-hidden md:py-0 flex items-center flex-col md:flex-row md:min-h-119 justify-between"
    >
      <div className="max-w-149.25 w-full flex flex-col gap-3 relative font-nunito-sans text-white">
        <Image
          src={"/assets/webp/free-delivery.webp"}
          height={172}
          width={153}
          alt="free-delivery"
          className="absolute hidden md:block -bottom-15 right-8 lg:right-4 object-cover object-center  h-auto"
        />
        <div className="flex flex-col gap-1 font-nunito-sans">
          <div className="flex flex-col gap-.5">
            <span className="text-base md:text-28px leading-150 font-medium">
              Buy 1 Pizza, Get 1 Free!
            </span>
            <h1 className="text-4xl md:text-50px italic font-extrabold leading-140">
              Medium & Large pizzas
            </h1>
          </div>
          <span className="text-lg md:text-28px font-medium leading-140 ">
            Limited Offer
          </span>
        </div>
        <Button
          variant={"primary"}
          text={"Order Now"}
          className={"px-3 md:px-7.5 py-2 md:py-3.25"}
        />
      </div>

      <div className="relative h-fit">
        <Image
          src={"/assets/webp/hero-pizza-image.webp"}
          height={377}
          width={597}
          alt="hero-pizza"
          className="md:translate-y-15 border-white h-60 w-80 sm:w-120 object-center md:h-94.25 md:w-149.25"
        />
        <Image
          src={"/assets/webp/50-discount.webp"}
          height={173}
          width={168}
          alt="50%"
          className="absolute -top-4 lg:top-1 hidden md:block -left-1 lg:-left-14 object-cover object-center"
        />
      </div>
    </motion.div>
  );
};

export default Hero;
