"use client";
import StatCard from "@/components/Stats/StatCard";
import Bounded from "@/components/Utils/Bounded";
import { useRecipientsContext } from "@/hooks/useRecipientsContext";
import { useMemo } from "react";
import { BranchIcon } from "@/components/Icons/Branch";
import { UserIcon } from "@/components/Icons/User";

const RecipientsStatBar = () => {
  const { recipients } = useRecipientsContext();
  const statCount = useMemo(() => {
    const branches = new Set<string>();

    recipients.forEach(({ branchName }) => {
      branches.add(branchName);
    });

    return {
      totalItems: recipients.length,
      totalBranches: branches.size,
    };
  }, [recipients]);
  return (
    <Bounded>
      <div className="flex flex-row gap-2 w-full flex-wrap">
        <StatCard
          statHeader={{
            text: "Total Recipients",
            className: "font-semibold text-blue-400",
          }}
          statIcon={<UserIcon className={"w-6 h-6 stroke-blue-400"} />}
          statCount={statCount.totalItems || 0}
        />
        <StatCard
          statHeader={{
            text: "Total Branches",
            className: "font-semibold text-orange-400",
          }}
          statIcon={<BranchIcon className={"w-6 h-6 stroke-orange-400"} />}
          statCount={statCount.totalBranches || 0}
        />
      </div>
    </Bounded>
  );
};

export default RecipientsStatBar;
