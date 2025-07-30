"use client";
export const titleList = (val) => {
  return {
    announcement: "Published Announcement",
    q_and_a: "Published Q & A",
    lost_and_found: "Published Lost & Found",
  }[val];
};

export const getTitle = (inputString) => {
  if (!inputString) return null;
  const parts = inputString.split("&").pop();
  if (parts) {
    const formattedValue = parts.replace(/-/g, "_");
    const titleValue = titleList(formattedValue);
    return titleValue;
  } else {
    return null;
  }
};

export const postConstants = {
  postType: "q-and-a",
  announcement: "announcement",
};
