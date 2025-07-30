import { cookies } from "next/headers";
export const isLoggedIn = () => {
  const cookieStore = cookies();
  const hasCookie = cookieStore.has("isAuthenticated");
  if (!hasCookie) return false;
  const { value } = cookieStore.get("isAuthenticated");
  return value;
};
