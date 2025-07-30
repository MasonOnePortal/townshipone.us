import "./cards.css";
import { MdOutlineFestival, MdOutlineHome } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaAddressCard, FaPercent } from "react-icons/fa6";
import { GrBlog } from "react-icons/gr";
const getIconByType = (iconType) => {
  switch (iconType) {
    case "real estate":
      return <MdOutlineHome />;
    case "businesses":
      return <IoMdAddCircleOutline />;
    case "offer":
      return <FaPercent />;
    case "jobs":
      return <FaAddressCard />;
    // case "blogs":
    //   return <GrBlog />;
    default:
      return <MdOutlineFestival />;
  }
};
const Cards = ({ title, length, icon, lastMonth }) => {
  const selectedIcon = getIconByType(icon);

  return (
    <>
      <div className="mt-6 col-xl-3 col-lg-6 col-md-12 col-12 mb-4">
        <div className="card c-shadow">
          <div className="card-body card-bcd">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <div>
                <h6 className="mb-0">{title || "Title"}</h6>
              </div>
              <div className="icon-shape icon-md   rounded-2 styl-icon">
                {selectedIcon}
              </div>
            </div>
            <div>
              <h4 className="fw-bold ">{length}</h4>
              <div className="d-flex align-items-center justify-content-between">
                <p className="mb-0 fnt-styl">Current Month</p>
                <p className="mb-0 fnt-styl bold">{lastMonth}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cards;
