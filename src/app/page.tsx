import JobListItem from "@/components/job-list-item";
import db from "@/lib/prisma";
import Image from "next/image";

export default async function Home() {
  const jobs = await db.job.findMany({
    where: { approved: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="max-w-5xl m-auto px-3 my-10 space-y-10 ">
      <div className="space-y-5 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Developer Jobs
        </h1>
        <p className="text-muted-foreground">Find your dream job</p>
      </div>
      <section>
        <div className="space-y-4">
          {jobs.map((job) => (
            <JobListItem job={job} key={job.id} />
          ))}
        </div>
      </section>
    </main>
  );
}
