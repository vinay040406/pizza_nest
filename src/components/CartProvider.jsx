"use client";
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState(0);

  useEffect(() => {
    // Initial load
    const sync = () => {
      const qtys = JSON.parse(localStorage.getItem("quantities")) || {};
      const products = JSON.parse(localStorage.getItem("products")) || [];
      setCartItem(products.length);
    };

    sync();

    // Sync when localStorage changes from another tab
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  return (
    <CartContext.Provider value={{ cartItem, setCartItem }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
};
