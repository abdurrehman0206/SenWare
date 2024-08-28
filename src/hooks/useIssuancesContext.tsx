"use client";

import { IssuancesContext } from "@/context/IssuancesContext";
import { useContext } from "react";

export const useIssuancesContext = () => {
  const context = useContext(IssuancesContext);
  if (!context) {
    throw new Error(
      "useIssuances must be used within IssuancesContextProvider",
    );
  } else {
    return context;
  }
};
