"use client";
import React, { useRef } from "react";
import Icons from "./common/Icons";
import { CART_SLIDER_DATA } from "@/utils/helper";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const CartSlider = () => {
  const swiperRef = useRef();

  return (
    <div className="w-full max-w-180.5">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg md:text-2xl font-semibold font-nunito-sans leading-130">
          Complete Your Meal
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="h-9 w-9 rounded-full flex justify-center items-center bg-white-gray cursor-pointer hover:bg-prime-1 duration-300 ease-in group"
          >
            <Icons
              icon={"arrow"}
              pathClass={"group-hover:stroke-white"}
              className={"rotate-180"}
            />
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="h-9 w-9 rounded-full flex justify-center items-center bg-white-gray hover:bg-prime-1 rotate-180 cursor-pointer duration-300 ease-in group"
          >
            <Icons
              icon={"arrow"}
              pathClass={"group-hover:stroke-white"}
              className={"rotate-180"}
            />
          </button>
        </div>
      </div>
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        slidesPerView={1}
        breakpoints={{
          480: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
        }}
        slidesPerGroup={1}
        spaceBetween={20}
        loop
        className="w-full mx-0! pb-3!"
      >
        {CART_SLIDER_DATA.map((meal, index) => (
          <SwiperSlide key={index}>
            <div className="rounded-xl overflow-hidden shadow-cart font-nunito-sans cursor-pointer">
              <div className="relative h-48 md:h-63 group">
                <Image
                  src={meal.image}
                  alt={meal.name}
                  fill
                  className="object-cover group-hover:scale-97 duration-300 ease-in group-hover:rounded-xl"
                />
                <div className="absolute bottom-2.75 left-0 right-0 flex justify-between items-center px-3">
                  <span className="text-white font-medium text-base md:text-18px leading-120">
                    {meal.name}
                  </span>
                  <span className="text-white text-base md:text-xl leading-120">
                    ₹ {meal.price}
                  </span>
                </div>
              </div>
              <button className="w-full py-2 text-center font-medium leading-120 bg-white flex gap-1.5 justify-center text-xl md:text-2xl">
                + <span>Add</span>
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CartSlider;
