"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Previews } from "./Previews";
import {
  convertFileToBase64,
  isBase64Image,
  splitArrayByType,
} from "@/utils/helperFn";
import { useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";
import { useRemovePropertyImageMutation } from "@/store/Plan/PlanService";
import toast from "react-hot-toast";

export const ImageDropbox = ({
  imagesArrayList,
  updatedImageFiles,
  enableValidation = false,
  validHeight = 0,
  validWidth = 0,
}) => {
  const { currentPlan } = useSelector((state) => state.plan);
  const imageCount = +currentPlan.images - currentPlan.totalImagesCount;
  const [, setCount] = useState(0);

  const searchParams = useSearchParams();
  const propertyId = searchParams.get("propertyId");
  const [removePropertyImage] = useRemovePropertyImageMutation();

  const [files, setFiles] = useState(imagesArrayList);
  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);
  const convertBase64 = async (imageFiles) => {
    const imagesArr = await Promise.all(
      (imageFiles || []).map(async (image) => {
        const filePath = await convertFileToBase64(image);
        return filePath;
      })
    );
    const { matching: urlArray, nonMatching: fileArray } = splitArrayByType(
      files,
      "string"
    );
    const filesData = [...urlArray, ...imagesArr];
    updatedImageFiles(filesData);
  };

  const handleFileValidation = (file) => {
    return new Promise((resolve) => {
      const image = new Image();
      const imageUrl = URL.createObjectURL(file);
      image.src = imageUrl;
      image.onload = () => {
        URL.revokeObjectURL(imageUrl);
        if (image.width !== validWidth || image.height !== validHeight) {
          toast.error(`Image Dimension must be ${validWidth}x${validHeight}px`);
          resolve({ code: "dimension-error", message: "Invalid dimensions" });
        } else {
          resolve(null);
        }
      };
      image.onerror = () => {
        toast.error("Failed to load image");
        resolve({ code: "load-error", message: "Failed to load image" });
      };
    });
  };

  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    acceptedFiles,
    fileRejections,
  } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/jpg": [],
    },
    maxFiles: imageCount,

    // onDrop: (acceptedFiles) => {
    //   const newFiles = [
    //     ...files,
    //     ...acceptedFiles.map((file) =>
    //       Object.assign(file, {
    //         preview: URL.createObjectURL(file),
    //       })
    //     ),
    //   ];
    //   setFiles(newFiles);
    //   const { matching: fileArray, nonMatching: urlArray } = splitArrayByType(
    //     newFiles,
    //     "object"
    //   );
    //   convertBase64(fileArray);
    // },
    onDrop: async (acceptedFiles) => {
      const validFiles = [];
      for (const file of acceptedFiles) {
        if (enableValidation) {
          const validationResult = await handleFileValidation(file);
          if (!validationResult) {
            validFiles.push(
              Object.assign(file, { preview: URL.createObjectURL(file) })
            );
          }
        } else {
          validFiles.push(
            Object.assign(file, { preview: URL.createObjectURL(file) })
          );
        }
      }
      const newFiles = [...files, ...validFiles];
      setFiles(newFiles);
      const { matching: fileArray } = splitArrayByType(newFiles, "object");
      convertBase64(fileArray);
    },
  });
  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const deleteFiles = async (index, value) => {
    if (value && typeof value === "string" && !isBase64Image(value)) {
      const data = {
        imageUrl: value,
      };
      if (propertyId) {
        const { data: resData } = await removePropertyImage({
          id: propertyId,
          data: data,
        });
        if (resData.ok) {
          if (resData.ok) {
            const result = files.filter((value, key) => key !== index);
            setCount((preCount) => preCount + 1);
            setFiles(result);
            updatedImageFiles(result);
          }
        }
      }
    } else {
      const result = files.splice(index, 1);
      setCount((preCount) => preCount + 1);
      setFiles(files);
      const { matching: urlArray, nonMatching: fileArray } = splitArrayByType(
        files,
        "string"
      );
      convertBase64(fileArray);
    }
  };

  return (
    <section className="container">
      <div {...getRootProps({ style, className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop files here, or click to select files</p>
      </div>
      <aside style={thumbsContainer}>
        <Previews files={files} removeFile={deleteFiles} />
      </aside>
    </section>
  );
};
const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#1d945d",
};

const rejectStyle = {
  borderColor: "#f61515",
};

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};
