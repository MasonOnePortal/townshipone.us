import { Loading } from "@/components/Loading";
import { PostsDashboard } from "@/components/community-corner/PostsDashboard";
import { Suspense } from "react";
export const metadata = {
  title: "User's All Topics",
  description:
    "Township City Portal, is your gateway to connect with your community in Iowa. Explore local resources, businesses, events, and news tailored to enrich your life",
};
const MyTopics = () => {
  return (
    <Suspense fallback={<Loading />}>
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      <PostsDashboard />
    </Suspense>
  );
};

export default MyTopics;
