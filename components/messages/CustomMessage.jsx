import Link from "next/link";
export const metadata = {
  title:
    "Township & Nearby Cities and Towns Community: Connect, Support, and Grow Together | TownshipOne",
  description:
    "Stay informed and connect with your community in the Greater Township Neighborhood Hub. Find local events, share stories, lost & found info, announcements, and engage with residents in Township, OH and nearby cities and townships. | TownshipOne",
  robots: "noindex, follow",
};
export const CustomMessage = () => {
  return (
    <div>
      <h2 className="text-center pb-3">Success</h2>
      <h5 className="pb-3 text-center">
        Thank you for registering. If you find more then one record on{" "}
        <Link href="https://townshipone.us/" className="click_resend">
          TownshipOne.us
        </Link>
        , please{" "}
        <Link href="/contact-us" className="click_resend">
          contact us
        </Link>
        on this page , and we will delete the old record.
      </h5>
    </div>
  );
};
