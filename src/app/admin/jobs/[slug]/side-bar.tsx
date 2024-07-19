"use client";

import SubmitBtn from "@/components/submit-btn";
import { Job } from "@prisma/client";
import { useFormState } from "react-dom";
import { approveJob } from "../../actions";

interface Props {
  job: Job;
}

export default function SideBar({ job }: Props) {
  return (
    <aside className="flex w-[200px] flex-none flex-row items-center gap-2 md:flex-col md:items-stretch">
      {job.approved ? <span>Approved</span> : <ApproveBtn jobId={job.id} />}
    </aside>
  );
}

interface ButtonProps {
  jobId: number;
}

function ApproveBtn({ jobId }: ButtonProps) {
  const [formState, formAction] = useFormState(approveJob, undefined);

  return (
    <form action={formAction}>
      <input type="hidden" />
      <SubmitBtn className="bg-green-300">Approve</SubmitBtn>
      {formState?.error && <p>{formState.error}</p>}
    </form>
  );
}
