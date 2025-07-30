import OfferDetailPage from "@/components/dealsSaleClearanceItems/OfferDetailPage";
import { Loading } from "@/components/Loading";
import { Suspense } from "react";
import { capitalize } from "lodash";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export async function generateMetadata({ params, searchParams }, parent) {
  const id = params.id;
  const { data: offer } = await fetch(`${apiUrl}/offers/${id}`).then((res) =>
    res.json()
  );
  const previousImages = (await parent).openGraph?.images || [];
  return {
    title: capitalize(offer.title),
    description: offer?.description,
    openGraph: {
      images: [offer.image, ...previousImages],
    },
  };
}
const OfferDetails = () => {
  return (
    <Suspense fallback={<Loading />}>
      <OfferDetailPage />
    </Suspense>
  );
};

export default OfferDetails;
