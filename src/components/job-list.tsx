import React, { useState } from "react";
import JobListItem from "./job-list-item";
import JobFilter from "./job-filter";
import db from "@/lib/prisma";
import { JobFilterValues } from "@/lib/validation";
import { Prisma } from "@prisma/client";
import Link from "next/link";

interface Props {
  filterValues: JobFilterValues;
}

export default async function JobList({
  filterValues: { query, type, location, remote },
}: Props) {
  const searchString = query
    ?.split(" ")
    .filter((word) => word.length > 0)
    .join(" & ");

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
      remote ? { locationType: "Remote" } : {},
      { approved: true },
    ],
  };

  const jobs = await db.job.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mt-10 items-start space-x-5 lg:flex">
      <div className="space-y-4">
        {jobs.map((job) => (
          <Link href={`/jobs/${job.slug}`} key={job.id} className="block">
            <JobListItem job={job} />
          </Link>
        ))}
        {jobs.length === 0 && (
          <h3 className="mx-auto mt-10 text-center text-2xl">No Jobs Found</h3>
        )}
      </div>
    </div>
  );
}
