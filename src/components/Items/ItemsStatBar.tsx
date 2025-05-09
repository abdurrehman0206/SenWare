"use client";
import { CategoryIcon } from "@/components/Icons/Category";
import { MoneyBillIcon } from "@/components/Icons/MoneyBill";
import { StorageIcon } from "@/components/Icons/Storage";
import { InventoryIcon } from "@/components/Icons/Inventory";
import { IssueIcon } from "@/components/Icons/Issue";
import Bounded from "@/components/Utils/Bounded";
import StatCard from "@/components/Stats/StatCard";
import { useMemo } from "react";
import { useItemsContext } from "@/hooks/useItemsContext";
import { formatedNumber } from "@/lib/utils";

const ItemsStatBar = () => {
  const { items } = useItemsContext();
  const statCount = useMemo(() => {
    let totalRevenue = 0;
    let totalQuantity = 0;
    let totalIssued = 0;
    const categories = new Set<string>();

    items.forEach(({ quantity, price, categoryName, issued }) => {
      totalQuantity += quantity;
      totalIssued += issued;
      totalRevenue += quantity * price;
      categories.add(categoryName);
    });

    return {
      totalItems: items.length,
      totalQuantity,
      totalIssued,
      totalRevenue: formatedNumber(totalRevenue),
      totalCategories: categories.size,
    };
  }, [items]);
  return (
    <Bounded>
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
            text: "Items Issued",
            className: "font-semibold text-rose-400",
          }}
          statIcon={<IssueIcon className={"w-6 h-6 stroke-rose-400"} />}
          statCount={statCount.totalIssued || 0}
          className="hover:ring-rose-400 ring-1 hover:bg-rose-400/5"
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
          statIcon={<MoneyBillIcon className={"w-6 h-6 stroke-emerald-400"} />}
          statCount={statCount.totalRevenue || 0}
          className="hover:ring-emerald-400 ring-1 hover:bg-emerald-400/5"
        />
      </div>
    </Bounded>
  );
};

export default ItemsStatBar;
