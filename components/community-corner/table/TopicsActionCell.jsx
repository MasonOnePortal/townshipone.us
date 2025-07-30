"use client";
import React from "react";
import { useRemovePostMutation } from "@/store/community/communityService";
import Link from "next/link";
export const TopicsActionCell = ({ id }) => {
  const [removePost] = useRemovePostMutation();

  const deleteItem = async () => {
    await removePost(id);
  };

  return (
    <>
      <div className="action_drp_dwn">
        <div className="dropdown">
          <button
            className="btn  dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Action
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
              <Link
                className="dropdown-item pointer"
                href={{
                  pathname: "/community-corners/ask-question",
                  query: { Id: id },
                }}
              >
                Edit
              </Link>
            </li>
            <li>
              <Link
                className="dropdown-item pointer"
                href={`/community-corners/${id}`}
                prefetch={false}
              >
                View
              </Link>
            </li>
            <li>
              <a
                href="#"
                className="dropdown-item pointer"
                onClick={deleteItem}
              >
                Delete
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
