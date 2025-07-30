import style from "./blog.module.css";
import blogUser from "@/public/imgs/user.png";
import { FaReply } from "react-icons/fa6";
import { useParams } from "next/navigation";
import { useGetCommentsOnBlogQuery } from "@/store/blogs/blogService";
import { timeAgoFn } from "@/utils/helperFn";
import Image from "next/image";
function BlogComments({ commentsData, updatePageCount }) {
  const { data: comments, nextPage, totalDocs } = { ...commentsData };
  const moreCommentsHandler = () => {
    updatePageCount();
  };
  return (
    <>
      <div className={style.blog_comment_wrapper}>
        <div className={style.comments_hdng}>
          <h2>
            Comments (<span>{totalDocs}</span>)
          </h2>
        </div>
        <ul className={style.blog_cmnt_sec}>
          {comments.map((item) => (
            <li key={item.id}>
              <div className={style.review_box}>
                <div className={style.review_profile}>
                  <div className={style.review_img}>
                    <Image src={blogUser} className="img-fluid" alt="img" />
                    <div className={style.review_name}>
                      <h6>{item.name}</h6>
                      <p>{timeAgoFn(item.createdAt)}</p>
                    </div>
                  </div>
                </div>
                <p>{item.message}</p>
              </div>
            </li>
          ))}
        </ul>
        {nextPage ? (
          <button
            type="button"
            onClick={moreCommentsHandler}
            className={style.btnstyle}
          >
            Load more
          </button>
        ) : null}
      </div>
    </>
  );
}

export default BlogComments;
