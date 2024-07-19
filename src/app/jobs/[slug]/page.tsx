import Details from "@/components/job-details";
import { Button } from "@/components/ui/button";
import db from "@/lib/prisma";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import React, { cache } from "react";

interface Props {
  params: { slug: string };
}

const getJob = cache(async (slug: string) => {
  const job = await db.job.findUnique({
    where: { slug },
  });

  if (!job) notFound();

  return job;
});

export async function generateStaticParams() {
  const jobs = await db.job.findMany({
    where: { approved: true },
    select: { slug: true },
  });

  return jobs.map(({ slug }) => slug);
}

export async function generateMetaData({
  params: { slug },
}: Props): Promise<Metadata> {
  const job = await getJob(slug);

  return {
    title: job.title,
  };
}

export default async function JobDetails({ params: { slug } }: Props) {
  const job = await getJob(slug);

  const { applicationEmail, applicationUrl } = job;

  const applicationLink = applicationEmail
    ? `mailto:${applicationEmail}`
    : applicationUrl;

  if (!applicationLink) {
    console.error("Job has no application link or email");
    notFound();
  }

  return (
    <>
      <Details job={job} />
      <Button asChild>
        <a href={applicationLink}>Apply Now</a>
      </Button>
    </>
  );
}
