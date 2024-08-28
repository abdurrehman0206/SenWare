"use client";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { useItemsContext } from "@/hooks/useItemsContext";
import { format, parseISO } from "date-fns";
import { TrendingUp } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ItemType } from "@/lib/types";
import Bounded from "../Utils/Bounded";

const chartConfig = {
  issued: {
    label: "Items Issued",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const CategoryIssueChart = () => {
  const { items } = useItemsContext();
  const [chartData, setChartData] = useState<any[]>([]);
  const [highestIssuedCat, setHighestIssuedCat] = useState<any | undefined>({});

  useEffect(() => {
    const groupedData = items.reduce((acc: any, item: ItemType) => {
      const category = item.categoryName;
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += item.issued;
      return acc;
    }, {});

    const formattedChartData = Object.keys(groupedData).map((category) => ({
      category,
      issued: groupedData[category],
    }));
    const highestIssuedCategory = formattedChartData.reduce(
      (max, item) => (item.issued > max.issued ? item : max),
      { category: "", issued: 0 },
    );

    setHighestIssuedCat(highestIssuedCategory);
    setChartData(formattedChartData);
  }, [items]);
  console.log(chartData);
  return (
    <Bounded className="w-[500px]">
      <Card>
        <CardHeader>
          <CardTitle>Items Issued</CardTitle>
          <CardDescription>Items Issued Per Category</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                // tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar
                dataKey="issued"
                className="fill-teal-400/40 hover:fill-teal-400 transition-all"
                radius={8}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none">
            {highestIssuedCat?.category &&
              `Highest issued category is ${highestIssuedCat?.category}`}
            <TrendingUp className="h-4 w-4" />
          </div>
        </CardFooter>
      </Card>
    </Bounded>
  );
};
export default CategoryIssueChart;
