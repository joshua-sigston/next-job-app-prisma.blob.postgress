import JobListItem from "@/components/job-list-item";
import Title from "@/components/title";
import db from "@/lib/prisma";
import Link from "next/link";
import React from "react";

export default async function AdminPage() {
  const unapprovedJobs = await db.job.findMany({
    where: { approved: false },
  });

  return (
    <main className="mt-20 p-3">
      <Title className="text-center">Admin Dashboard</Title>
      <section className="mt-5 flex flex-col gap-3">
        <h2 className="text-center text-lg font-bold">Unapproved Jobs</h2>
        {unapprovedJobs.map((job) => (
          <Link href={`/admin/jobs/${job.slug}`} key={job.id} className="block">
            <JobListItem job={job} />
          </Link>
        ))}
        {unapprovedJobs.length === 0 && (
          <h3 className="mx-auto mt-10 text-center text-2xl">No Jobs Found</h3>
        )}
      </section>
    </main>
  );
}
