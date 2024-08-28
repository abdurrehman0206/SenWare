"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
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
import Bounded from "../Utils/Bounded";
import { useItemsContext } from "@/hooks/useItemsContext";
import { useIssuancesContext } from "@/hooks/useIssuancesContext";

const chartConfig = {
  revenueSpent: {
    label: "Revenue Spent",
    color: "hsl(var(--chart-1))",
  },
  revenueIssued: {
    label: "Revenue Issued",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const RevenueTrendChart = () => {
  const { items } = useItemsContext();
  const { issuances } = useIssuancesContext();

  const aggregateDataByMonth = () => {
    const monthlyData: any = {};

    items.forEach((item) => {
      const month = new Date(item.purchasedAt).toLocaleString("default", {
        month: "long",
      });
      const spent = item.quantity * item.price;

      if (!monthlyData[month]) {
        monthlyData[month] = {
          revenueSpent: 0,
          revenueIssued: 0,
        };
      }

      monthlyData[month].revenueSpent += spent;
    });

    issuances.forEach((issuance) => {
      const month = new Date(issuance.issuedAt).toLocaleString("default", {
        month: "long",
      });
      const item = items.find((i) => i.id === issuance.itemId);
      if (item) {
        const issued = issuance.quantityIssued * item?.price;

        if (!monthlyData[month]) {
          monthlyData[month] = {
            revenueSpent: 0,
            revenueIssued: 0,
          };
        }

        monthlyData[month].revenueIssued += issued;
      }
    });

    return Object.keys(monthlyData).map((month) => ({
      month,
      ...monthlyData[month],
    }));
  };

  const chartData = aggregateDataByMonth();

  return (
    <Bounded>
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Revenue Trend</CardTitle>
          <CardDescription>Revenue Spent vs. Revenue Issued</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Area
                dataKey="revenueSpent"
                type="natural"
                fill="var(--color-revenueSpent)"
                fillOpacity={0.4}
                stroke="var(--color-revenueSpent)"
                stackId="a"
              />
              <Area
                dataKey="revenueIssued"
                type="natural"
                fill="var(--color-revenueIssued)"
                fillOpacity={0.4}
                stroke="var(--color-revenueIssued)"
                stackId="a"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </Bounded>
  );
};

export default RevenueTrendChart;
