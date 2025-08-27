"use client";
import React, { useState, ReactNode, MouseEventHandler  } from "react";
import { Button } from "@/components/ui/button";

interface CustomButtonProps {
    type?: "button" | "submit" | "reset";
    variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "success" | "warning";
    size?: "sm" | "md" | "lg" | "xl";
    name?: string;
    value?: string;
    disabled?: boolean;
    buttonLabel?: string;
    buttonClassName?: string;
    modalContent?: ReactNode;
    modalClassName?: string;
    onClick?: MouseEventHandler<HTMLButtonElement> | (() => void);
    showIcon?: boolean;
    icon?: ReactNode;
    iconPosition?: "left" | "right";
    loading?: boolean;
    fullWidth?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
                                                       type = "button",
                                                       variant = "primary",
                                                       size = "md",
                                                       name = "",
                                                       value = "",
                                                       disabled = false,
                                                       buttonLabel = "",
                                                       buttonClassName = "",
                                                       modalContent,
                                                       modalClassName = "",
                                                       onClick,
                                                       showIcon = false,
                                                       icon = "",
                                                       iconPosition = "left",
                                                       loading = false,
                                                       fullWidth = false,
                                                   }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (onClick) {
            onClick(e);
        } else {
            setIsModalOpen(true);
        }
    };

    const theme = {
        primary: "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg hover:shadow-xl",
        secondary: "bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200",
        outline: "bg-transparent hover:bg-red-50 border border-red-600 text-red-600 hover:text-red-700",
        ghost: "bg-transparent hover:bg-gray-100 text-gray-600 hover:text-gray-800",
        danger: "bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl",
        success: "bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl",
        warning: "bg-yellow-600 hover:bg-yellow-700 text-white shadow-lg hover:shadow-xl",
    };

    const sizeClasses = {
        sm: "px-3 py-2 text-sm rounded-lg",
        md: "px-4 py-2 text-base rounded-lg",
        lg: "px-6 py-3 text-lg rounded-xl",
        xl: "px-8 py-4 text-xl rounded-xl",
    };

    const widthClass = fullWidth ? "w-full" : "";

    return (
        <>
            <Button
                className={`flex items-center justify-center gap-2 font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
                    ${theme[variant]} ${sizeClasses[size]} ${widthClass} ${buttonClassName}`}
                type={type}
                name={name}
                value={value}
                disabled={disabled || loading}
                onClick={handleButtonClick}
            >
                {loading ? (
                    <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                        <span>Loading...</span>
                    </>
                ) : (
                    <>
                        {showIcon && iconPosition === "left" && <span className="text-base">{icon}</span>}
                        <span>{buttonLabel}</span>
                        {showIcon && iconPosition === "right" && <span className="text-base">{icon}</span>}
                    </>
                )}
            </Button>
            {isModalOpen && modalContent && (
                <div className={modalClassName}>
                    {React.cloneElement(modalContent as React.ReactElement, {
                        onClose: () => setIsModalOpen(false),
                    })}
                </div>
            )}
        </>
    );
};

export default CustomButton;