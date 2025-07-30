import style from "./breadcrumb.module.css";
import { FaHouse } from "react-icons/fa6";
import Link from "next/link";
function Breadcrumb({ pagename, url = "", showLeft = true }) {
  return (
    <>
      <div className="container">
        <div className={style.breadcrumb_wrap}>
          <div className="row">
            <div className="col-md-6">
              {showLeft ? <h1 className="_make">{pagename}</h1> : null}
            </div>
            <div className="col-md-6">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link href="/">
                      <FaHouse />
                      Home
                    </Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    {url ? (
                      <Link href={`${url}`}>{pagename}</Link>
                    ) : (
                      <p>{pagename}</p>
                    )}
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Breadcrumb;
