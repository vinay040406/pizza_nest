"use client";
import { FOOTER_LINKS, SOCIAL_LINKS } from "@/utils/helper";
import Icons from "./Icons";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full bg-famous-bg pt-12 md:pt-20 pb-4">
      <div className="max-w-285 w-full mx-auto px-4 lg:px-0 flex flex-col gap-8">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <Link
                onClick={() => {
                  window.scroll({
                    top: 0,
                    behavior: "smooth",
                  });
                }}
                href={"/"}
                className="text-3xl md:text-42px font-medium font-poppins bg-clip-text text-transparent bg-linear-to-r from-prime-1 to-prime-2 leading-150"
              >
                Pizza Nest
              </Link>
              <p className="text-gray-footer leading-160 max-w-139.5 w-full text-sm md:text-base font-nunito">
                At Pizza Nest, we believe every slice should bring joy. Whether
                you're ordering for one or feeding a crowd, our pizzas are baked
                with care, topped with love, and delivered hot to your doorstep.
                You just taste the difference.
              </p>
            </div>
            <div className="flex gap-2 md:gap-5 w-fit">
              {SOCIAL_LINKS.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="size-9 md:size-13 flex justify-center items-center border border-transparent bg-linear-to-r from-prime-1 to-prime-2 rounded-full group hover:bg-none duration-300 ease-in-out hover:border-prime-1"
                >
                  <Icons
                    icon={item.svg}
                    pathClass={"group-hover:fill-prime-1"}
                    className={
                      "group-hover:scale-110 duration-300 ease-in md:size-6 size-4"
                    }
                  />
                </Link>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-10 md:gap-20 font-nunito">
            <div className="flex flex-col gap-3">
              <h5 className="font-semibold text-border-gray leading-160 font-nunito">
                Quick Links
              </h5>
              {FOOTER_LINKS.quickLinks.map((item, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <Link
                    href={item.href}
                    className="text-gray-footer leading-160 li text-sm md:text-base"
                  >
                    {item.text}
                  </Link>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <h5 className="font-semibold text-border-gray leading-160 font-nunito">
                Support
              </h5>
              {FOOTER_LINKS.support.map((item, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <Link
                    href={item.href}
                    className="text-gray-footer leading-160 li text-sm md:text-base"
                  >
                    {item.text}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="max-w-285 w-full mx-auto border-t-[3px] border-t-[#D1D1D166] flex justify-center items-center pt-4">
          <p className="text-gray-footer leading-160 font-nunito text-sm md:text-base text-center">
            Copyright Pizza Nest © {new Date().getFullYear()}, All rights
            reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
