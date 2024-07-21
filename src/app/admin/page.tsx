import JobListItem from "@/components/job-list-item";
import Title from "@/components/title";
import db from "@/lib/prisma";
import React from "react";
import JobList from "./_components/job-list";

export default async function AdminPage() {
  const unapprovedJobs = await db.job.findMany({
    where: { approved: false },
  });

  const jobs = await db.job.findMany();
  // console.log(jobs);
  return (
    <main className="mt-20 p-3">
      <Title className="text-center">Admin Dashboard</Title>

      {jobs && <JobList jobs={jobs} />}

      {/* <div className="max-auto flex max-w-[400px] space-x-5 self-center">
          <h2 className="text-center text-lg font-bold">All Jobs</h2>
          <h2 className="text-center text-lg font-bold">Unapproved Jobs</h2>
        </div>
        {jobs.map((job) => (
          <Link href={`/admin/jobs/${job.slug}`} key={job.id} className="block">
            <JobListItem job={job} />
          </Link>
        ))} */}
      {/* {unapprovedJobs.map((job) => (
          <Link href={`/admin/jobs/${job.slug}`} key={job.id} className="block">
            <JobListItem job={job} />
          </Link>
        ))}

        {unapprovedJobs.length === 0 && (
          <h3 className="mx-auto mt-10 text-center text-2xl">No Jobs Found</h3>
        )} */}
    </main>
  );
}
