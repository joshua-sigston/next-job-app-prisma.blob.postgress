import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import Select from "./select";
import { Job } from "@prisma/client";
import db from "@/lib/prisma";
import { jobTypes, locationTypes } from "@/lib/job-types";
import { Button } from "./ui/button";
import { filtersSchema } from "@/lib/validation";
import { redirect } from "next/navigation";

interface Props {
  jobs: Job[];
}

async function filterJobs(formData: FormData) {
  "use server";
  // throw new Error();

  const values = Object.fromEntries(formData.entries());

  const { query, type, location, remote } = filtersSchema.parse(values);

  const searchParams = new URLSearchParams({
    ...(query && { query: query.trim() }),
    ...(type && { type }),
    ...(location && { location }),
    ...(remote && { remote: "true" }),
  });
  console.log(searchParams);
  redirect(`/?${searchParams.toString()}`);
}

export default async function JobFilter({ jobs }: Props) {
  const locations = (await db.job
    .findMany({
      where: { approved: true },
      select: { location: true },
      distinct: ["location"],
    })
    .then((locations) =>
      locations.map(({ location }) => location).filter(Boolean),
    )) as string[];
  // console.log("jobfilter " + locations);

  return (
    <aside>
      <form action={filterJobs}>
        <div className="flex flex-col space-y-5">
          <div className="space-y-3">
            <Label htmlFor="query">Search</Label>
            <Input id="query" name="query" placeholder="Title, company, etc." />
          </div>
          {/* <div className="flex flex-col gap-2">
            <Label htmlFor="locationType">Location Type</Label>
            <Select id="locationType" name="locationType">
              <option value="">All Location Types</option>
              {locationTypes.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </Select>
          </div> */}
          <div className="flex flex-col space-y-3">
            <Label htmlFor="jobType">Job Type</Label>
            <Select id="jobType" name="jobType">
              <option value="">All Jobs</option>
              {jobTypes.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex flex-col space-y-3">
            <Label htmlFor="location">Location</Label>
            <Select id="location" name="location">
              <option value="">All locations</option>
              {locations.map((location, index) => (
                <option key={index} value={location}>
                  {location}
                </option>
              ))}
            </Select>
          </div>
        </div>
        <Button type="submit" className="mt-5 w-full">
          Search
        </Button>
      </form>
    </aside>
  );
}
