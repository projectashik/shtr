import { object, string } from "yup";

export const SignInSchema = object().shape({
  username: string().required("The username field is required"),
  password: string().required("The password field is required"),
});

export const SetPasswordSchema = object().shape({
  password: string()
    .min(8, "Password must be at least 8 characters long")
    .required("The password field is required"),
  confirmPassword: string().test(
    "passwords-match",
    "Passwords must match",
    function (value) {
      return this.parent.password === value;
    }
  ),
});

export const UpdateLinkSchema = object().shape({
  url: string().url().required("The url field is required"),
  slug: string().required("The slug field is required"),
});

export const CreateUserSchema = object().shape({
  username: string().required("The username field is required"),
  password: string().required("The password field is required"),
});
