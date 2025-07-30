import { InformationCategoryList } from "@/components/Information-listing/InformationCategoryList";
import { Loading } from "@/components/Loading";
import { Suspense } from "react";
export const metadata = {
  title: "Explore Essential Info for Township City | Landmark & Service",
  description:
    "Discover accurate and up-to-date information about Township City's essential services & Business. Discover our city's uniqueness and vitality",
};
const InformationList = () => {
  return (
    <Suspense fallback={<Loading />}>
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      <InformationCategoryList />
    </Suspense>
  );
};

export default InformationList;
