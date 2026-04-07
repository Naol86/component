import { type InputHTMLAttributes, type JSX } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  helperText?: string;
  wrapperClassName?: string;
};

export function InputField({
  label,
  helperText,
  id,
  wrapperClassName,
  className,
  ...props
}: InputProps): JSX.Element {
  const fallbackId = label.toLowerCase().replace(/\s+/g, "-");
  const inputId = id ?? fallbackId;

  return (
    <div className={wrapperClassName}>
      <label htmlFor={inputId}>{label}</label>
      <input id={inputId} className={className} {...props} />
      {helperText ? <small>{helperText}</small> : null}
    </div>
  );
}
