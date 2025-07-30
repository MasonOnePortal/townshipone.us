import Link from "next/link";
import Image from "next/image";
import "./notFound.css";

export default function NotFound() {
  return (
    <div className="d-flex flex-column flex-center text-center p-10">
      <div className="w-lg-650px py-5">
        <div className=" py-15 py-lg-20">
          <h1 className="fw-bolder fs-2hx text-gray-900 mb-4">Oops!</h1>
          <div className="fw-semibold fs-6 text-gray-500 mb-7">
            We can't find that page.
          </div>
          <div className="mb-3">
            <Image
              src="/imgs/404.svg"
              className="mw-100 mh-300px theme-light-show"
              alt=""
              width={300}
              height={300}
            />
          </div>
          <div className="mb-0">
            <Link className="btn btn-sm link_btn " href="/">
              Return Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
