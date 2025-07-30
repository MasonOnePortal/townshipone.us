import Link from "next/link";
export const InfoMessage = () => {
  return (
    <div>
      <h5 className="pb-3 text-center infoMessage">
        If you find more then one record on
        <Link href="https://townshipone.us/" className="click_resend">
          Townshipone.us
        </Link>
        , please submit an inquiry on the
        <Link href="/contact-us" className="click_resend px-1">
          Contact Us
        </Link>
        page
      </h5>
    </div>
  );
};
