"use client";

import { useContext } from "react";

import { ItemsContext } from "@/context/ItemsContext";

export const useItemsContext = () => {
  const context = useContext(ItemsContext);
  if (!context) {
    throw new Error("useItems must be used within ItemsContextProvider");
  } else {
    return context;
  }
};
