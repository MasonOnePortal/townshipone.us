import React from "react";
import { Loading } from "@/components/Loading";
import { Suspense } from "react";
import { UserReviewWrapper } from "@/components/details-page/reviews/UserReviewWrapper";
import { QueryRequestProvider } from "@/components/user-profile/add-service/real-estate/QueryRequestProvider";
export default function UserReviewPage() {
  return (
    <Suspense fallback={<Loading />}>
      <QueryRequestProvider>
        <UserReviewWrapper />
      </QueryRequestProvider>
    </Suspense>
  );
}
