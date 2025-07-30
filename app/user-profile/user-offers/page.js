import React from "react";
import { Loading } from "@/components/Loading";
import { Suspense } from "react";
import { OfferListWrapper } from "@/components/user-profile/OfferListWrapper";
import { QueryRequestProvider } from "@/components/user-profile/add-service/real-estate/QueryRequestProvider";
export const metadata = {
  title: {
    absolute:
      "Township Excellence in the US: Unrivaled Craftsmanship and Quality Services",
  },
  description:
    "Discover unparalleled Township services in the United States. Our expert craftsmen blend artistry with precision, delivering superior results for your construction and renovation projects. Trust us for top-notch Township solutions tailored to perfection.",
};

export default function Offers() {
  return (
    <Suspense fallback={<Loading />}>
      <QueryRequestProvider>
        <OfferListWrapper />
      </QueryRequestProvider>
    </Suspense>
  );
}
