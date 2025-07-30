import React from "react";

export const PostDetails = ({ content }) => {
  return (
    <div className="post_details_dse">
      <p dangerouslySetInnerHTML={{ __html: content }}></p>
    </div>
  );
};
