"use client";
import Footer from "@/components/common/Footer";
import Icons from "@/components/common/Icons";
import Navbar from "@/components/common/Navbar";
import Craving from "@/components/Craving";
import FamousDishes from "@/components/FamousDishes";
import Hero from "@/components/Hero";
import Loading from "@/components/Loading";
import Offer from "@/components/Offer";
import Restaurants from "@/components/Restaurants";
import Species from "@/components/Species";
import { Suspense, useEffect, useState } from "react";

export default function Home() {
  const [showUp, setShowUp] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowUp(window.scrollY > window.innerHeight);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <div className="px-4 xl:px-0">
          <Hero />
          <Suspense fallback={<Loading />}>
            <Species />
          </Suspense>
          <Restaurants />
          <Suspense fallback={<Loading />}>
            <FamousDishes />
          </Suspense>
          <Offer />
          {showUp && (
            <span
              onClick={() => {
                window.scroll({
                  top: 0,
                  behavior: "smooth",
                });
              }}
              className="fixed bottom-2 right-2 md:bottom-8 md:right-8 bg-linear-to-r from-prime-1 to-prime-2 text-white size-13 -rotate-90 cursor-pointer rounded-full flex justify-center items-center hover:bg-none duration-300 ease-in hover:border-prime-1 border border-transparent group"
            >
              <Icons
                icon={"arrow"}
                pathClass={"stroke-white group-hover:stroke-prime-1"}
              />
            </span>
          )}
        </div>
        <Craving />
      </main>
      <Footer />
    </>
  );
}
