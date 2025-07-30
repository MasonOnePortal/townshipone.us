export default function robots() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${apiUrl}/sitemap.xml`,
  };
}
