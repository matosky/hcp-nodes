import React from "react";

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelClassName?: string;
  containerClassName?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, labelClassName, containerClassName, className, ...props }, ref) => {
    return (
      <div className={`flex items-center ${containerClassName || ""}`}>
        <input
          type="checkbox"
          ref={ref}
          {...props}
          className={`form-checkbox text-blue-600 border-gray-300 rounded cursor-pointer ${
            className || ""
          }`}
        />
        {label && (
          <span
            className={`ml-2 text-[#6F767E] font-light text-sm ${
              labelClassName || ""
            }`}
          >
            {label}
          </span>
        )}
      </div>
    );
  }
);
