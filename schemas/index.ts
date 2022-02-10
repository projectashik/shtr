import { object, string } from "yup";

export const SignInSchema = object().shape({
  username: string().required("The username field is required"),
  password: string().required("The password field is required"),
});
