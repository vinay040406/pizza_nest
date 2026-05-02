"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Icons from "@/components/common/Icons";
import CartSlider from "@/components/CartSlider";
import Payment from "@/components/Payment";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { useCart } from "@/components/CartProvider";

const page = () => {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [selectedPayment, setSelectedPayment] = useState("cod");
  const { setCartItem } = useCart();

  useEffect(() => {
    const raw = JSON.parse(localStorage.getItem("products")) || [];
    const data = raw.filter(
      (item, index, self) =>
        index === self.findIndex((p) => String(p.id) === String(item.id)),
    );
    localStorage.setItem("products", JSON.stringify(data));
    setProducts(data);

    const savedQtys = JSON.parse(localStorage.getItem("quantities")) || {};
    const initQty = {};
    data.forEach((item) => {
      initQty[String(item.id)] = savedQtys[String(item.id)] || 1;
    });
    localStorage.setItem("quantities", JSON.stringify(initQty));
    setQuantities(initQty);

    setCartItem(data.length);
  }, []);

  const handlePlus = (id) => {
    setQuantities((prev) => {
      const updated = { ...prev, [String(id)]: (prev[String(id)] || 1) + 1 };
      localStorage.setItem("quantities", JSON.stringify(updated));
      const totalQty = Object.values(updated).reduce((a, b) => a + b, 0);
      setCartItem(totalQty);
      return updated;
    });
  };

  const handleMinus = (id) => {
    if (quantities[String(id)] <= 1) return;
    setQuantities((prev) => {
      const updated = { ...prev, [String(id)]: prev[String(id)] - 1 };
      localStorage.setItem("quantities", JSON.stringify(updated));
      const totalQty = Object.values(updated).reduce((a, b) => a + b, 0);
      setCartItem(totalQty);
      return updated;
    });
  };

  const handleRemove = (id) => {
    Swal.fire({
      title: "Remove item?",
      text: "Are you sure you want to remove this item from your cart?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove it",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#e53935",
    }).then((result) => {
      if (result.isConfirmed) {
        const updated = products.filter((p) => String(p.id) !== String(id));
        const updatedQtys = { ...quantities };
        delete updatedQtys[String(id)];

        setProducts(updated);
        setQuantities(updatedQtys);
        localStorage.setItem("quantities", JSON.stringify(updatedQtys));
        localStorage.setItem("products", JSON.stringify(updated));

        setCartItem(updated.length);

        Swal.fire({
          title: "Removed!",
          text: "Item has been removed from your cart.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  const taxes = 41;
  const subTotal = products.reduce(
    (acc, item) =>
      acc + parseFloat(item.price) * (quantities[String(item.id)] || 1),
    0,
  );

  const grandTotal = subTotal + taxes;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="max-w-285 w-full mx-auto mt-28 md:mt-40 pb-20 flex flex-col gap-6 md:gap-10 px-4 xl:px-0"
    >
      {products.length > 0 ? (
        <>
          {/* Header */}
          <div className="flex justify-between items-center font-inter">
            <span className="text-lg md:text-2xl leading-160 font-semibold">
              {products.length} {""}
              Items you have selected
            </span>
            <Link
              href={"/"}
              className="bg-linear-to-r from-prime-1 to-prime-2 bg-clip-text text-transparent font-nunito font-semibold text-lg md:text-2xl leading-160"
            >
              Explore Menu
            </Link>
          </div>

          {/* Restaurant card */}
          <div className="shadow-dominos rounded-xl py-5 pl-5 pr-3 flex flex-col sm:flex-row gap-4 sm:gap-5 items-start sm:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center group">
              <div className="h-28 w-36 sm:h-44 sm:w-53.25 relative rounded-lg overflow-hidden group-hover:scale-90 duration-300 ease-in ">
                <Image
                  src="/assets/images/dominos-logo.webp"
                  alt="Domino's"
                  fill
                  className="object-cover w-full h-full "
                />
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl md:text-4xl font-semibold text-border-gray font-nunito leading-140">
                  Domino's Pizza
                </h2>
                <div className="flex flex-col gap-1">
                  <p className="text-base md:text-xl text-border-gray font-nunito leading-160 font-medium">
                    Pizza, Fast Food, Beverages
                  </p>
                  <p className="text-sm md:text-base text-body-text font-nunito leading-160">
                    Domino's Pizza, Shop No. 3, Main Market, Mehta Nagar, Hisar,
                    Haryana – 125001
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.75 sm:mr-5 sm:-translate-y-6 py-0.5">
              <span className="h-6.5 px-2.25 bg-dark-green rounded-xs flex justify-center gap-1 items-center text-white">
                <Icons icon={"rating"} />
                4.2
              </span>
              <div className="font-inter leading-130 space-y-0.5 flex flex-col">
                <span className="text-border-gray font-medium text-sm leading-100">
                  12,300
                </span>
                <span className="text-sm text-body-text leading-100 font-light">
                  Delivery Rating
                </span>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="flex flex-col lg:flex-row gap-6 md:gap-10">
            <div className="flex flex-col gap-6 w-full lg:max-w-180.5">
              {/* Cart items */}
              {products.map((saved) => (
                <div
                  key={saved.id}
                  className="rounded-lg p-3 flex flex-col sm:flex-row items-start shadow-cheese justify-between gap-4 group"
                >
                  <div className="flex gap-3.5 w-full">
                    <div className="h-24 w-28 sm:h-33.25 sm:w-34.75 relative rounded-lg overflow-hidden group-hover:scale-90 duration-300 ease-in">
                      <Image
                        src={saved.image}
                        alt={saved.name}
                        fill
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex flex-col">
                      <h5 className="text-lg md:text-2xl font-semibold leading-160 font-nunito">
                        {saved.name}
                      </h5>
                      <p className="max-w-85.75 w-full leading-160 font-nunito mt-1 text-sm md:text-base">
                        {saved.desc}
                      </p>
                      <div className="flex gap-2.75 mt-1.5">
                        {saved.variants?.map((item, index) => (
                          <span
                            key={index}
                            className={`leading-160 font-medium font-nunito pr-2.75 text-sm md:text-base ${
                              index === 0 && "border-r border-r-black"
                            }`}
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex sm:text-right flex-row sm:flex-col gap-4 sm:gap-2 items-center sm:items-end w-full sm:w-auto justify-between">
                    <span className="text-lg md:text-xl font-semibold leading-150 font-nunito">
                      ₹ {saved.price}
                    </span>
                    <div className="border border-border-gray/12 rounded-xs flex">
                      <span className="border-r border-r-border-gray/12 flex justify-center items-center cursor-pointer w-6.5 h-7.75">
                        {quantities[String(saved.id)] === 1 ? (
                          <Icons
                            onClick={() => handleRemove(String(saved.id))}
                            icon={"trash"}
                          />
                        ) : (
                          <span
                            onClick={() => handleMinus(String(saved.id))}
                            className="text-2xl"
                          >
                            -
                          </span>
                        )}
                      </span>
                      <span className="bg-whity px-5.25 flex justify-center items-center font-semibold text-18px leading-150">
                        {quantities[String(saved.id)] || 1}
                      </span>
                      <span
                        onClick={() => handlePlus(String(saved.id))}
                        className="bg-border-gray text-white flex justify-center items-center cursor-pointer text-xl px-1.75 leading-100"
                      >
                        +
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              <CartSlider />
            </div>

            <Payment
              products={products}
              setProducts={setProducts}
              subTotal={subTotal}
              taxes={taxes}
              grandTotal={grandTotal}
              selectedPayment={selectedPayment}
              setSelectedPayment={setSelectedPayment}
            />
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center text-center gap-4 py-20">
          <h4 className="text-2xl font-semibold text-gray-800">
            Your cart is empty 🛒
          </h4>
          <p className="text-gray-500 max-w-sm">
            Looks like you haven't added anything yet. Start exploring and add
            your favorite items to your cart.
          </p>
          <Link
            href="/"
            className="mt-2 px-6 py-3 text-xl font-semibold text-white rounded-md bg-linear-to-r from-prime-1 to-prime-2 hover:scale-102 transition duration-300 hover:bg-none hover:border-prime-2 hover:text-prime-1 border border-transparent"
          >
            Browse Menu
          </Link>
        </div>
      )}
    </motion.div>
  );
};

export default page;
