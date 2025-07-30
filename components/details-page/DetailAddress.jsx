import { GrLocation } from "react-icons/gr";
import Bed from "@/public/imgs/bed.svg";
import Bathroom from "@/public/imgs/bathroom.svg";
import Sqft from "@/public/imgs/sqft.svg";
import Image from "next/image";
import { FaBuilding, FaRegBuilding } from "react-icons/fa6";
import { MdAccessTime, MdMapsHomeWork } from "react-icons/md";

const DetailAddress = ({ property }) => {
  return (
    <>
      <div className={`{style.info_itm_wrp}`}>
        <div className="card">
          <div>
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <div className="ind_icon">
                  <MdMapsHomeWork />
                </div>
                <h6>{property?.name}</h6>
              </div>
              <div className="d-flex align-items-center ind_type">
                <div className="ind_icon">
                  <FaBuilding />
                </div>
                <h6>{property.propertyType}</h6>
              </div>
              <div className="d-flex align-items-center beds_bath_sqft">
                {property.bedroom ? (
                  <div className="d-flex align-items-center">
                    <div>
                      <Image src={Bed} alt="image" />
                    </div>
                    <div>
                      <p>{property.bedroom} Beds</p>
                    </div>
                  </div>
                ) : null}
                <div className="d-flex align-items-center">
                  <div>
                    <Image src={Bathroom} alt="image" />
                  </div>
                  <div>
                    <p>{property.bathroom} Bath</p>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <div>
                    <Image src={Sqft} alt="image" />
                  </div>
                  <div>
                    <p>{property.area} (sq. ft.)</p>
                  </div>
                </div>

                <div className="d-flex align-items-center">
                  <div
                    className="realEstateIcon"
                    style={{ backgroundColor: "#edf1f9" }}
                  >
                    <FaRegBuilding className="toilet_icon  " />
                  </div>
                  <div>
                    <p>{property?.propertyAvailable}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailAddress;
