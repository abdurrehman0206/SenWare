import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
<<<<<<< HEAD
import TopBar from "@/components/TopBar/TopBar";
import NavBar from "@/components/NavBar/NavBar";
=======
>>>>>>> 63fc9448f1d7b8c1a57499c96927faf93bc3236c

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "SenWare",
  description: "Senate Inventory Managment System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={clsx(poppins.className, "h-screen")}>{children}</body>
    </html>
  );
}
