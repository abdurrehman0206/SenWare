"use client";
import { CategoryIcon } from "@/components/Icons/Category";
import { MoneyBillIcon } from "@/components/Icons/MoneyBill";
import { StorageIcon } from "@/components/Icons/Storage";
import StatCard from "@/components/Stats/StatCard";
import Bounded from "@/components/Utils/Bounded";
import { useItemsContext } from "@/hooks/useItemsContext";
import { useEffect, useState, useMemo } from "react";
import { InventoryIcon } from "../Icons/Inventory";

const ItemsStatBar = () => {

  const { items } = useItemsContext();
  const statCount = useMemo(() => {
    let totalRevenue = 0;
    let totalQuantity = 0;
    const categories = new Set<string>();

    items.forEach(({ quantity, price, categoryName }) => {
      totalQuantity += quantity;
      totalRevenue += quantity * price;
      categories.add(categoryName);
    });

    return {
      totalItems: items.length,
      totalQuantity,
      totalRevenue,
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
        />
        <StatCard
          statHeader={{
            text: "Total Quantity",
            className: "font-semibold text-purple-400",
          }}
          statIcon={<InventoryIcon className={"w-6 h-6 stroke-purple-400"} />}
          statCount={statCount.totalQuantity || 0}
        />
        <StatCard
          statHeader={{
            text: "Categories",
            className: "font-semibold text-orange-400",
          }}
          statIcon={<CategoryIcon className={"w-6 h-6 stroke-orange-400"} />}
          statCount={statCount.totalCategories || 0}
        />
        <StatCard
          statHeader={{
            text: "Revenue",
            className: "font-semibold text-emerald-400",
          }}
          statIcon={<MoneyBillIcon className={"w-6 h-6 stroke-emerald-400"} />}
          statCount={statCount.totalRevenue || 0}
        />
      </div>
    </Bounded>
  );
};

export default ItemsStatBar;
