"use client";

import { RecipientsContext } from "@/context/RecipientContext";
import { useContext } from "react";

export const useRecipientsContext = () => {
  const context = useContext(RecipientsContext);
  if (!context) {
    throw new Error(
      "useRecipients must be used within RecipientsContextProvider",
    );
  } else {
    return context;
  }
};
