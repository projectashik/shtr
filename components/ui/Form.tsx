import { FormikProps } from "formik";

interface FormProps extends React.HTMLAttributes<HTMLFormElement> {
  formik: FormikProps<any>;
}
const Form = ({ formik, children, ...props }: FormProps) => {
  return (
    <form onSubmit={formik.handleSubmit} {...props}>
      {children}
      <button type="submit" className="hidden"></button>
    </form>
  );
};

export default Form;
