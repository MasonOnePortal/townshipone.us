import InformationListingDetail from "@/components/Information-listing/InformationListingDetail";
import { Loading } from "@/components/Loading";
import { Suspense } from "react";
import { capitalize } from "lodash";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export async function generateMetadata({ params, searchParams }, parent) {
  const id = params.deptId;
  const { data: info } = await fetch(`${apiUrl}/information/${id}`).then(
    (res) => res.json()
  );
  const previousImages = (await parent).openGraph?.images || [];
  return {
    title: capitalize(info?.name),
    description: info?.description,
    openGraph: {
      images: [info.thumbnail, ...previousImages],
    },
  };
}
const InformationDetail = () => {
  return (
    <Suspense fallback={<Loading />}>
      <InformationListingDetail />
    </Suspense>
  );
};

export default InformationDetail;
