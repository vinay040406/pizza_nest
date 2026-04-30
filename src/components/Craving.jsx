import { motion } from "framer-motion";
import { Button } from "./common/Button";

const Craving = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
      }}
      className="w-full bg-border-gray py-12 md:py-20"
    >
      <div className="flex max-w-180.5 w-full mx-auto px-4 lg:px-0 flex-col text-center items-center gap-6 md:gap-8">
        <div className="flex flex-col gap-4 text-center items-center w-full">
          <h4 className="text-3xl md:text-5xl font-semibold leading-120 text-whity font-nunito">
            Craving something cheesy, spicy, or just straight-up delicious?
          </h4>
          <p className="max-w-116.25 w-full leading-160 font-nunito text-para text-sm md:text-base">
            Your next favorite pizza is waiting. Freshly baked, flavor-packed,
            and delivered hot to your door — every single time.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 w-full sm:w-auto">
          <Button
            text={"Order Now"}
            className={
              "px-7.5 py-4 font-semibold leading-100 w-full sm:w-auto justify-center font-nunito"
            }
            variant={"primary"}
          />
          <Button
            text={"View Full Menu"}
            className={
              "px-7.75 py-4.5 font-semibold leading-100 w-full sm:w-auto justify-center"
            }
            variant={"outline"}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Craving;
