import EmpyImg from "@/public/imgs/empty.png";
import Image from "next/image";
export const Empty = ({ message = "No Result Found" }) => {
  return (
    <div>
      <div className="text-center">
        <Image src={EmpyImg} alt="empty" width={150} height={150} />
      </div>
      <p style={emptyPageStyle}>{message}</p>
    </div>
  );
};

const emptyPageStyle = {
  textAlign: "center",
  fontSize: "18px",
  fontWeight: "400",
  width: "100%",
  padding: "12px",
  marginBottom: "0px",
};
