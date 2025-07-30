import { Loading } from "@/components/Loading";
import { Suspense } from "react";
import NewsByCategory from "@/components/News/NewsByCategory";
export default async function NewsByCategoryPage() {
  return (
    <Suspense fallback={<Loading />}>
      <NewsByCategory />
    </Suspense>
  );
}
