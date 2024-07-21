import JobFilter from "@/components/job-filter";
import JobList from "@/components/job-list";
import Title from "@/components/title";
import { JobFilterValues } from "@/lib/validation";
import { Metadata } from "next";

interface Props {
  searchParams: {
    query?: string;
    type?: string;
    location?: string;
    locationType?: string;
    remote?: string;
    page?: string;
  };
}

function getTitle({ query, type, location, locationType }: JobFilterValues) {
  const titlePrefix = query
    ? `${query} jobs`
    : type
      ? `${type} developer jobs`
      : locationType
        ? `${locationType} developer jobs`
        : "All developer Jobs";
  const titleSuffix = location ? ` in ${location}` : "";

  return `${titlePrefix}${titleSuffix}`;
}

export function generateMetaData({
  searchParams: { query, location, type, locationType },
}: Props): Metadata {
  return {
    title: `${getTitle({
      query,
      location,
      type,
      locationType,
    })} | Link Jobs`,
  };
}

export default function Home({
  searchParams: { query, type, location, locationType, page },
}: Props) {
  const filterValues: JobFilterValues = {
    query,
    location,
    type,
    locationType,
  };
  console.log(filterValues);

  return (
    <main className="m-auto my-10 max-w-5xl space-y-10 px-3">
      <div className="space-y-5 text-center">
        <Title>{getTitle(filterValues)}</Title>
        <p className="text-muted-foreground">Find your dream job</p>
      </div>
      <section className="md:mx-auto md:max-w-[600px] lg:max-w-[900px]">
        <JobFilter defaultValues={filterValues} />
        <JobList
          filterValues={filterValues}
          page={page ? parseInt(page) : undefined}
        />
      </section>
    </main>
  );
}
