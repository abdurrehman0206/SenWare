"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePathname, useRouter } from "next/navigation";

export function TabsBar() {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <Tabs defaultValue={pathname.replace("/", "")} className="w-full ">
      <TabsList className="grid w-full grid-cols-2 bg-white shadow-sm">
        <TabsTrigger
          value="login"
          onClick={() => router.push("/login")}
          className={
            "data-[state=active]:bg-teal-400 data-[state=active]:text-white "
          }
        >
          Login
        </TabsTrigger>
        <TabsTrigger
          value="register"
          onClick={() => router.push("/register")}
          className={
            "data-[state=active]:bg-teal-400 data-[state=active]:text-white "
          }
        >
          Register
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
