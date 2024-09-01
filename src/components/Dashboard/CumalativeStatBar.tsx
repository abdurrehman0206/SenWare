"use client";
import { useIssuancesContext } from "@/hooks/useIssuancesContext";
import { useItemsContext } from "@/hooks/useItemsContext";
import { useRecipientsContext } from "@/hooks/useRecipientsContext";
import { CategoryIcon } from "@/components/Icons/Category";
import { MoneyBillIcon } from "@/components/Icons/MoneyBill";
import { StorageIcon } from "@/components/Icons/Storage";
import { InventoryIcon } from "@/components/Icons/Inventory";
import { IssueIcon } from "@/components/Icons/Issue";
import { BranchIcon } from "@/components/Icons/Branch";
import { UserIcon } from "@/components/Icons/User";
import { CheckIcon } from "@/components/Icons/Check";
import Bounded from "@/components/Utils/Bounded";
import { useMemo } from "react";
import StatCard from "@/components/Stats/StatCard";
import { formatedNumber } from "@/lib/utils";

const CumalativeStatBar = () => {
  const { items } = useItemsContext();
  const { recipients } = useRecipientsContext();
  const { issuances } = useIssuancesContext();
  const statCount = useMemo(() => {
    let totalRevenue = 0;
    let totalQuantity = 0;
    let totalIssued = 0;
    const categories = new Set<string>();
    const branches = new Set<string>();
    let totalRevenueOut = 0;
    let totalQuantityIssued = 0;
    let totalQuantityReturned = 0;

    items.forEach(({ quantity, price, categoryName, issued }) => {
      totalQuantity += quantity;
      totalIssued += issued;
      totalRevenue += quantity * price;
      categories.add(categoryName);
    });
    recipients.forEach(({ branchName }) => {
      branches.add(branchName);
    });
    issuances.forEach(({ quantityIssued, returned, itemPrice }) => {
      if (!returned) {
        totalQuantityIssued += quantityIssued;
        totalRevenueOut += quantityIssued * itemPrice;
      } else {
        totalQuantityReturned += quantityIssued;
      }
    });

    return {
      totalItems: items.length,
      totalQuantity,
      totalIssued,
      totalRevenue: formatedNumber(totalRevenue),
      totalCategories: categories.size,
      totalRecipients: recipients.length,
      totalBranches: branches.size,
      totalIssuances: issuances.length,
      totalQuantityIssued,
      totalQuantityReturned,
      totalRevenueOut: formatedNumber(totalRevenueOut),
    };
  }, [items, recipients, issuances]);

  return (
    <div className="grid grid-cols-3 gap-2">
      <Bounded className="col-span-3 md:col-span-2">
        <h1 className="text-gray-400 mb-4 ">Items Overview</h1>
        <div className="flex flex-row gap-2 w-full flex-wrap">
          <StatCard
            statHeader={{
              text: "Total Items",
              className: "font-semibold text-blue-400",
            }}
            statIcon={<StorageIcon className={"w-6 h-6 stroke-blue-400"} />}
            statCount={statCount.totalItems || 0}
            className="hover:ring-blue-400 ring-1 hover:bg-blue-400/5"
          />
          <StatCard
            statHeader={{
              text: "Total Quantity",
              className: "font-semibold text-purple-400",
            }}
            statIcon={<InventoryIcon className={"w-6 h-6 stroke-purple-400"} />}
            statCount={statCount.totalQuantity || 0}
            className="hover:ring-purple-400 ring-1 hover:bg-purple-400/5"
          />

          <StatCard
            statHeader={{
              text: "Categories",
              className: "font-semibold text-orange-400",
            }}
            statIcon={<CategoryIcon className={"w-6 h-6 stroke-orange-400"} />}
            statCount={statCount.totalCategories || 0}
            className="hover:ring-orange-400 ring-1 hover:bg-orange-400/5"
          />
          <StatCard
            statHeader={{
              text: "Revenue",
              className: "font-semibold text-emerald-400",
            }}
            statIcon={
              <MoneyBillIcon className={"w-6 h-6 stroke-emerald-400"} />
            }
            statCount={statCount.totalRevenue || 0}
            className="hover:ring-emerald-400 ring-1 hover:bg-emerald-400/5"
          />
        </div>
      </Bounded>

      <Bounded className="col-span-3 md:col-span-1">
        <h1 className="text-gray-400 mb-4 ">Recipients Overview</h1>
        <div className="flex flex-row gap-2 w-full flex-wrap">
          <StatCard
            statHeader={{
              text: "Total Recipients",
              className: "font-semibold text-blue-400",
            }}
            statIcon={<UserIcon className={"w-6 h-6 stroke-blue-400"} />}
            statCount={statCount.totalRecipients || 0}
            className="hover:ring-blue-400 ring-1 hover:bg-blue-400/5"
          />
          <StatCard
            statHeader={{
              text: "Total Branches",
              className: "font-semibold text-orange-400",
            }}
            statIcon={<BranchIcon className={"w-6 h-6 stroke-orange-400"} />}
            statCount={statCount.totalBranches || 0}
            className="hover:ring-orange-400 ring-1 hover:bg-orange-400/5"
          />
        </div>
      </Bounded>

      <Bounded className="col-span-3">
        <h1 className="text-gray-400 mb-4 ">Issuance Overview</h1>
        <div className="flex flex-row gap-2 w-full flex-wrap">
          <StatCard
            statHeader={{
              text: "Items Issued",
              className: "font-semibold text-rose-400",
            }}
            statIcon={<IssueIcon className={"w-6 h-6 stroke-rose-400"} />}
            statCount={statCount.totalIssued || 0}
            className="hover:ring-rose-400 ring-1 hover:bg-rose-400/5"
          />

          <StatCard
            statHeader={{
              text: "Revenue Out",
              className: "font-semibold text-emerald-400",
            }}
            statIcon={
              <MoneyBillIcon className={"w-6 h-6 stroke-emerald-400"} />
            }
            statCount={statCount.totalRevenueOut || 0}
            className="hover:ring-emerald-400 ring-1 hover:bg-emerald-400/5"
          />

          <StatCard
            statHeader={{
              text: "Items Returned",
              className: "font-semibold text-rose-400",
            }}
            statIcon={<CheckIcon className={"w-6 h-6 stroke-rose-400"} />}
            statCount={statCount.totalQuantityReturned || 0}
            className="hover:ring-rose-400 ring-1 hover:bg-rose-400/5"
          />
          <StatCard
            statHeader={{
              text: "Issuance Records",
              className: "font-semibold text-blue-400",
            }}
            statIcon={<IssueIcon className={"w-6 h-6 stroke-blue-400"} />}
            statCount={statCount.totalIssuances || 0}
            className="hover:ring-blue-400 ring-1 hover:bg-blue-400/5"
          />
          <StatCard
            statHeader={{
              text: "Currently Issued",
              className: "font-semibold text-purple-400",
            }}
            statIcon={<InventoryIcon className={"w-6 h-6 stroke-purple-400"} />}
            statCount={statCount.totalQuantityIssued || 0}
            className="hover:ring-purple-400 ring-1 hover:bg-purple-400/5"
          />
        </div>
      </Bounded>
    </div>
  );
};

export default CumalativeStatBar;
