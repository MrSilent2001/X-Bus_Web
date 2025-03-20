import React, { useState, forwardRef } from "react";

interface InputFieldProps {
    id: string;
    type: string;
    value?: string | number;
    placeholder?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    accept?: string;
    icon?: React.ReactNode;
    width?: string;
    ariaLabel?: string;
    className?: string;
    label?: boolean;
    labelName?: string;
    uppercase?: boolean;
    min?: number;
    max?: number;
    disabled?: boolean;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
    (
        {
            id,
            type,
            value,
            placeholder,
            onChange,
            accept,
            className = "",
            icon,
            width = "w-full",
            ariaLabel,
            label = false,
            labelName,
            uppercase = false,
            min,
            max,
            disabled = false,
            ...rest
        },
        ref
    ) => {
        const [isFocused, setIsFocused] = useState(false);

        const handleFocus = () => setIsFocused(true);
        const handleBlur = () => setIsFocused(false);

        const hasValue = !!value;

        return (
            <div className="relative flex flex-col items-start">
                {/* Label for text inputs */}
                {label && labelName && type !== "file" && (
                    <label
                        htmlFor={id}
                        className={`absolute left-3 transition-all duration-200 text-sm font-medium ${
                            isFocused || hasValue
                                ? "-top-3 bg-white px-1 font-medium z-[1] text-carnation-500"
                                : "top-2 text-gray-400"
                        }`}
                    >
                        {labelName}
                    </label>
                )}

                <div className="relative flex items-center w-full">
                    <input
                        id={id}
                        type={type}
                        value={type !== "file" ? String(value) : undefined}
                        onChange={onChange}
                        placeholder={type !== "file" ? placeholder : undefined}
                        accept={type === "file" ? accept : undefined}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        ref={ref}
                        className={`block ${width} h-10 py-2 px-3 text-sm text-black border rounded-md border-gray-400 focus:outline-none focus:ring-gray-700 focus:border-carnation-300 ${
                            uppercase ? "uppercase" : ""
                        } ${className}`}
                        style={{ textTransform: uppercase ? "uppercase" : "none" }}
                        aria-label={ariaLabel || placeholder}
                        min={type === "number" ? min : undefined}
                        max={type === "number" ? max : undefined}
                        disabled={disabled}
                        {...rest}
                    />
                    {icon && type !== "file" && (
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            {icon}
                        </div>
                    )}
                </div>
            </div>
        );
    }
);

InputField.displayName = "InputField";

export default InputField;
