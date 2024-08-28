"use client";
import { useIssuancesContext } from "@/hooks/useIssuancesContext";
import { useItemsContext } from "@/hooks/useItemsContext";
import { useRecipientsContext } from "@/hooks/useRecipientsContext";

const CumalativeStatBar = () => {
  const { items } = useItemsContext();
  const { recipients } = useRecipientsContext();
  const { issuances } = useIssuancesContext();

  return <div></div>;
};

export default CumalativeStatBar;
