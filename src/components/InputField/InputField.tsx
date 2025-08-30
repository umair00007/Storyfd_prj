import React from "react";
import { cn } from "../../lib/cn";

type Variant = "filled" | "outlined" | "ghost";
type Size = "sm" | "md" | "lg";

export interface InputFieldProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "size" | "onChange" | "value"
  > {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  clearable?: boolean;
  passwordToggle?: boolean;
  id?: string;
}

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      value,
      onChange,
      label,
      placeholder,
      helperText,
      errorMessage,
      disabled,
      invalid,
      variant = "outlined",
      size = "md",
      loading = false,
      clearable = false,
      passwordToggle = false,
      type = "text",
      id,
      className,
      ...rest
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const inputId = id ?? React.useId();
    const describedByIds: string[] = [];

    const sizeStyles =
      size === "sm"
        ? "h-9 text-sm px-3"
        : size === "lg"
        ? "h-12 text-base px-4"
        : "h-10 text-sm px-3";

    const variantStyles =
      variant === "filled"
        ? "bg-gray-100 dark:bg-gray-900 border-transparent focus:bg-white dark:focus:bg-gray-800"
        : variant === "ghost"
        ? "bg-transparent border-transparent focus:border-gray-300 dark:focus:border-gray-700"
        : "bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700";

    const stateStyles = cn(
      invalid && "border-red-500 focus:ring-2 focus:ring-red-200",
      disabled && "opacity-60 cursor-not-allowed",
      loading && "cursor-wait"
    );

    const base =
      "w-full rounded-md border outline-none transition placeholder:text-gray-400 focus:border-black dark:focus:border-white";

    const inputType =
      passwordToggle && type === "password"
        ? showPassword
          ? "text"
          : "password"
        : type;

    const helperId = helperText ? `${inputId}-help` : undefined;
    const errorId = invalid && errorMessage ? `${inputId}-err` : undefined;
    if (helperId) describedByIds.push(helperId);
    if (errorId) describedByIds.push(errorId);

    return (
      <div className={cn("w-full", className)}>
        {label && (
          <label
            htmlFor={inputId}
            className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {label}
          </label>
        )}

        <div className="relative">
          <input
            id={inputId}
            ref={ref}
            value={value}
            onChange={onChange}
            type={inputType}
            placeholder={placeholder}
            disabled={disabled}
            aria-invalid={invalid || undefined}
            aria-describedby={describedByIds.join(" ") || undefined}
            className={cn(
              base,
              sizeStyles,
              variantStyles,
              stateStyles,
              "pr-10"
            )}
            {...rest}
          />

          {/* Right-side controls */}
          <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center gap-1">
            {loading && (
              <span
                aria-hidden
                className="pointer-events-none inline-block animate-spin h-4 w-4 border-2 border-gray-300 border-t-transparent rounded-full"
              />
            )}
          </div>

          {/* Clickable controls (clear/password) overlayed but interactive */}
          <div className="absolute inset-y-0 right-2 flex items-center gap-1">
            {clearable && value && !disabled && (
              <button
                type="button"
                aria-label="Clear input"
                onClick={(e) => {
                  // Fire a synthetic event with empty value if onChange provided
                  if (onChange) {
                    const target = e.target as HTMLButtonElement;
                    const event = {
                      ...e,
                      target: { value: "" },
                    } as unknown as React.ChangeEvent<HTMLInputElement>;
                    onChange(event);
                  }
                }}
                className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                ✕
              </button>
            )}
            {passwordToggle && type === "password" && (
              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword((s) => !s)}
                className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            )}
          </div>
        </div>

        {helperText && (
          <p id={helperId} className="mt-1 text-xs text-gray-500">
            {helperText}
          </p>
        )}
        {invalid && errorMessage && (
          <p id={errorId} className="mt-1 text-xs text-red-600">
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

InputField.displayName = "InputField";
