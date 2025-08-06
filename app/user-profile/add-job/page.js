import React from "react";
import { Loading } from "@/components/Loading";
import { Suspense } from "react";
import JobForm from "@/components/jobs/JobForm";
export const metadata = {
  title: {
    absolute: "Job Title - Deerfield Township & Symmes Township, OH",
  },
  description:
    "Explore exciting job opportunities in Deerfield Township & Symmes Township, OHio with Company Name. We are hiring for various roles. Find your dream job and apply today!",
};
export default function AddJobPage() {
  return (
    <Suspense fallback={<Loading />}>
      <JobForm />
    </Suspense>
  );
}
