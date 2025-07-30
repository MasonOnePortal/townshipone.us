import React from "react";
import { Loading } from "@/components/Loading";
import { Suspense } from "react";
import { RealEstateTableWrapper } from "@/components/user-profile/add-service/real-estate/RealEstateTableWrapper";
import { QueryRequestProvider } from "@/components/user-profile/add-service/real-estate/QueryRequestProvider";

export const metadata = {
  title: {
    absolute:
      "Discover Your Dream Home in Township, Ohio - Premier Real Estate Listings",
  },
  description:
    "Explore exclusive real estate options in Township, Ohio. Find your perfect home with our expert guidance and comprehensive listings. Your dream home awaits!",
};

export default function page() {
  return (
    <Suspense fallback={<Loading />}>
      <QueryRequestProvider>
        <RealEstateTableWrapper />
      </QueryRequestProvider>
    </Suspense>
  );
}
