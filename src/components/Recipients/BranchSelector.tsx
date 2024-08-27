"use client";
import React, { useState, useEffect, forwardRef, useTransition } from "react";

import { toast } from "sonner";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import { BranchSchema } from "@/schema";
import * as z from "zod";
import { AddIcon } from "@/components/Icons/Add";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddBranchForm from "./AddBranchForm";
import { DeleteIcon } from "@/components/Icons/Delete";
import { Button } from "@/components/ui/button";
import { getBranches } from "@/actions/Branch/getBranches";
import { deleteBranch } from "@/actions/Branch/deleteBranch";

type BranchType = z.infer<typeof BranchSchema>;

const BranchSelector = forwardRef(({ value, onChange, ...props }, ref) => {
  const [branches, setBranches] = useState<BranchType[]>([]);
  const [tag, setTag] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const branchesData = await getBranches();
        if (branchesData) {
          setBranches(branchesData);
        }
      } catch (error) {
        console.error("Error fetching branches :", error);
      }
    };

    fetchBranches();
  }, [tag]);
  const handleBranchDelete = (branchName: string) => {
    startTransition(() => {
      deleteBranch(branchName).then((data) => {
        if (data.success) {
          setTag((prev) => !prev);
        } else {
          toast.error(data.error);
        }
      });
    });
  };
  return (
    <Select value={value} onValueChange={onChange} {...props}>
      <SelectTrigger ref={ref} className="focus:ring-teal-400">
        <SelectValue placeholder="Select a Branch" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {branches.map((branch) => (
            <div
              key={branch.name}
              className="flex justify-between items-center hover:bg-teal-400/5 "
            >
              <SelectItem
                key={branch.name}
                value={branch.name.toString()}
                className="focus:bg-transparent"
              >
                {branch.name}
              </SelectItem>
              <Button
                className="bg-transparent hover:bg-transparent shadow-none p-0 h-max rounded-xl"
                onClick={() => handleBranchDelete(branch.name)}
                disabled={isPending}
              >
                <DeleteIcon className="w-5 h-5 stroke-destructive hover:stroke-transparent hover:fill-destructive/90" />
              </Button>
            </div>
          ))}
          <Dialog>
            <DialogTrigger asChild>
              <SelectLabel className="cursor-pointer flex items-center gap-2 hover:bg-teal-400/10 rounded-sm">
                <AddIcon className="w-5 h-5 stroke-black" />
                Add Branch
              </SelectLabel>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add A New Branch</DialogTitle>
              </DialogHeader>
              <AddBranchForm flipTag={() => setTag((prev) => !prev)} />
            </DialogContent>
          </Dialog>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
});

BranchSelector.displayName = "BranchSelector";

export default BranchSelector;
