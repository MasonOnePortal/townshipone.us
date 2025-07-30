import * as Yup from "yup";
export const offerInfo = {
  discountPercentage: "",
  offerType: "",
  business: "",
  image: "",
  couponCode: "",
  title: "",
  id: "",
  termsAndConditions: "",
  startDate: "",
  endDate: "",
  description: "",
  images: [],
  videos: [],
  products: [],
};

export const validationOfferSchema = Yup.object().shape({
  title: Yup.string().required("Offer Title is required"),
  image: Yup.mixed().required("OProduct/Serviceffer image is required"),
  offerType: Yup.string().required("Please select a offerType"),
  business: Yup.string().required("Please select a business"),
  description: Yup.string().required("Description is required"),
  discountPercentage: Yup.string()
    .required("Discount % is required")
    .matches(/^\d+$/, "Discount % must contain only digits")
    .transform((value) => (value ? value.trim() : value))
    .test("valid-discount", "value between 100 and 1", (value) => {
      if (!value) {
        return true;
      }

      const numericValue = parseInt(value, 10);
      return numericValue < 100 && numericValue >= 1;
    }),
  startDate: Yup.string().required("Start Date is required"),
  endDate: Yup.string().required("End Date is required"),
  couponCode: Yup.string().required("Coupan Code is required"),
  termsAndConditions: Yup.string().required("Terms Condition is required"),
});
