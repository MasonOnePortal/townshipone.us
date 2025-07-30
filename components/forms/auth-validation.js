import * as Yup from "yup";

export const schema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email")
    .transform((value) => (value ? value.trim() : value)),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g,
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one digit, and one special character."
    ),
  first_name: Yup.string()
    .required("First Name is required")
    .transform((value) => (value ? value.trim() : value))
    .min(3, "First Name must have at least 3 letters"),
  last_name: Yup.string()
    .required("Last Name is required")
    .transform((value) => (value ? value.trim() : value))
    .min(3, "Last Name must have at least 3 letters"),
  phone: Yup.string()
  .required("Phone No. is required"),
  // .transform((value) => (value ? value.trim() : value)),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

export const signUpForm = {
  first_name: "",
  last_name: "",
  phone: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const loginSchema = Yup.object().shape({
  email: Yup.string().required("Email is required").email("Invalid email"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g,
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one digit, and one special character."
    ),
});

export const loginForm = {
  email: "",
  password: "",
  rememberMe: false,
};
