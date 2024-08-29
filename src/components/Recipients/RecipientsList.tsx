"use client";

import * as React from "react";
import { useRecipientsContext } from "@/hooks/useRecipientsContext";
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
import { deleteRecipient } from "@/actions/Recipient/deleteRecipient";
import { CopyIcon } from "@/components/Icons/Copy";
import { NoteIcon } from "@/components/Icons/Note";
import { UserCheckIcon } from "@/components/Icons/UserCheck";
import { toast } from "sonner";
import AddRecipientDialog from "./AddRecipientDialog";

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

const RecipientsList = () => {
  const { recipients, dispatch, isPending, refreshRecipients } =
    useRecipientsContext();
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
      accessorKey: "branchName",
      enableSorting: true,
      header: ({ column }) => {
        return <SortButton column={column} headerName={"Branch"} />;
      },
    },

    {
      id: "actions",
      cell: ({ row }) => {
        const recipient = row.original;
        const handleDelete = async (recipientId: number) => {
          const response = await deleteRecipient(recipientId);
          if (response.success) {
            toast.success(response.success);
            refreshRecipients();
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
                onClick={() => navigator.clipboard.writeText(recipient.id)}
              >
                <CopyIcon className="w-4 h-4 stroke-black mr-1" />
                Copy ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem
                    onSelect={(e) => e.preventDefault()}
                    className="text-destructive bg-destructive/10 focus-visible:bg-destructive/20 focus:bg-destructive/20 hover:bg-destructive/20 focus-visible:text-destructive focus:text-destructive"
                  >
                    <DeleteIcon className={"stroke-destructive w-4 h-4 mr-1"} />
                    Delete Recipient
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      the recipient from the database.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="border-teal-200 text-teal-400 hover:bg-teal-400/10 hover:text-teal-400">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-teal-200 text-white hover:bg-teal-400"
                      onClick={() => handleDelete(recipient.id)}
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
    data: recipients,
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
        <div className="flex items-start flex-col sm:flex-row gap-2 w-full">
          <Input
            placeholder="Filter items..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="w-full md:w-auto focus-visible:ring-teal-200 "
          />
          <div className="flex items-center flex-row  gap-2 w-full">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="ml-auto ring-neutral-200 border-teal-200 hover:bg-teal-400/10 text-teal-400 hover:text-teal-400 w-full sm:w-auto"
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
            <AddRecipientDialog />
          </div>
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

export default RecipientsList;
