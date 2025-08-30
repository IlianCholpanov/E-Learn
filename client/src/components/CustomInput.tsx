import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const CustomInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`border rounded p-2 w-full ${className}`}
        {...props}
      />
    );
  }
);

// Input.displayName = "Input";
