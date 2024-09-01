"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useIssuancesContext } from "@/hooks/useIssuancesContext";
import Bounded from "../Utils/Bounded";
import Image from "next/image";
const LatestIssuances = () => {
  const { issuances } = useIssuancesContext();
  const latestIssuances = issuances
    .sort(
      (a, b) => new Date(b.issuedAt).getTime() - new Date(a.issuedAt).getTime(),
    )
    .slice(0, 4);

  return (
    <Bounded>
      <h1 className="text-gray-400">Latest Issued</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Item</TableHead>
            <TableHead>Quantity Issued</TableHead>
            <TableHead>Recipients ID</TableHead>
            <TableHead>Recipients Name</TableHead>
            <TableHead>Recipients Branch</TableHead>
            <TableHead>Issued At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {latestIssuances.map((issuance) => (
            <TableRow key={issuance.id}>
              <TableCell className="font-medium flex gap-2">
                {" "}
                <div className="relative w-7 h-7">
                  <Image
                    src={issuance.itemImage}
                    alt="Item"
                    fill={true}
                    objectFit="cover"
                  />
                </div>
                {issuance.itemName}
              </TableCell>
              <TableCell>{issuance.quantityIssued}</TableCell>
              <TableCell>{issuance.recipientId}</TableCell>
              <TableCell>{issuance.recipientName}</TableCell>
              <TableCell>{issuance.recipientBranchName}</TableCell>
              <TableCell>{issuance.issuedAt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Bounded>
  );
};

export default LatestIssuances;
