"use client";
import React from "react";
import style from "@/components/community-corner/community_corners.module.css";
import Link from "next/link";
import { Loading } from "@/components/Loading";
import { useGetAllPostQuery } from "@/store/community/communityService";

function RightArea() {
  const { data: posts, isLoading, isError } = useGetAllPostQuery();
  if (isLoading) return <Loading />;
  if (isError) return <div>Error fetching posts</div>;
  return (
    <>
      <div className="card">
        <div className="card-header">
          <h3>Recent Topic</h3>
        </div>
        <div className="card-body _card_s">
          <ul>
            {posts.data.map((item) => (
              <li key={item.id}>
                <Link
                  className="_topic_name"
                  href={`/community-corners/${item.id}`}
                >
                  {item.question}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default RightArea;
