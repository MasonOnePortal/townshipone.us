"use client";
import { useSelector } from "react-redux";
import userprofile from "@/public/imgs/blank.svg";
import style from "@/components/user-profile/profile.module.css";
import toast, { Toaster } from "react-hot-toast";
import { useRef } from "react";
import { isEmpty } from "lodash";
import { useChangeProfileMutation } from "@/store/user/userService";
import Image from "next/image";
import { Loading } from "@/components/Loading";
import { FaPencilAlt } from "react-icons/fa";
export const UserProfilePic = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const { currentPlan } = useSelector((state) => state.plan);
  const [changeProfile] = useChangeProfileMutation();
  const fileInputRef = useRef();
  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = () => {
        reject("Error converting file to Base64");
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      const img = new window.Image();
      img.src = imageUrl;

      img.onload = async () => {
        const { width, height } = img;
        if (width === 400 && height === 400) {
          const base64 = await convertFileToBase64(file);
          onSubmit(base64);
        } else {
          toast.error("Profile Image must be 400x400 pixels.");
        }
        URL.revokeObjectURL(imageUrl);
      };

      img.onerror = () => {
        toast.error("Failed to load image. Please try again.");
      };
    }
  };

  const handleUploadButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const onSubmit = async (Filedata) => {
    try {
      // window.location.reload();
      const { data: resData } = await changeProfile({
        id: currentUser.id,
        avatar: Filedata,
      });

      if (!isEmpty(resData) && resData.ok) {
        toast.success("file Uploaded!");
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };
  if (isEmpty(currentUser)) return <Loading />;
  return (
    <>
      <div className={style.user_profile_img}>
        <div className="image-container">
          <div
            onClick={handleUploadButtonClick}
            className={` ${style.user_profile_wrap} image-wrappers`}
          >
            <Image
              src={currentUser.avatar ? currentUser.avatar : userprofile}
              alt="avatar"
              width={0}
              height={0}
              sizes="100dvw"
            />
            <div className="overlay">
              <FaPencilAlt className="pencil-icon" />
            </div>
          </div>
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            onChange={handleFileChange}
            style={{ display: "none" }}
            ref={fileInputRef}
          />
        </div>
        <div className="">
          <div className="">
            <h4>{`${currentUser?.first_name} ${currentUser?.last_name}`}</h4>
          </div>
          <div className="">
            <span className="pln_dd_cc">({currentPlan.name})</span>
          </div>
        </div>
      </div>
      <Toaster position="bottom-right" />
    </>
  );
};
