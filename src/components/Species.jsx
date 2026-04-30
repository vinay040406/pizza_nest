"use client";
import { FILTERED_HEADING, SPECIES_DATA } from "@/utils/helper";
import Icons from "./common/Icons";
import Tiltle from "./common/Tiltle";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Card } from "./common/Card";
import { useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

const Species = () => {
  const params = useSearchParams();
  const router = useRouter();
  const handleFilterClick = (item) => {
    const current = params.get("type");
    const value = item.value;
    if (value === "all") {
      router.push("?", { scroll: false });
      return;
    }
    const next = current === value ? null : value;
    router.push(next ? `?type=${next}` : "?", { scroll: false });
  };

  const swiperRef = useRef();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{
        opacity: 1,
      }}
      transition={{
        duration: 2.5,
      }}
      className="w-full pt-12 md:pt-25 md:pb-21 bg-whity"
    >
      <div className="max-w-285 w-full mx-auto flex flex-col gap-6 md:gap-10">
        <div className="flex flex-wrap gap-3">
          {FILTERED_HEADING.map((item, index) => (
            <div
              key={index}
              onClick={() => handleFilterClick(item)}
              className={`border rounded-sm px-4 py-1.75 ${item.value === "all" ? "" : "cursor-pointer"} text-species-heading ${params.get("type") === item.value ? item.color : "border-border-gray/24"}`}
            >
              <div className="flex gap-1 items-center justify-center font-nunito-sans">
                <Icons icon={item.svg} />
                <span className="text-base md:text-xl leading-120 whitespace-nowrap">
                  {item.text}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <Tiltle text={"What pizza would you like to eat?"} />
          <div className="hidden md:flex gap-2 ">
            <span
              onClick={() => {
                console.log("swiper ref:", swiperRef.current);
                swiperRef.current?.slidePrev();
              }}
              className="h-8 w-8 rounded-full flex justify-center items-center bg-white-gray cursor-pointer hover:bg-prime-1 duration-300 ease-in group"
            >
              <Icons
                icon={"arrow"}
                pathClass={"group-hover:stroke-white"}
                className={"rotate-180"}
              />
            </span>
            <span
              onClick={() => swiperRef.current?.slideNext()}
              className="h-8 w-8 rounded-full flex justify-center items-center bg-white-gray rotate-180 cursor-pointer group hover:bg-prime-2 duration-300 ease-in"
            >
              <Icons
                icon={"arrow"}
                pathClass={"group-hover:stroke-white"}
                className={"rotate-180"}
              />
            </span>
          </div>
        </div>

        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          slidesPerView={1}
          breakpoints={{
            480: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          slidesPerGroup={1}
          spaceBetween={24}
          className="w-full pb-4!"
          loop
        >
          {SPECIES_DATA.filter((item) => {
            const type = params.get("type");
            if (type === "all") return true;
            if (type === "vegetarian") return item.veg === "veg";
            if (type === "non-vegetarian") return item.veg === "non-veg";
            return true;
          }).map((item, index) => (
            <SwiperSlide key={index}>
              <Card
                className={"rounded-xl overflow-hidden"}
                image={item.image}
                imageHeight={213}
                imageWidth={267}
                imageClassName={
                  "h-53.25 w-66.75 object-cover object-center w-full"
                }
                div={
                  <div className="py-1.5 flex items-center justify-center text-xl md:text-2xl font-roboto leading-150">
                    {item.text}
                  </div>
                }
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="md:hidden flex gap-2 ">
        <span
          onClick={() => swiperRef.current?.slidePrev()}
          className="h-8 w-8 rounded-full flex justify-center items-center bg-white-gray cursor-pointer hover:bg-prime-1 duration-300 ease-in group"
        >
          <Icons
            icon={"arrow"}
            pathClass={"group-hover:stroke-white"}
            className={"rotate-180"}
          />
        </span>
        <span
          onClick={() => swiperRef.current?.slideNext()}
          className="h-8 w-8 rounded-full flex justify-center items-center bg-white-gray rotate-180 cursor-pointer group hover:bg-prime-2 duration-300 ease-in"
        >
          <Icons
            icon={"arrow"}
            pathClass={"group-hover:stroke-white"}
            className={"rotate-180"}
          />
        </span>
      </div>
    </motion.div>
  );
};

export default Species;
