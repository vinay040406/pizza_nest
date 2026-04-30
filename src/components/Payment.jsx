"use client";
import Swal from "sweetalert2";
import { Button } from "./common/Button";
import Icons from "./common/Icons";

const PAYMENT_METHODS = [
  { id: "upi", label: "UPI (Google Pay, PhonePe, Paytm)" },
  { id: "card", label: "Credit / Debit Card" },
  { id: "cod", label: "Cash on Delivery" },
];

const Payment = ({
  setSelectedPayment,
  selectedPayment,
  grandTotal,
  subTotal,
  taxes,
}) => {
  const handleOfferClick = () => {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "info",
      title: "No offers available right now",
      showConfirmButton: false,
      timer: 2000,
    });
  };

  const showOrderToast = () => {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "Order Placed 🎉",
      html: `
      <div style="font-size:14px; margin-top:4px;">
        Your order has been successfully placed.<br/>
        <strong>Arriving in ~30 minutes 🚀</strong>
      </div>
    `,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,

      background: "#fff",
      color: "#1f2937",
      iconColor: "#f97316",

      customClass: {
        popup: "rounded-xl shadow-lg px-4 py-3",
        title: "text-sm font-semibold",
      },

      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
  };

  return (
    <div className="w-full font-nunito">
      <div className=" flex flex-col gap-5">
        {/* Delivery Address */}
        <div className="shadow-cheese rounded-md p-3 flex flex-col gap-3">
          <h4 className="font-bold  text-xl leading-150">
            Choose a Delivery Address
          </h4>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-8.5 w-8.5 rounded-sm bg-linear-to-r from-prime-1 to-prime-2 flex items-center justify-center flex-shrink-0">
                <Icons icon={"location2"} pathClass={"stopColor-white"} />
              </span>
              <div>
                <p className="font-semibold  leading-130">Current Address</p>
                <p className="text-sm  font-medium leading-140">Hisar</p>
              </div>
            </div>
            <Button
              text={"Change"}
              variant="primary"
              className="py-2.25 px-3.5 leading-100"
            />
          </div>
        </div>

        {/* Offer */}
        <div
          onClick={handleOfferClick}
          className="shadow-cheese rounded-md p-3 flex flex-col gap-3"
        >
          <h4 className="font-bold  text-xl leading-150">Offer</h4>
          <div className="flex items-center justify-between cursor-pointer">
            <div className="flex items-center gap-2">
              <span className="h-8.5 w-8.5 rounded-sm bg-linear-to-r from-prime-1 to-prime-2 flex items-center justify-center flex-shrink-0">
                <Icons icon={"selectOffer"} />
              </span>
              <div>
                <p className="font-semibold  leading-130">Select offer</p>
                <p className="text-sm  font-medium leading-140">
                  Get discount with your order
                </p>
              </div>
            </div>
            <Icons icon={"arrow"} />
          </div>
        </div>

        {/* Payment Method */}
        <div className="shadow-cheese rounded-md p-3 flex flex-col gap-4">
          <h4 className="font-bold  text-xl leading-150">
            Select Payment Method
          </h4>
          <div className="flex flex-col gap-3">
            {PAYMENT_METHODS.map((method, index) => (
              <label
                key={method.id}
                className={`${index < 2 ? "border-b border-payment-border pb-1.5" : ""} flex items-center gap-3 cursor-pointer`}
              >
                <input
                  type="checkbox"
                  checked={selectedPayment === method.id}
                  onChange={() => {
                    setSelectedPayment(method.id);
                    console.log(selectedPayment);
                  }}
                  className="h-5 w-5 rounded-xs accent-prime-1 cursor-pointer"
                />
                <span className="  leading-160">{method.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Detail */}
        <div className="shadow-cheese rounded-md p-3 flex flex-col gap-3">
          <h4 className="font-bold  text-xl leading-150">Price Detail</h4>
          <div className="flex flex-col gap-4 border-b border-payment-border pb-3 mt-1">
            <div className="flex justify-between items-center">
              <span className=" text-18px leading-150 font-semibold">
                Sub Total
              </span>
              <span className=" text-18px leading-150 font-medium">
                ₹ {subTotal}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className=" text-18px leading-150 font-medium">
                Discount
              </span>
              <span className=" text-18px leading-150 font-medium">-</span>
            </div>
            <div className="flex justify-between items-center">
              <span className=" text-18px leading-150 font-medium">
                Taxes and Charges
              </span>
              <span className=" text-18px leading-150 font-medium">
                ₹ {taxes}
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-bold  text-xl leading-150">Grand Total</span>
            <span className=" text-18px leading-150 font-medium">
              ₹ {grandTotal}
            </span>
          </div>
          <Button
            onClick={showOrderToast}
            text={"Place Order"}
            variant="primary"
            className="w-full py-2.75 font-semibold font-nunito-sans text-center justify-center leading-100"
          />
        </div>
      </div>
    </div>
  );
};

export default Payment;
