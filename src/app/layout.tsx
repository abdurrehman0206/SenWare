import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import TopBar from "@/components/TopBar/TopBar";
import NavBar from "@/components/NavBar/NavBar";

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
      <body className={clsx(poppins.className, "h-screen")}>
        <div className="bg-teal-200 p-2 h-full">
          <div className="rounded-2xl overflow-hidden bg-white h-full flex flex-col shadow-lg">
            <TopBar />
            <div className="flex flex-row h-full ">
              <NavBar />
              <div className="w-full h-full bg-gray-100 rounded-tl-2xl overflow-hidden p-2">
                {children}
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
