import PropertyDetailsPage from "@/components/realestates/PropertyDetailsPage";
import { Loading } from "@/components/Loading";
import { Suspense } from "react";
import { capitalize } from "lodash";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export async function generateMetadata({ params, searchParams }, parent) {
  const id = params.propertyId;
  const { data: property } = await fetch(`${apiUrl}/real_estates/${id}`).then(
    (res) => res.json()
  );
  const previousImages = (await parent).openGraph?.images || [];
  return {
    title: capitalize(property.name),
    description: property?.description,
    openGraph: {
      images: [property.thumbnail, ...previousImages],
    },
  };
}
const RealEstateDetail = () => {
  return (
    <Suspense fallback={<Loading />}>
      <PropertyDetailsPage />
    </Suspense>
  );
};

export default RealEstateDetail;
