"use client";
import { useState, useMemo, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Tiltle from "./common/Tiltle";
import {
  FAMOUS_DISHES_DATA,
  FILTER_LEFT,
  FILTER_RIGHT,
  MUTEX_GROUPS,
} from "@/utils/helper";
import { Card } from "./common/Card";
import Icons from "./common/Icons";
import { Button } from "./common/Button";
import Swal from "sweetalert2";
import { useCart } from "./CartProvider";
import { motion } from "framer-motion";

const PAGE_SIZE = 8;
const PAGE_2_SIZE = 12;
const PAGE_3_SIZE = 16;

const toSlug = (label) =>
  label
    .toLowerCase()
    .replace(/[\s:]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

const fromSlug = (slug) =>
  [...FILTER_LEFT, ...FILTER_RIGHT].find((f) => toSlug(f) === slug) ?? null;

const FamousDishes = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [cartText, setCartText] = useState(-1);
  const [saved, setSaved] = useState(null);

  useEffect(() => {
    setSaved(localStorage.getItem("user"));
  }, []);

  const { setCartItem } = useCart();

  const currentPage = Number(searchParams.get("page")) || 1;

  const activeFilters = useMemo(() => {
    const raw = searchParams.get("filters");
    if (!raw) return ["All"];
    const labels = raw.split("|").map(fromSlug).filter(Boolean);
    return labels.length > 0 ? labels : ["All"];
  }, [searchParams]);

  const handleFilter = (item) => {
    let updated;

    if (item === "All") {
      // Keep right side filters, reset left to All
      const rightFilters = activeFilters.filter((f) =>
        FILTER_RIGHT.includes(f),
      );
      updated = ["All", ...rightFilters];
    } else {
      const isRightFilter = FILTER_RIGHT.includes(item);
      const withoutAll = activeFilters.filter((f) => f !== "All");
      const mutexGroup = MUTEX_GROUPS.find((group) => group.includes(item));
      const siblings = mutexGroup ? mutexGroup.filter((f) => f !== item) : [];

      if (withoutAll.includes(item)) {
        // Deselect item
        updated = withoutAll.filter((f) => f !== item);
        // If no left filter remains, restore All
        const hasLeftFilter = updated.some(
          (f) => FILTER_LEFT.includes(f) && f !== "All",
        );
        if (!hasLeftFilter)
          updated = ["All", ...updated.filter((f) => FILTER_RIGHT.includes(f))];
      } else {
        // Select item, remove mutex siblings
        updated = [...withoutAll.filter((f) => !siblings.includes(f)), item];
        // Keep All if selecting a right filter with no left filter active
        const hasLeftFilter = updated.some(
          (f) => FILTER_LEFT.includes(f) && f !== "All",
        );
        if (!hasLeftFilter && isRightFilter) {
          updated = ["All", ...updated];
        }
      }
    }

    // Build URL — only put non-All filters in URL
    const urlFilters = updated.filter((f) => f !== "All");
    const filtersQuery =
      urlFilters.length > 0
        ? `filters=${urlFilters.map(toSlug).join("|")}`
        : "";
    const itemsQuery = `page=1`;
    const query = [filtersQuery, itemsQuery].filter(Boolean).join("&");
    router.push(`?${query}`, { scroll: false });
  };

  const filteredData = useMemo(() => {
    let data = [...FAMOUS_DISHES_DATA];

    if (activeFilters.includes("Vegetarian")) {
      data = data.filter((item) => item.veg === true);
    } else if (activeFilters.includes("Non-Vegetarian")) {
      data = data.filter((item) => item.veg === false);
    }

    const hasSortFilter =
      activeFilters.includes("Top Rated") ||
      activeFilters.includes("Price : Low to High") ||
      activeFilters.includes("Price : High to Low");

    if (hasSortFilter) {
      data = [...data].sort((a, b) => {
        if (activeFilters.includes("Top Rated")) {
          const ratingDiff = parseFloat(b.rating) - parseFloat(a.rating);
          if (ratingDiff !== 0) return ratingDiff;
        }
        if (activeFilters.includes("Price : Low to High")) {
          return parseFloat(a.price) - parseFloat(b.price);
        }
        if (activeFilters.includes("Price : High to Low")) {
          return parseFloat(b.price) - parseFloat(a.price);
        }
        return 0;
      });
    }

    return data;
  }, [activeFilters]);

  const visibleCount =
    currentPage === 1
      ? PAGE_SIZE
      : currentPage === 2
        ? PAGE_2_SIZE
        : PAGE_3_SIZE;

  const visibleData = filteredData.slice(0, visibleCount);
  const hasMore =
    (currentPage === 1 && filteredData.length > PAGE_SIZE) ||
    (currentPage === 2 && filteredData.length > PAGE_2_SIZE);

  const isActive = (item) => {
    if (item === "All") {
      return !activeFilters.some((f) => FILTER_LEFT.includes(f) && f !== "All");
    }
    return activeFilters.includes(item);
  };

  const filterButtonClass = (item) =>
    `${
      isActive(item)
        ? "border-transparent bg-linear-to-r from-prime-1 to-prime-2 text-whity"
        : "border-text-gray text-text-gray"
    } flex justify-center py-2.5 rounded-xl border font-nunito font-semibold leading-130 cursor-pointer text-sm md:text-base`;

  const handleAddToCart = (item, index) => {
    if (!saved) {
      Swal.fire({
        title: "Login Required",
        text: "Please login to add items to cart",
        icon: "warning",
        confirmButtonText: "Go to Login",
      }).then((result) => {
        if (result.isConfirmed) router.push("/login");
      });
      return;
    }

    if (cartText === index) {
      router.push("/cart");
      return;
    }

    setCartText(index);

    const raw = JSON.parse(localStorage.getItem("products")) || [];
    const existing = raw.filter(
      (item, index, self) => index === self.findIndex((p) => p.id === item.id),
    );
    const existingQtys = JSON.parse(localStorage.getItem("quantities")) || {};
    const alreadyExists = existing.find(
      (p) => String(p.id) === String(item.id),
    );

    if (alreadyExists) {
      existingQtys[String(item.id)] = (existingQtys[String(item.id)] || 1) + 1;
    } else {
      existing.push(item);
      existingQtys[String(item.id)] = 1;
    }

    localStorage.setItem("products", JSON.stringify(existing));
    localStorage.setItem("quantities", JSON.stringify(existingQtys));
    setCartItem(existing.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full pt-12 md:py-25 bg-famous-bg"
    >
      <div className="max-w-285 w-full mx-auto gap-6 md:gap-10 flex flex-col items-center">
        <div className="flex flex-col gap-5 md:gap-8 w-full">
          <Tiltle text={"Famous Dishes in Hisar"} />
          <div className="w-full max-w-272.5 flex flex-col sm:flex-row justify-between gap-3 md:gap-3.5">
            <div className="flex gap-2 md:gap-3.5 flex-1">
              {FILTER_LEFT.map((item, index) => (
                <span
                  key={index}
                  onClick={() => handleFilter(item)}
                  className={`${filterButtonClass(item)} flex-1 text-[10.5px] md:text-base text-center items-center leading-100`}
                >
                  {item}
                </span>
              ))}
            </div>
            <div className="flex gap-2 md:gap-3.5 flex-1 sm:justify-end">
              {FILTER_RIGHT.map((item, index) => (
                <span
                  key={index}
                  onClick={() => handleFilter(item)}
                  className={`${filterButtonClass(item)} flex-1 text-[10.5px] md:text-base text-center items-center leading-100`}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {visibleData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 md:gap-x-6 w-full gap-y-10">
            {visibleData.map((item, index) => (
              <div key={item.id}>
                <Card
                  image={item.image}
                  imageHeight={192}
                  imageWidth={267}
                  imageClassName={"object-cover object-center h-48 w-full"}
                  className={"rounded-lg overflow-hidden"}
                  div={
                    <div className="flex flex-col p-3">
                      <div className="flex justify-between font-inter">
                        <div className="flex flex-col gap-0.5">
                          <h3 className="font-bold leading-140 text-xl">
                            {item.name}
                          </h3>
                          <span className="text-xs leading-160">
                            {item.location}
                          </span>
                        </div>
                        <span className="h-5 w-11 bg-dark-green rounded-xs flex justify-center gap-0.5 items-center text-white flex-shrink-0">
                          <Icons icon={"rating"} />
                          <span className="text-xs leading-100">
                            {item.rating}
                          </span>
                        </span>
                      </div>
                      <span className="mt-1.5 font-bold leading-160 font-inter">
                        ₹ {item.price}
                      </span>
                      <Button
                        variant="cart"
                        isActive={cartText === index}
                        text={cartText === index ? "Go to Cart" : "Add to Cart"}
                        onClick={() => handleAddToCart(item, index)}
                      />
                    </div>
                  }
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-text-gray font-nunito text-lg">
            No dishes found for selected filters.
          </p>
        )}

        {hasMore && (
          <Button
            text={"Show More"}
            onClick={() => {
              const filtersParam = searchParams.get("filters");
              const filtersQuery = filtersParam
                ? `filters=${filtersParam}&`
                : "";
              const nextPage = currentPage + 1;
              router.push(`?${filtersQuery}page=${nextPage}`, {
                scroll: false,
              });
            }}
            className="py-4.25 px-7.5 leading-100 font-semibold font-nunito"
            variant={"primary"}
          />
        )}
      </div>
    </motion.div>
  );
};

export default FamousDishes;
