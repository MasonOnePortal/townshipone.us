import JobsDetails from "@/components/job/JobsDetails";
import { Loading } from "@/components/Loading";
import { Suspense } from "react";
import { capitalize } from "lodash";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export async function generateMetadata({ params, searchParams }, parent) {
  const id = params.jobId;
  const { data: job } = await fetch(`${apiUrl}/jobs/${id}`).then((res) =>
    res.json()
  );
  const previousImages = (await parent).openGraph?.images || [];
  return {
    title: capitalize(job?.title),
    description: job?.description,
    openGraph: {
      images: [job.thumbnail, ...previousImages],
    },
  };
}
const JobDetailPage = async ({ params, searchParams }) => {
  return (
    <Suspense fallback={<Loading />}>
      <JobsDetails />
    </Suspense>
  );
};

export default JobDetailPage;
