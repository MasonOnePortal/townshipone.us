import { Loading } from "@/components/Loading";
import { PostFormWrapper } from "@/components/community-corner/center/PostFormWrapper";
import React, { Suspense } from "react";
export const metadata = {
  title: "Ask Question: Connect to you own Community",
  description:
    "Township City Portal, is your gateway to connect with your community in Iowa. Explore local resources, businesses, events, and news tailored to enrich your life",
};
const page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      <PostFormWrapper />
    </Suspense>
  );
};

export default page;
