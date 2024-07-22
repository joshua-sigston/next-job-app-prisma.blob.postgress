import React, { useState } from "react";
import JobListItem from "./job-list-item";
import JobFilter from "./job-filter";
import db from "@/lib/prisma";
import { JobFilterValues } from "@/lib/validation";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  filterValues: JobFilterValues;
  page?: number;
}

export default async function JobList({ filterValues, page = 1 }: Props) {
  const { query, type, location, locationType } = filterValues;
  const searchString = query
    ?.split(" ")
    .filter((word) => word.length > 0)
    .join(" & ");

  const jobsPerPage = 6;
  const skip = (page - 1) * jobsPerPage;

  const searchFilter: Prisma.JobWhereInput = searchString
    ? {
        OR: [
          { title: { search: searchString } },
          { companyName: { search: searchString } },
          { type: { search: searchString } },
          { locationType: { search: searchString } },
          { location: { search: searchString } },
        ],
      }
    : {};

  const where: Prisma.JobWhereInput = {
    AND: [
      searchFilter,
      type ? { type } : {},
      location ? { location } : {},
      locationType ? { locationType } : {},
      { approved: true },
    ],
  };

  const jobsPromise = db.job.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: jobsPerPage,
    skip,
  });

  const delayPromise = new Promise((resolve, reject) => {
    setTimeout(resolve, 3000, console.log("fofo"));
  });

  const countPromise = db.job.count({ where });

  const [jobs, count, delay] = await Promise.all([
    jobsPromise,
    countPromise,
    delayPromise,
  ]);

  return (
    <div className="mt-10 flex flex-col items-stretch justify-center space-x-5">
      <div className="space-y-4">
        {jobs.map((job) => (
          <Link href={`/jobs/${job.slug}`} key={job.id} className="block">
            <JobListItem job={job} />
          </Link>
        ))}
        {jobs.length === 0 && (
          <h3 className="mx-auto mt-10 text-center text-2xl">No Jobs Found</h3>
        )}
        {jobs.length > 0 && (
          <Pagination
            currentPage={page}
            totalPages={Math.ceil(count / jobsPerPage)}
            filterValues={filterValues}
          />
        )}
      </div>
    </div>
  );
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  filterValues: JobFilterValues;
}

function Pagination({
  currentPage,
  totalPages,
  filterValues: { query, type, location, locationType },
}: PaginationProps) {
  const generatePageLink = (page: number) => {
    const searchParams = new URLSearchParams({
      ...(query && { query }),
      ...(type && { type }),
      ...(location && { location }),
      ...(locationType && { locationType }),
      page: page.toString(),
    });

    return `/?${searchParams.toString()}`;
  };

  return (
    <div className="flex justify-between">
      <Link
        href={generatePageLink(currentPage - 1)}
        className={cn(
          "flex items-center gap-2 font-semibold",
          currentPage <= 1 && "invisible",
        )}
      >
        <ArrowLeft size={16} />
        Previous page
      </Link>
      <span className="font-semibold">
        Page {currentPage} of {totalPages}
      </span>
      <Link
        href={generatePageLink(currentPage + 1)}
        className={cn(
          "flex items-center gap-2 font-semibold",
          currentPage >= totalPages && "invisible",
        )}
      >
        Next page
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}
