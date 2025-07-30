import BlogDetails from "@/components/blog/BlogDetails";
import { Loading } from "@/components/Loading";
import Head from "next/head";
import { Suspense } from "react";
import { capitalize } from "lodash";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export async function generateMetadata({ params, searchParams }, parent) {
  const id = params.blogId;
  const { data: blog } = await fetch(`${apiUrl}/blogs/${id}`).then((res) =>
    res.json()
  );
  const previousImages = (await parent).openGraph?.images || [];
  return {
    title: capitalize(blog.name),
    description: blog?.description,
    openGraph: {
      images: [blog.thumbnail, ...previousImages],
    },
  };
}
export default async function BlogDetailPage({ searchParams, params }) {
  return (
    <Suspense fallback={<Loading />}>
      <BlogDetails />
    </Suspense>
  );
}
