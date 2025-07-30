import Link from "next/link";
import style from "./blog.module.css";
import imgPlaceHolder from "@/public/imgs/PlaceHolder.jpg";
import AuthorDate from "./AuthorDate";
import Image from "next/image";
import { useState } from "react";
function BlogItem({ blog }) {
  const blogData = blog.postedBy;
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };
  return (
    <>
      <div className={`card ${style.card_cstmz}`}>
        <div className={style.blog_item_wrpa}>
          <div className={style.blog_img_wrap}>
            <Link href={`/${blog.url}`}>
              <Image
                src={imageError ? imgPlaceHolder : blog.image || imgPlaceHolder}
                onError={handleImageError}
                alt={blog.name}
                width={0}
                height={0}
                sizes="100dvw"
                style={{ width: "100%", height: "210px" }}
              />
            </Link>
            <h4>{blog.category.name}</h4>
          </div>
          <div className={style.blog_text_wrap}>
            <div className={`card-body ${style.blg_bdy}`}>
              <Link href={`/${blog.url}`}>
                <h3>{blog.name}</h3>
              </Link>
              <div
                className={style.des_wrap}
                dangerouslySetInnerHTML={{
                  __html: blog.description,
                }}
              ></div>
            </div>
            <div className={`card-footer ${style.crd_f_cust}`}>
              <div className="d-flex justify-content-between">
                <AuthorDate author={blogData} publishedDate={blog.createdAt} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BlogItem;
