import Markdown from "@/components/markdown";
import { Button } from "@/components/ui/button";
import db from "@/lib/prisma";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Briefcase, MapPin, Globe2, Banknote, Clock } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
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
  const {
    title,
    description,
    companyLogoUrl,
    companyName,
    applicationEmail,
    applicationUrl,
    type,
    location,
    locationType,
    salary,
  } = await getJob(slug);

  const applicationLink = applicationEmail
    ? `mailto:${applicationEmail}`
    : applicationUrl;

  if (!applicationLink) notFound();

  return (
    <main className="w-full grow space-y-5 px-5">
      <div className="flex items-center gap-3">
        {companyLogoUrl && (
          <Image
            src={companyLogoUrl}
            alt={companyName}
            width={100}
            height={100}
            className="hidden rounded-xl md:block"
          />
        )}
      </div>
      <div>
        <div>
          <h1 className="text-lg font-semibold">{title}</h1>
          <p className="mb-1 mt-1">
            {applicationUrl ? (
              <Link
                href={new URL(applicationUrl).origin}
                className="text-green-500"
              >
                {companyName}
              </Link>
            ) : (
              <span>{companyName}</span>
            )}
          </p>
        </div>
        <div>
          <p className="flex items-center gap-1.5">
            <Briefcase size={16} className="shrink-0" /> {type}
          </p>
          <p className="flex items-center gap-1.5">
            <MapPin size={16} className="shrink-0" /> {locationType}
          </p>
          <p className="flex items-center gap-1.5">
            <Globe2 size={16} className="shrink-0" /> {location || "worldwide"}
          </p>
          <p className="flex items-center gap-1.5">
            <Banknote size={16} className="shrink-0" /> {formatCurrency(salary)}
          </p>
          <Button asChild>
            <a href={applicationLink}>Apply Now</a>
          </Button>
        </div>
      </div>
      <div>{description && <Markdown>{description}</Markdown>}</div>
    </main>
  );
}
