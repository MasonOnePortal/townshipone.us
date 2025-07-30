import React from "react";

export const PostInfoCell = ({ postData }) => {
  return (
    <div className="d-flex align-items-center">
      {postData.question ? <p className="mb-1"> {postData.question}</p> : null}
    </div>
  );
};
