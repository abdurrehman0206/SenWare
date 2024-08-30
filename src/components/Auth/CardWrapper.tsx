"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { LockIcon } from "@/components/Icons/Lock";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
}
export const CardWrapper = ({ children, headerLabel }: CardWrapperProps) => {
  return (
    <Card className="w-full shadow-md">
      <CardHeader className="flex flex-row gap-2 justify-center items-center font-semibold text-2xl">
        <LockIcon className={"stroke-black stroke-2 h-6 w-6"} />
        {headerLabel}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
