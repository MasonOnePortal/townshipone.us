"use client";
import { TopicsTableWrapper } from "@/components/community-corner/table/TopicsTableWrapper";
import { redirect } from "next/navigation";
import { useSelector } from "react-redux";
import { CommunityHeader } from "./CommunityHeader";
import { useEffect } from "react";
import { QueryRequestProvider } from "../user-profile/add-service/real-estate/QueryRequestProvider";
export const PostsDashboard = () => {
  const { currentUser } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!currentUser.id) return redirect("/community-corners");
  }, [currentUser.id]);
  return (
    <div>
      {currentUser.id ? (
        <CommunityHeader
          mainTitle="Your Posts"
          linkOne="/community-corners/ask-question"
          titleOne="Create Post"
          linkTwo="/community-corners"
          titleTwo="All Post"
        />
      ) : null}
      <div className="py-4">
        <QueryRequestProvider>
          <TopicsTableWrapper />
        </QueryRequestProvider>
      </div>
    </div>
  );
};
