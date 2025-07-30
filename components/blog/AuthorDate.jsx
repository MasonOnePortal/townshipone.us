import { FaCalendarDays } from "react-icons/fa6";
import style from "./blog.module.css";
import { formatDateNew } from "@/utils/helperFn";
import Image from "next/image";

function AuthorDate({ author, publishedDate }) {
  return (
    <>
      <div className={`d-flex align-items-center ${style.blog_footer}`}>
        <div>
          <FaCalendarDays />
        </div>
        <div>
          <b>{formatDateNew(publishedDate)}</b>
        </div>
      </div>
      <div className={`d-flex align-items-center ${style.blog_footer}`}>
        <div></div>
        <div>
          <b>
            {author?.first_name} {author?.last_name}
          </b>
        </div>
      </div>
    </>
  );
}

export default AuthorDate;
