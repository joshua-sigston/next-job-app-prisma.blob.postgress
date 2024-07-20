import Details from "@/components/job-details";
import db from "@/lib/prisma";
import { notFound } from "next/navigation";
import React from "react";
import SideBar from "./side-bar";

interface Props {
  params: { slug: string };
}

export default async function page({ params: { slug } }: Props) {
  const job = await db.job.findUnique({
    where: { slug },
  });

  if (!job) notFound();
  return (
    <main className="mx-3 flex max-w-5xl flex-col space-y-3 md:flex-row">
      <Details job={job} />
      <SideBar job={job} />
    </main>
  );
}
