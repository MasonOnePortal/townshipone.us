import InformationListWrapper from "@/components/Information-listing/InformationListWrapper";
import { Loading } from "@/components/Loading";
import { Suspense } from "react";
import { capitalize } from "lodash";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export async function generateMetadata({ params, searchParams }, parent) {
  const id = params.id;
  const { data: info } = await fetch(
    `${apiUrl}/information_category/${id}`
  ).then((res) => res.json());
  const previousImages = (await parent).openGraph?.images || [];
  return {
    title: capitalize(info?.name),
    description: info?.description,
    openGraph: {
      images: [info?.avatar, ...previousImages],
    },
  };
}
const Informations = () => {
  return (
    <Suspense fallback={<Loading />}>
      <InformationListWrapper />
    </Suspense>
  );
};

export default Informations;
