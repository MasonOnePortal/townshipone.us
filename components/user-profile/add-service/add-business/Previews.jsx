import { MdDelete } from "react-icons/md";
import Image from "next/image";
export const Previews = ({ files, removeFile }) => {
  return (
    <>
      {Array.isArray(files) &&
        files?.map((file, index) => (
          <div className="files_wrap" style={thumb} key={index}>
            <div className="bin_file">
              <MdDelete
                onClick={() => removeFile(index, file)}
                size={16}
                fill="red"
              />
            </div>
            <div style={thumbInner}>
              <Image
                src={file.preview ? file.preview : file}
                style={img}
                width={0}
                height={0}
                sizes="100dvw"
                alt="images"
                onLoad={() => {
                  URL.revokeObjectURL(file.preview);
                }}
              />
            </div>
          </div>
        ))}
    </>
  );
};
const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};
