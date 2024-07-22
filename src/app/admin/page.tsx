import Title from "@/components/title";
import db from "@/lib/prisma";
import React, { Suspense } from "react";
import JobList from "./_components/job-list";
import LoadingSkeletons from "../../components/loading-skeletons";

async function getJobs() {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const res = await db.job.findMany();

  return res;
}

export default async function AdminPage() {
  const jobs = await getJobs();
  console.log(jobs);
  return (
    <main className="mt-20 p-3">
      <Title className="text-center">Admin Dashboard</Title>
      <JobList jobs={jobs} />
    </main>
  );
}
