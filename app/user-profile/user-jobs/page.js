import React from "react";
import { Loading } from "@/components/Loading";
import { Suspense } from "react";
import { JobsTableWrapper } from "@/components/jobs/JobsTableWrapper";
import { QueryRequestProvider } from "@/components/user-profile/add-service/real-estate/QueryRequestProvider";

export const metadata = {
  title: {
    absolute: "Explore TownshipOne Job Opportunities in the US - Apply Today!",
  },
  description:
    "Discover rewarding career paths at TownshipOne in the United States. Join us for a fulfilling job experience. Apply now and shape your future!",
};

export default function page() {
  return (
    <Suspense fallback={<Loading />}>
      <QueryRequestProvider>
        <JobsTableWrapper />
      </QueryRequestProvider>
    </Suspense>
  );
}
