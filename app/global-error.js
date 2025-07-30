"use client";

import Image from "next/image";

const outer = {
  position: "relative",
  width: "100dvw",
  height: "90dvh",
};

const outerInner = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  textAlign: "center",
};

const img = {
  display: "block",
  maxWidth: "245px",
};
const imgWrap = {
  marginBottom: "12px",
};
const link_btn = {
  color: "white",
  background: "#5f7693",
  border: "1px solid #5f7693",
  padding: "6px 10px",
  fontSize: "15px",
  fontWeight: "500",
  textTransform: "uppercase",
};
const link_btnHover = {
  color: "white",
  background: "#5f7693",
  border: "1px solid #5f7693",
};
const title = {
  fontSize: "16px",
  fontWeight: "600",
  color: "#000",
  textTransform: "capitalize",
  marginBottom: "12px",
};

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body>
        <div className="outer_layer" style={outer}>
          <div className="inner_content" style={outerInner}>
            <div className="mb-3">
              <div style={imgWrap}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_URL}/imgs/error.png`}
                  className="responsive"
                  style={img}
                  alt="image"
                  width={245}
                  height={300}
                />
              </div>
              <h1 style={title} className="">
                Oops! Something wrong happen{" "}
              </h1>
            </div>
            <a className="btn btn-sm link_btn " style={link_btn} href="/">
              Return Home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
