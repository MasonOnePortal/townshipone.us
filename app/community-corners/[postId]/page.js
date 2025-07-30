import { CommunityPostDetail } from "@/components/community-corner/CommunityPostDetail";
import React from "react";
import { Loading } from "@/components/Loading";
import { Suspense } from "react";
import { capitalize } from "lodash";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export async function generateMetadata({ params, searchParams }, parent) {
  const id = params.postId;
  const { data: info } = await fetch(`${apiUrl}/community_posts/${id}`).then(
    (res) => res.json()
  );
  const previousImages = (await parent).openGraph?.images || [];
  return {
    title: capitalize(info?.question),
    description:
      "Discover the heart of TownshipOne with our Community Corner! A hub of local activities, events, and connections. Join us to build a thriving community together. #TownshipOne #CommunityLife",
    openGraph: {
      images: [info.thumbnail, ...previousImages],
    },
  };
}
function PostDetailPage() {
  return (
    <Suspense fallback={<Loading />}>
      <CommunityPostDetail />
    </Suspense>
  );
}

export default PostDetailPage;
