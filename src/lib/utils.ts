import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatedNumber = (number: number) => {
  return new Intl.NumberFormat("en-US", {
    maximumSignificantDigits: 3,
  }).format(number);
};
