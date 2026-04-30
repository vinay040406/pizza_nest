import { motion } from "framer-motion";

export const Button = ({
  text,
  className,
  variant,
  onClick,
  isActive,
  initial,
  whileInView,
  transition,
}) => {
  const variants = {
    primary:
      "bg-linear-to-r from-prime-1 to-prime-2 text-whity font-semibold duration-200 ease-in hover:bg-none border-2 border-transparent hover:border-prime-1 hover:text-prime-2",
    outline:
      "font-semibold font-nunito text-whity border border-whity backdrop-blur-[30.9px] hover:border-transparent duration-200 ease-in hover:bg-whity hover:text-black",
    cart: isActive
      ? "bg-linear-to-r from-prime-1 to-prime-2 text-whity font-semibold w-full py-2.25 hover:bg-none"
      : "bg-linear-to-r from-prime-1 to-prime-2 bg-clip-text text-transparent font-semibold w-full py-2.25 hover:text-white duration-300 ease-in",
  };

  return (
    <>
      {variant === "cart" ? (
        <div className="bg-linear-to-r from-prime-1 to-prime-2 rounded-xl p-px mt-3 hover:bg-none group duration-300 ease-in">
          <div className="bg-white rounded-xl cursor-pointer overflow-hidden duration-300 ease-in hover:bg-linear-to-r from-prime-1 to-prime-2 hover:text-white font-nunito">
            <motion.button
              onClick={onClick}
              className={`${variants.cart} cursor-pointer`}
            >
              {text}
            </motion.button>
          </div>
        </div>
      ) : (
        <motion.button
          initial={initial}
          whileInView={whileInView}
          transition={transition}
          onClick={onClick}
          className={`${className} ${variants[variant] || ""} rounded-xl w-fit cursor-pointer`}
        >
          {text}
        </motion.button>
      )}
    </>
  );
};
