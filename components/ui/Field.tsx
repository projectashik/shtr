import { FormikProps } from "formik";
import { ErrorMessage, Input, Label } from ".";

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  formikHandler: FormikProps<any>;
  label?: React.ReactNode;
  containerClassName?: string;
}
const Field = ({
  formikHandler,
  label,
  containerClassName,
  ...props
}: FieldProps) => {
  return (
    <div className={containerClassName}>
      {label && <Label htmlFor={props.id}>{label}</Label>}
      <Input formikHandler={formikHandler} {...props} />
      <ErrorMessage formikHandler={formikHandler} name={props.id as string} />
    </div>
  );
};

export default Field;
{
}
