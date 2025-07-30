"use client";
import * as Yup from "yup";
export const realEstateInfo = {
  city: "Township",
  state: "OH",
  website: "",
  price: "",
  interior: "",
  availableDate: "",
  address: "",
  zipCode: "",
  description: "",
  thumbnail: "",
  name: "",
  area: "",
  videos: "",
  elevator: "",
  swimmingPool: "",
  fireplace: "",
  year: "",
  bathroom: "",
  bedroom: "",
  wifi: "",
  exterior: "",
  propertyType: "",
  propertyAvailable: "",
  ownerName: "",
  email: "",
  images: [],
};
const currentYear = new Date().getFullYear();
export const validationSchema = Yup.object().shape({
  name: Yup.string().nullable().required("Title is required"),
  ownerName: Yup.string(),
  price: Yup.string()
    // .matches(/^\d+$/, "Price must consist of digits only")
    .transform((value) => (value ? value.trim() : value)),
  propertyType: Yup.string(),
  availableDate: Yup.string(),
  email: Yup.string()
    .email("Invalid email")
    .transform((value) => (value ? value.trim() : value)),
  zipCode: Yup.string()
    .nullable()
    .test("isValidLength", "Zip Code must be exactly 5 digits", (value) => {
      if (!value || value === "") return true;
      return /^\d{5}$/.test(value);
    }),
  // .matches(/^[0-9]+$/, "Zip Code must contain only digits")
  area: Yup.string()
    .nullable()
    .test({
      name: "area",
      test: function (value) {
        if (!!value) {
          return Yup.string()
            .matches(/^\d+$/, "Area must consist of digits only")
            .transform((value) => (value ? value.trim() : value))
            .isValidSync(value);
        }
        return true; // Allow null or empty value
      },
    }),
  bathroom: Yup.string()
    .nullable()
    .test({
      name: "bathroom",
      test: function (value) {
        if (!!value) {
          return Yup.string()
            .matches(/^\d+$/, "Bathroom must consist of digits only")
            .transform((value) => (value ? value.trim() : value))
            .isValidSync(value);
        }
        return true; // Allow null or empty value
      },
    }),
  bedroom: Yup.string()
    .nullable()
    .test({
      name: "bedroom",
      test: function (value) {
        if (!!value) {
          return Yup.string()
            .matches(/^\d+$/, "Bedroom must consist of digits only")
            .transform((value) => (value ? value.trim() : value))
            .isValidSync(value);
        }
        return true; // Allow null or empty value
      },
    }),
  website: Yup.string().nullable(),
  year: Yup.string().test(
    "valid-year",
    "Year must be between 1950 and the current year",
    (value) => {
      if (!value) {
        return true; // Allow null or empty value
      }
      const numericValue = parseInt(value, 10);
      return numericValue >= 1950 && numericValue <= currentYear;
    }
  ),
  // .matches(/^\d{4}$/, "Year must be exactly 4 digits")
});

// static options
export const options = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "more than 4", label: "more than 4" },
];
export const headingOptions = [
  { value: "Force Heat ", label: "Force Heat " },
  { value: "Flame heat", label: "Flame heat" },
  { value: "Induction Heat", label: "Induction Heat" },
  { value: "Solar heat", label: "Solar heat" },
];
export const exteriorOptions = [
  { value: "Sale", label: "Sale" },
  { value: "Rent ", label: "Rent " },
  { value: "Lease ", label: "Lease " },
];
export const coolingOptions = [
  { value: "Central Ac", label: "Central Ac" },
  { value: "window Ac", label: "window Ac" },
  { value: "Other", label: "Other" },
];
export const propertyOptions = [
  { value: "Residential", label: "Residential" },
  { value: "Commercial", label: "Commercial" },
  { value: "Inudstrial", label: "Inudstrial" },
  { value: "Land", label: "Land" },
];
export const kitchenOptions = [
  { value: "Normal", label: "Normal" },
  { value: "Modular", label: "Modular" },
  { value: "other", label: "other" },
];
