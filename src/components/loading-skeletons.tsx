import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function LoadingSkeletons() {
  return (
    <div className="mt-5 flex flex-col space-y-3">
      <LoadingSkeleton />
      <LoadingSkeleton />
      <LoadingSkeleton />
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="flex justify-between space-x-3 rounded-sm bg-muted-foreground p-3">
      <div className="flex">
        <Skeleton className="h-[125px] w-[125px]" />
        <div className="ml-3 flex flex-col">
          <div className="space-y-3">
            <Skeleton className="h-[15px] w-[200px]" />
            <Skeleton className="h-[15px] w-[100px]" />
          </div>
          <div className="mt-5 space-y-3">
            <Skeleton className="h-[10px] w-[50px]" />
            <Skeleton className="h-[10px] w-[100px]" />
            <Skeleton className="h-[10px] w-[50px]" />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end justify-between">
        <Skeleton className="h-[15px] w-[75px]" />
        <Skeleton className="h-[15px] w-[100px]" />
      </div>
    </div>
  );
}
