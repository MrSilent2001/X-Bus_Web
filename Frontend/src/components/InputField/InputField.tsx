import React, {useState, forwardRef, useCallback} from "react";
import { UseFormRegisterReturn } from "react-hook-form";

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
    min?: number | string;
    max?: number | string;
    disabled?: boolean;
    register?: UseFormRegisterReturn; // React Hook Form support
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
            register,
            ...rest
        },
        ref
    ) => {
        const [isFocused, setIsFocused] = useState(false);

        const handleFocus = () => setIsFocused(true);

        // Combine register.ref and forwarded ref
        const setRefs = useCallback(
            (el: HTMLInputElement) => {
                if (register?.ref) register.ref(el);
                if (typeof ref === "function") ref(el);
                else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = el;
            },
            [ref, register]
        );

        return (
            <div className="relative flex flex-col items-start">
                {label && labelName && type !== "file" && (
                    <label
                        htmlFor={id}
                        className={`absolute left-3 transition-all duration-200 text-sm font-medium ${
                            isFocused || value
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
                        defaultValue={value} // Uses defaultValue for React Hook Form
                        placeholder={type !== "file" ? placeholder : undefined}
                        accept={type === "file" ? accept : undefined}
                        onFocus={handleFocus}
                        {...(register ? { ...register, onBlur: undefined, onChange: undefined } : {})} // Prevents duplicate props
                        ref={setRefs}
                        className={`block ${width} h-10 py-2 px-3 text-sm text-black border rounded-md border-gray-400 focus:outline-none focus:ring-gray-700 focus:border-carnation-300 ${
                            uppercase ? "uppercase" : ""
                        } ${disabled ? "bg-gray-200 cursor-not-allowed text-gray-500" : ""} ${className}`}
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
