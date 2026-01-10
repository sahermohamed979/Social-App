import { forwardRef } from "react";

const FormField = forwardRef(function FormField(
  {
    type,
    id,
    name,
    placeholder,
    value,

    className,
    onChange,
    onBlur,
    ...rest
  },
  ref
) {
  return (
    <>
      <input
        type={type}
        className={className}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
        {...rest}
      />
    </>
  );
});

export default FormField;
