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

const ItemsChart = () => {
  const { items } = useItemsContext();
  const [chartData, setChartData] = useState<any[]>([]);
  const [highestIssuedMonth, setHighestIssuedMonth] = useState<any | undefined>(
    {},
  );

  useEffect(() => {
    const groupedData = items.reduce((acc: any, item: ItemType) => {
      const month = format(item.purchasedAt, "MMMM");
      if (!acc[month]) {
        acc[month] = 0;
      }
      acc[month] += item.issued;
      return acc;
    }, {});

    const formattedChartData = Object.keys(groupedData).map((month) => ({
      month,
      issued: groupedData[month],
    }));
    const highestIssuedMon = formattedChartData.reduce(
      (max, item) => (item.issued > max.issued ? item : max),
      { month: "", issued: 0 },
    );
    setHighestIssuedMonth(highestIssuedMon);
    setChartData(formattedChartData);
  }, [items]);

  return (
    <Bounded className="w-[500px]">
      <Card>
        <CardHeader>
          <CardTitle>Items Issued</CardTitle>
          <CardDescription>Items issued Per month</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
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
            {highestIssuedMonth?.month &&
              `Highest issued count is in ${highestIssuedMonth?.month}`}
            <TrendingUp className="h-4 w-4" />
          </div>
        </CardFooter>
      </Card>
    </Bounded>
  );
};

export default ItemsChart;
