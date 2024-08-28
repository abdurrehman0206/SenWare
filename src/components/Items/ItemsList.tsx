"use client";

import * as React from "react";
import { useItemsContext } from "@/hooks/useItemsContext";
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogClose,
  DialogTitle,
  DialogFooter,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getItems } from "@/actions/Item/getItems";
import Image from "next/image";
import { useState, useEffect, useTransition } from "react";
import { FormError } from "@/components/FormInfo/FormError";
import { DeleteIcon } from "@/components/Icons/Delete";
import Bounded from "@/components/Utils/Bounded";
import ListHeader from "./ListHeader";
import Loading from "@/app/loading";
import { deleteItem } from "@/actions/Item/deleteItem";
import { ItemsContextProvider } from "@/context/ItemsContext";
import { CopyIcon } from "@/components/Icons/Copy";
import { NoteIcon } from "@/components/Icons/Note";
import { UserCheckIcon } from "@/components/Icons/UserCheck";
import IssueItemForm from "./IssueItemForm";
import { toast } from "sonner";

const SortButton = ({ column, headerName }: any) => {
  return (
    <Button
      variant="ghost"
      className="p-0 hover:bg-transparent"
      onClick={() =>
        column.toggleSorting(column.getIsSorted() === "asc" ? true : false)
      }
    >
      {headerName}
      <CaretSortIcon className="ml-2 h-4 w-4" />
    </Button>
  );
};

const ItemsList = () => {
  const { items, dispatch, isPending, refreshItems } = useItemsContext();
  const [error, setError] = useState<string | undefined>("");
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "id",
      enableSorting: true,
      header: ({ column }) => {
        return <SortButton column={column} headerName={"ID"} />;
      },
    },
    {
      accessorKey: "name",
      enableSorting: true,
      header: ({ column }) => {
        return <SortButton column={column} headerName={"Name"} />;
      },
    },
    {
      accessorKey: "brand",
      header: "Brand",
      enableSorting: false,
    },
    {
      accessorKey: "barcode",
      enableSorting: true,
      header: ({ column }) => {
        return <SortButton column={column} headerName={"Barcode"} />;
      },
    },
    {
      accessorKey: "vendor",
      enableSorting: true,
      header: ({ column }) => {
        return <SortButton column={column} headerName={"Vendor"} />;
      },
    },
    {
      accessorKey: "price",
      enableSorting: true,
      header: ({ column }) => {
        return <SortButton column={column} headerName={"Price"} />;
      },
      // cell: ({ row }) => {
      //   const formatted = new Intl.NumberFormat("en-US", {
      //     style: "currency",
      //     currency: "PKR",
      //   }).format(row.getValue("price"));
      //   return <div className="text-right font-medium">{formatted}</div>;
      // },
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
      enableSorting: true,
    },
    {
      accessorKey: "issued",
      header: "Issued",
      enableSorting: true,
    },
    {
      accessorKey: "categoryName",
      enableSorting: true,
      header: ({ column }) => {
        return <SortButton column={column} headerName={"Category"} />;
      },
    },
    {
      accessorKey: "purchasedAt",
      enableSorting: true,
      header: ({ column }) => {
        return <SortButton column={column} headerName={"Purchased At"} />;
      },
    },
    {
      accessorKey: "image",
      header: "Image",
      enableSorting: false,
      cell: ({ row }) => (
        <div className="ring-teal-100 rounded-sm overflow-hidden shadow-sm border w-max p-1">
          <div className="relative w-10 h-10 ">
            <Image
              src={row.getValue("image") || ""}
              alt="item image"
              fill={true}
              className="object-cover"
            />
          </div>
        </div>
      ),
    },
    {
      id: "status",

      header: ({ column }) => {
        return <SortButton column={column} headerName={"Status"} />;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const item = row.original;
        const handleDelete = async (itemId: number) => {
          const response = await deleteItem(itemId);
          if (response.success) {
            toast.success(response.success);
            refreshItems();
          } else {
            toast.error(response.error);
          }
        };
        const handleAlertTriggerClick = (event: React.MouseEvent) => {
          event.stopPropagation();
        };
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(item.id)}
              >
                <CopyIcon className="w-4 h-4 stroke-black mr-1" />
                Copy item ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <NoteIcon className="w-4 h-4 stroke-black mr-1" />
                View details
              </DropdownMenuItem>
              <DropdownMenuSeparator />

              <Dialog>
                <DialogTrigger asChild onSelect={(e) => e.preventDefault()}>
                  <DropdownMenuItem>
                    <UserCheckIcon className="w-4 h-4 stroke-black mr-1" />
                    Issue Item
                  </DropdownMenuItem>
                </DialogTrigger>
                <DialogContent className="min-w-[800px]">
                  <DialogTitle className="m-auto">Issue Item</DialogTitle>
                  <IssueItemForm itemId={item.id} />
                </DialogContent>
              </Dialog>

              <DropdownMenuSeparator />
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem
                    onSelect={(e) => e.preventDefault()}
                    className="text-destructive bg-destructive/10 focus-visible:bg-destructive/20 focus:bg-destructive/20 hover:bg-destructive/20 focus-visible:text-destructive focus:text-destructive"
                  >
                    <DeleteIcon className={"stroke-destructive w-4 h-4 mr-1"} />
                    Delete Item
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      the item from the inventory and remove any data from our
                      servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="border-teal-200 text-teal-400 hover:bg-teal-400/10 hover:text-teal-400">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-teal-200 text-white hover:bg-teal-400"
                      onClick={() => handleDelete(item.id)}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data: items,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 9,
      },
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    filterFns: {
      customFilter: (row, columnId, filterValue) => {
        const value: string = row.getValue(columnId);
        return value
          ? value.toLowerCase().includes(filterValue.toLowerCase())
          : false;
      },
    },
  });
  if (isPending) {
    return;
  }
  return (
    <Bounded>
      <div className="w-full space-y-3">
        <div className="flex items-center ">
          <Input
            placeholder="Filter items..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm  focus-visible:ring-teal-200 "
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="mr-2">
              <Button
                variant="outline"
                className="ml-auto ring-neutral-200 border-teal-200 hover:bg-teal-400/10 text-teal-400 hover:text-teal-400"
              >
                Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          <ListHeader />
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="text-left">
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="text-left"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          {/*<div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div> */}
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredRowModel().rows.length} row(s)
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
        {error && <FormError message={error} />}
      </div>
    </Bounded>
  );
};

export default ItemsList;
