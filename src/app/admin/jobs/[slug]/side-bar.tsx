"use client";

import SubmitBtn from "@/components/submit-btn";
import { Job } from "@prisma/client";
import { useFormState } from "react-dom";
import { approveJob, deleteJob } from "../../actions";

interface Props {
  job: Job;
}

export default function SideBar({ job }: Props) {
  return (
    <aside className="flex flex-row items-center justify-around p-3 md:w-[200px] md:flex-col md:justify-center">
      {job.approved ? <span>Approved</span> : <ApproveBtn jobId={job.id} />}
      <DeleteBtn jobId={job.id} />
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
      <input type="hidden" name="jobId" value={jobId} />
      <SubmitBtn className="bg-green-300">Approve</SubmitBtn>
      {formState?.error && <p>{formState.error}</p>}
    </form>
  );
}

function DeleteBtn({ jobId }: ButtonProps) {
  const [formState, formAction] = useFormState(deleteJob, undefined);

  return (
    <form action={formAction}>
      <input type="hidden" name="jobId" value={jobId} />
      <SubmitBtn className="bg-red-500">Delete</SubmitBtn>
      {formState?.error && <p>{formState.error}</p>}
    </form>
  );
}
