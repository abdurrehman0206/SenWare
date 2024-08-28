"use client";
import { CategoryIcon } from "@/components/Icons/Category";
import { MoneyBillIcon } from "@/components/Icons/MoneyBill";
import { StorageIcon } from "@/components/Icons/Storage";
import { CheckIcon } from "@/components/Icons/Check";
import { InventoryIcon } from "@/components/Icons/Inventory";
import { IssueIcon } from "@/components/Icons/Issue";
import StatCard from "@/components/Stats/StatCard";
import Bounded from "@/components/Utils/Bounded";
import { useItemsContext } from "@/hooks/useItemsContext";
import { useEffect, useState, useMemo } from "react";
import { useIssuancesContext } from "@/hooks/useIssuancesContext";
import { formatedNumber } from "@/lib/utils";

const IssuanceStatBar = () => {
  const { issuances } = useIssuancesContext();
  const statCount = useMemo(() => {
    let totalRevenueOut = 0;
    let totalQuantityIssued = 0;
    let totalQuantityReturned = 0;

    issuances.forEach(({ quantityIssued, returned, itemPrice }) => {
      if (!returned) {
        totalQuantityIssued += quantityIssued;
        totalRevenueOut += quantityIssued * itemPrice;
      } else {
        totalQuantityReturned += quantityIssued;
      }
    });

    return {
      totalIssuances: issuances.length,
      totalQuantityIssued,
      totalQuantityReturned,
      totalRevenueOut: formatedNumber(totalRevenueOut),
    };
  }, [issuances]);
  return (
    <Bounded>
      <div className="flex flex-row gap-2 w-full flex-wrap">
        <StatCard
          statHeader={{
            text: "Issuance",
            className: "font-semibold text-blue-400",
          }}
          statIcon={<IssueIcon className={"w-6 h-6 stroke-blue-400"} />}
          statCount={statCount.totalIssuances || 0}
        />
        <StatCard
          statHeader={{
            text: "Currently Issued",
            className: "font-semibold text-purple-400",
          }}
          statIcon={<InventoryIcon className={"w-6 h-6 stroke-purple-400"} />}
          statCount={statCount.totalQuantityIssued || 0}
        />
        <StatCard
          statHeader={{
            text: "Items Returned",
            className: "font-semibold text-rose-400",
          }}
          statIcon={<CheckIcon className={"w-6 h-6 stroke-rose-400"} />}
          statCount={statCount.totalQuantityReturned || 0}
        />
        <StatCard
          statHeader={{
            text: "Revenue Out",
            className: "font-semibold text-emerald-400",
          }}
          statIcon={<MoneyBillIcon className={"w-6 h-6 stroke-emerald-400"} />}
          statCount={statCount.totalRevenueOut || 0}
        />
      </div>
    </Bounded>
  );
};

export default IssuanceStatBar;
