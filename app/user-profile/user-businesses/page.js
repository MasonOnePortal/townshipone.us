import React from "react";
import { Loading } from "@/components/Loading";
import { Suspense } from "react";
import { BusinessTableWrapper } from "@/components/user-profile/BusinessTableWrapper";
import { QueryRequestProvider } from "@/components/user-profile/add-service/real-estate/QueryRequestProvider";

export const metadata = {
  title: {
    absolute: "TownshipOne US - Elevating Excellence in Construction Services",
  },
  description:
    "Discover top-tier construction solutions with TownshipOne US. Our skilled team delivers excellence, innovation, and reliability for your projects. Elevate your construction experience today.",
};

export default function BusinessTabel() {
  return (
    <Suspense fallback={<Loading />}>
      <QueryRequestProvider>
        <BusinessTableWrapper />
      </QueryRequestProvider>
    </Suspense>
  );
}
