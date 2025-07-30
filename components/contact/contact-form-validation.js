import * as Yup from "yup";
export const subjectOption = [
  { value: "Record not found ", label: "Record not found " },
  { value: "Record Already Present", label: "Record Already Present" },
  {
    value: "More Than One Record Present",
    label: "More Than One Record Present",
  },
  {
    value: "Interested in Professional Services",
    label: "Interested in Professional Services",
  },
  {
    value: "Need help to enter data",
    label: "Need help to enter data",
  },
  {
    value: "Others",
    label: "Others",
  },
];

export const contactSchema = Yup.object().shape({
  email: Yup.string().required("Email is required").email("Invalid email"),
  first_name: Yup.string().required("First Name is required"),
  message: Yup.string().required("Message is required"),
  subject: Yup.string().required("Subject is required"),
  last_name: Yup.string().required("Last Name is required"),
  phone: Yup.string().required("Phone No. is required"),
});

export const inquiryForm = {
  email: "",
  first_name: "",
  last_name: "",
  phone: "",
  message: "",
  subject: "",
  business_name: "",
  others: "",
};
