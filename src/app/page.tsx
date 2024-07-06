import JobFilter from "@/components/job-filter";
import JobList from "@/components/job-list";
import Title from "@/components/title";
import db from "@/lib/prisma";

export default async function Home() {
  const jobs = await db.job.findMany({
    where: { approved: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="max-w-5xl m-auto px-3 my-10 space-y-10 ">
      <div className="space-y-5 text-center">
        <Title>Developer Jobs</Title>
        <p className="text-muted-foreground">Find your dream job</p>
      </div>
      <section className="md:max-w-[600px] md:mx-auto lg:max-w-[1200px]">
        <JobList jobs={jobs} />
      </section>
    </main>
  );
}
