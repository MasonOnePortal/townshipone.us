import NewsDetails from "@/components/News/NewsDetails";
import { Loading } from "@/components/Loading";
import { Suspense } from "react";
import { capitalize } from "lodash";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export async function generateMetadata({ params, searchParams }, parent) {
  const id = params.newsId;
  const { data: news } = await fetch(`${apiUrl}/news/${id}`).then((res) =>
    res.json()
  );
  const previousImages = (await parent).openGraph?.images || [];
  return {
    title: capitalize(news?.name),
    description: news?.description,
    openGraph: {
      images: [news.thumbnail, ...previousImages],
    },
  };
}
export default async function NewsDetailsPage() {
  return (
    <Suspense fallback={<Loading />}>
      <NewsDetails />
    </Suspense>
  );
}
