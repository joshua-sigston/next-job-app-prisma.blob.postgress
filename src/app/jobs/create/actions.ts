"use server";

import { toSlug } from "@/lib/utils";
import { createSchema } from "@/lib/validation";
import { nanoid } from "nanoid";
import { put } from "@vercel/blob";
import path from "path";
import db from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createJob(formData: FormData) {
  const values = Object.fromEntries(formData.entries());
  // throw new Error("adsakslds;lkn");
  const {
    title,
    companyName,
    salary,
    type,
    locationType,
    applicationEmail,
    applicationUrl,
    companyLogo,
    description,
    location,
  } = createSchema.parse(values);
  // console.log(
  //   title,
  //   companyName,
  //   salary,
  //   type,
  //   locationType,
  //   applicationEmail,
  //   applicationUrl,
  //   companyLogo,
  //   description,
  //   location,
  // );

  const slug = `${toSlug(title)}-${nanoid(10)}`;

  let companyLogoUrl: string | undefined = undefined;

  if (companyLogo) {
    const blob = await put(
      `company_logo/${slug}${path.extname(companyLogo.name)}`,
      companyLogo,
      { access: "public", addRandomSuffix: false },
    );

    companyLogoUrl = blob.url;
  }

  await db.job.create({
    data: {
      slug,
      title: title.trim(),
      type,
      companyName: companyName.trim(),
      companyLogoUrl,
      locationType,
      location,
      applicationEmail: applicationEmail?.trim(),
      applicationUrl: applicationUrl?.trim(),
      description: description?.trim(),
      salary: parseInt(salary),
      approved: true,
    },
  });

  redirect("/job-submission");
}
