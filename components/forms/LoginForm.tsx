import { Button, Field } from "components/ui";
import { useFormik } from "formik";
import { useUser } from "hooks";
import { FiArrowRight } from "react-icons/fi";
import { SignInSchema } from "schemas";

const LoginForm = () => {
  const { login, error, loginLoading } = useUser();
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
    <div className="dark:bg-dark102 mx-auto mt-5 max-w-lg rounded-lg bg-white p-10 dark:border-gray-700 sm:border sm:shadow">
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
        <Button
          loading={loginLoading}
          rightIcon={<FiArrowRight />}
          type="submit"
          className="block w-full"
        >
          Proceed
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
