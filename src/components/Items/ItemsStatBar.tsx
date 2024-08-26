"use client";
import { getCategoryCount } from "@/actions/Category/getCategoryCount";
import { CategoryIcon } from "@/components/Icons/Category";
import { MoneyBillIcon } from "@/components/Icons/MoneyBill";
import { StorageIcon } from "@/components/Icons/Storage";
import StatCard from "@/components/Stats/StatCard";
import Bounded from "@/components/Utils/Bounded";
import { useItemsContext } from "@/hooks/useItemsContext";
import { useEffect, useState } from "react";
import { InventoryIcon } from "../Icons/Inventory";

const ItemsStatBar = () => {
  const [categoryCount, setCategoryCount] = useState<number | undefined>(0);
  const [revenue, setRevenue] = useState<number | undefined>(0);
  const [quantity, setQuantity] = useState<number | undefined>(0);
  const { items } = useItemsContext();
  useEffect(() => {
    const fetchStats = async () => {
      const result = await getCategoryCount();
      if (result.count) {
        setCategoryCount(result.count);
      } else {
        console.log(result.error);
      }
      let totalRev = 0;
      let totalQuan = 0;
      items.forEach((item) => {
        totalQuan += item.quantity;
        totalRev += item.quantity * item.price;
      });
      setRevenue(totalRev);
      setQuantity(totalQuan);
    };
    fetchStats();
  }, [items]);
  return (
    <Bounded>
      <div className="flex flex-row gap-2 w-full">
        <StatCard
          statHeader={{
            text: "Total Items",
            className: "font-semibold text-blue-400",
          }}
          statIcon={<StorageIcon className={"w-6 h-6 stroke-blue-400"} />}
          statCount={items.length || 0}
        />
        <StatCard
          statHeader={{
            text: "Total Quantity",
            className: "font-semibold text-purple-400",
          }}
          statIcon={<InventoryIcon className={"w-6 h-6 stroke-purple-400"} />}
          statCount={quantity || 0}
        />
        <StatCard
          statHeader={{
            text: "Categories",
            className: "font-semibold text-orange-400",
          }}
          statIcon={<CategoryIcon className={"w-6 h-6 stroke-orange-400"} />}
          statCount={categoryCount || 0}
        />
        <StatCard
          statHeader={{
            text: "Revenue",
            className: "font-semibold text-emerald-400",
          }}
          statIcon={<MoneyBillIcon className={"w-6 h-6 stroke-emerald-400"} />}
          statCount={revenue || 0}
        />
      </div>
    </Bounded>
  );
};

export default ItemsStatBar;
