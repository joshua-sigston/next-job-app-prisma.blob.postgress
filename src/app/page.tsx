import JobFilter from "@/components/job-filter";
import JobList from "@/components/job-list";
import Title from "@/components/title";
import { JobFilterValues } from "@/lib/validation";

interface Props {
  searchParams: {
    query?: string;
    type?: string;
    location?: string;
    remote?: string;
  };
}

export default function Home({
  searchParams: { query, type, location, remote },
}: Props) {
  const filterValues: JobFilterValues = {
    query,
    location,
    type,
    remote: remote === "true",
  };
  console.log(filterValues);

  return (
    <main className="max-w-5xl m-auto px-3 my-10 space-y-10 ">
      <div className="space-y-5 text-center">
        <Title>Developer Jobs</Title>
        <p className="text-muted-foreground">Find your dream job</p>
      </div>
      <section className="md:max-w-[600px] md:mx-auto lg:max-w-[1200px]">
        <JobFilter defaultValues={filterValues} />
        <JobList filterValues={filterValues} />
      </section>
    </main>
  );
}
