import React from "react";
import Link from "next/link";

export const BlogBrudcrum = ({ category }) => {
  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb mb-0">
          <li className="breadcrumb-item">
            <Link href="/blog">All Blogs</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            <p>{category}</p>
          </li>
        </ol>
      </nav>
    </>
  );
};
