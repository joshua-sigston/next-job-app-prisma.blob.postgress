import { Job } from "@prisma/client";
import { notFound } from "next/navigation";
import React from "react";
import Image from "next/image";
import { Briefcase, MapPin, Globe2, Banknote, Clock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Markdown from "@/components/markdown";
import { formatCurrency } from "@/lib/utils";

interface Props {
  job: Job;
}

export default function Details({
  job: {
    title,
    description,
    companyName,
    applicationUrl,
    type,
    locationType,
    location,
    salary,
    companyLogoUrl,
  },
}: Props) {
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
        </div>
      </div>
      <div>{description && <Markdown>{description}</Markdown>}</div>
    </main>
  );
}
