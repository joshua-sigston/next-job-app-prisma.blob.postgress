import Title from "@/components/title";
import React from "react";

export default function SubmissionPage() {
  return (
    <main className="flex h-[70vh] flex-col items-center justify-center space-y-5">
      <Title>Job submitted</Title>
      <p>Your job is submitted and pending approval</p>
    </main>
  );
}
