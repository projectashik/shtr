import { object, string } from "yup";

export const SignInSchema = object().shape({
  username: string().required("error.usernameRequired"),
  password: string().required("error.passwordRequired"),
});

export const ShortenUrlSchema = object().shape({
  // yup validation to check wehther the url is valid
  url: string().url("error.urlInvalid").required("error.urlRequired"),
});

export const SetPasswordSchema = object().shape({
  password: string()
    .min(8, "error.passwordMinLength")
    .required("error.passwordRequired"),
  confirmPassword: string().test(
    "passwords-match",
    "error.passwordMustMatchConfirmation",
    function (value) {
      return this.parent.password === value;
    }
  ),
});

export const UpdateLinkSchema = object().shape({
  url: string().url().required("error.urlRequired"),
  slug: string().required("error.slugRequired"),
});

export const CreateUserSchema = object().shape({
  username: string().required("error.usernameRequired"),
  password: string().required("error.passwordRequired"),
});
