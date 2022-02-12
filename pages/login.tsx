import Layout from "components/layouts/Layout";
import Input from "components/ui/Input";
import Label from "components/ui/Label";
import Field from "components/ui/Field";
import { useFormik } from "formik";
import { useTheme } from "next-themes";
import Button from "components/ui/Button";
import { SignInSchema } from "schemas";
import axios from "axios";
import { toast } from "lib/toast";
import { useUser } from "hooks";
import error from "next/error";
import { withRedirectIfAuthenticated } from "utils";

const LoginPage = () => {
  const { login, error } = useUser();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      login({
        username: values.username,
        password: values.password,
      });
      if (error) {
        if (error.type === "login") {
          formik.setFieldError("username", error.message);
        }
      }
    },
    validationSchema: SignInSchema,
  });

  return (
    <Layout>
      <div className="max-w-lg mt-5 mx-auto sm:border sm:shadow dark:border-gray-700 rounded-lg p-10">
        <h1 className="font-head text-3xl font-bold">Sign In</h1>
        <form className="mt-5" onSubmit={formik.handleSubmit}>
          <Field
            type="text"
            id="username"
            placeholder="Username"
            formikHandler={formik}
            label="Username"
            containerClassName="mb-5"
          />
          <Field
            type="password"
            id="password"
            placeholder="Password"
            formikHandler={formik}
            label="Password"
            containerClassName="mb-5"
          />
          <Button type="submit" className="block w-full">
            Proceed
          </Button>
        </form>
      </div>
    </Layout>
  );
};

export default withRedirectIfAuthenticated(LoginPage);
