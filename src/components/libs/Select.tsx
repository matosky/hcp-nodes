import React from "react";
import ReactSelect from "react-select";
import type { Props as ReactSelectProps } from "react-select";
import { cn } from "@/utils/cn";
import { Label } from "./Label";

export interface Option {
  value: string;
  label: string;
}

export interface SelectProps extends ReactSelectProps<Option, false> {
  label?: string;
  labelClassName?: string;
  containerClassName?: string;
}

export const Select = React.forwardRef<any, SelectProps>(
  ({ className, ...props }, ref) => {
    // Custom styles using Tailwind colors and sizing
    const customStyles = {
      control: (provided: any, state: any) => ({
        ...provided,
        backgroundColor: "transparent",
        border: "1px solid #33383F",
        borderRadius: "0.375rem", // rounded-md
        minHeight: "38px",
        boxShadow: state.isFocused ? "0 0 0 1px #2C73DB" : provided.boxShadow,
        "&:hover": {
          borderColor: "#2C73DB",
        },
      }),
      menu: (provided: any) => ({
        ...provided,
        backgroundColor: "#1E293B", // slate-800
        borderRadius: "0.375rem",
        border: "1px solid #33383F",
      }),
      option: (provided: any, state: any) => ({
        ...provided,
        backgroundColor: state.isFocused ? "#2C73DB" : "transparent",
        color: "#fff",
        "&:hover": {
          backgroundColor: "#2C73DB",
        },
      }),
      singleValue: (provided: any) => ({
        ...provided,
        color: "#fff",
      }),
      placeholder: (provided: any) => ({
        ...provided,
        color: "#6F767E",
      }),
      input: (provided: any) => ({
        ...provided,
        color: "#fff",
      }),
    };

    return (
      <div className={`w-full ${props.containerClassName}`}>
        {props.label && (
          <Label className={props.labelClassName}>{props.label}</Label>
        )}
        <ReactSelect
          ref={ref}
          styles={customStyles}
          className={cn("react-select-container", className)}
          classNamePrefix="react-select"
          {...props}
        />
      </div>
    );
  }
);

Select.displayName = "Select";
