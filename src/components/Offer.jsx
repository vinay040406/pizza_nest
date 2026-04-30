import { OFFER_DATA } from "@/utils/helper";
import { Button } from "./common/Button";
import Image from "next/image";
import { motion } from "framer-motion";

const Offer = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 1.3,
        ease: "easeOut",
      }}
      className="w-full bg-whity"
    >
      <div className="max-w-285 w-full mx-auto py-12 md:py-25 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {OFFER_DATA.map((item, index) => (
          <div
            key={index}
            className="bg-[url('/assets/webp/offer-bg-image.png')] bg-cover bg-center rounded-xl flex pl-8 relative min-h-56 md:min-h-79.75 items-center overflow-hidden hover:scale-103 duration-300 ease-in-out"
          >
            {/* Pizza image */}
            <Image
              src={item.image}
              height={100}
              width={200}
              alt={item.name}
              className={`absolute  hidden lg:block pointer-events-none ${
                index === 0
                  ? "h-40 w-64 md:h-55.25 md:w-96.25 -rotate-8 object-cover -right-8 md:-right-12 bottom-0"
                  : "h-28 w-72 md:h-40.25 md:w-105 object-cover object-center -rotate-8 -right-12 md:-right-23 bottom-4 md:bottom-8"
              }`}
            />

            {/* Cloud price badge */}
            <div className="absolute right-2 md:right-12.5 top-2">
              <div className="relative">
                <Image
                  src={"/assets/webp/offer-cloud-bg-image.webp"}
                  height={109}
                  width={142}
                  alt="price"
                  className="object-cover object-center h-20 w-28 md:h-27.25 md:w-35.5"
                />
                <div className="absolute text-white top-3.5 left-7 md:top-5 md:left-11.5 text-lg md:text-2xl leading-140 text-center flex flex-col items-center">
                  <span className="text-xs md:text-base leading-160">only</span>
                  ₹ {item.price}
                </div>
              </div>
            </div>

            {/* Text content */}
            <div className="flex flex-col gap-3 md:gap-4 ">
              <div className="flex flex-col">
                <span className="leading-160 text-lg md:text-28px font-nunito bg-linear-to-r from-prime-1 to-prime-2 bg-clip-text text-transparent">
                  Delicious
                </span>
                <h4 className="text-2xl md:text-4xl text-white leading-160 uppercase font-nunito font-semibold">
                  {item.name}
                </h4>
                <span className="text-sm md:text-xl leading-160 font-nunito text-offer-time">
                  Limited Time
                </span>
              </div>
              <Button
                variant={"primary"}
                text={"Order Now"}
                className={
                  "py-2 md:py-2.75 px-3.5 text-sm md:text-base w-fit font-nunito leading-100"
                }
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Offer;
