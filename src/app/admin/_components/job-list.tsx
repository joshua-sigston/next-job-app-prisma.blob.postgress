"use client";

import JobListItem from "@/components/job-list-item";
import { Button } from "@/components/ui/button";
import { Job } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";

interface Props {
  jobs: Job[];
}

export default function JobList({ jobs }: Props) {
  const [query, setQuery] = useState("true");
  // console.log(jobs[0].approved.toString());
  const handleList = (e: any) => {
    setQuery(e.target.value);
  };

  return (
    <section className="mt-5 flex flex-col gap-3">
      <div className="max-auto flex max-w-[400px] space-x-5 self-center">
        <button
          onClick={handleList}
          value="true"
          className="cursor-pointer underline"
        >
          All Jobs
        </button>
        <button
          onClick={handleList}
          value="false"
          className="cursor-pointer underline"
        >
          Unapproved Jobs
        </button>
      </div>
      {jobs
        .filter((job) => {
          return query === "true" ? job : job.approved === false;
        })
        .map((job, index) => (
          <Link href={`/admin/jobs/${job.slug}`} key={job.id} className="block">
            <JobListItem job={job} />
          </Link>
        ))}
    </section>
  );
}
