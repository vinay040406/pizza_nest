"use client";
import Icons from "./common/Icons";
import Tiltle from "./common/Tiltle";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Card } from "./common/Card";
import { useRef } from "react";
import { RESTAURANT_DATA } from "@/utils/helper";
import { motion } from "framer-motion";

const Restaurants = () => {
  const swiperRef = useRef();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
      }}
      className="w-full bg-whity pt-12 md:pt-25 md:pb-21"
    >
      <div className="flex max-w-285 w-full mx-auto flex-col gap-6 md:gap-10">
        <div className="flex justify-between items-center w-full">
          <Tiltle text={"Top Restaurants in Hisar"} />
          <div className="hidden md:flex gap-2 ">
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
          {RESTAURANT_DATA.map((item, index) => (
            <SwiperSlide key={index}>
              <Card
                className={"rounded-xl overflow-hidden"}
                image={item.image}
                imageHeight={160}
                imageWidth={267}
                imageClassName={"h-40 w-full object-cover object-center"}
                div={
                  <div className="p-3 flex justify-between ">
                    <div className="flex flex-col gap-1.5 font-inter">
                      <h3 className="font-bold leading-160 ">{item.name}</h3>
                      <span className="text-xs leading-160">{item.dish}</span>
                    </div>
                    <span className="h-5 w-11 bg-dark-green rounded-xs flex justify-center gap-0.5 items-center text-white ">
                      <Icons icon={"rating"} />
                      <span className="text-xs leading-100">4.0</span>
                    </span>
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

export default Restaurants;
