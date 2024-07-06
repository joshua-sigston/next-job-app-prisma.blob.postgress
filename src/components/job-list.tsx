import { Job } from "@prisma/client";
import React, { useState } from "react";
import JobListItem from "./job-list-item";
import JobFilter from "./job-filter";
import SelectLocation from "./select";

interface Props {
  jobs: Job[];
}

export default function JobList({ jobs }: Props) {
  return (
    <div className="lg:flex items-start space-x-5">
      <JobFilter jobs={jobs} />
      <div className="space-y-4">
        {jobs.map((job) => (
          <JobListItem job={job} key={job.id} />
        ))}
      </div>
    </div>
  );
}
