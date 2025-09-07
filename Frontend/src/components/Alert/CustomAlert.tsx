
import React, { useEffect } from "react";

interface AlertAction {
    label: string;
    onClick?: () => void;
    variant?: "primary" | "secondary";
}

interface CustomAlertProps {
    isOpen: boolean;
    title?: string;
    message: string;
    onClose: () => void;
    actions?: AlertAction[];
    autoCloseMs?: number;
    variant?: "success" | "error" | "warning" | "info";
}

const variantStyles: Record<NonNullable<CustomAlertProps["variant"]>, { iconBg: string; title: string; message: string; ring: string; icon: string; button: string }> = {
    success: { iconBg: "bg-green-100 text-green-700", title: "text-green-800", message: "text-green-700", ring: "ring-green-200", icon: "✓", button: "bg-green-600 hover:bg-green-700 text-white" },
    error: { iconBg: "bg-red-100 text-red-700", title: "text-red-800", message: "text-red-700", ring: "ring-red-200", icon: "✕", button: "bg-red-600 hover:bg-red-700 text-white" },
    warning: { iconBg: "bg-yellow-100 text-yellow-700", title: "text-yellow-800", message: "text-yellow-700", ring: "ring-yellow-200", icon: "⚠", button: "bg-yellow-600 hover:bg-yellow-700 text-white" },
    info: { iconBg: "bg-blue-100 text-blue-700", title: "text-blue-800", message: "text-blue-700", ring: "ring-blue-200", icon: "ℹ", button: "bg-blue-600 hover:bg-blue-700 text-white" },
};

const CustomAlert: React.FC<CustomAlertProps> = ({
                                                     isOpen,
                                                     title,
                                                     message,
                                                     onClose,
                                                     actions,
                                                     autoCloseMs,
                                                     variant = "info",
                                                 }) => {
    useEffect(() => {
        if (!isOpen || !autoCloseMs) return;
        const id = setTimeout(() => onClose(), autoCloseMs);
        return () => clearTimeout(id);
    }, [isOpen, autoCloseMs, onClose]);

    useEffect(() => {
        const onEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) onClose();
        };
        window.addEventListener("keydown", onEsc);
        return () => window.removeEventListener("keydown", onEsc);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const style = variantStyles[variant];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/30" onClick={onClose} />
            <div
                role="alertdialog"
                aria-modal="true"
                className={`relative mx-4 w-full max-w-md rounded-xl bg-white p-6 shadow-xl ring-1 ${style.ring}`}
            >
                <div className="flex items-start gap-4">
                    <div className={`h-10 w-10 shrink-0 rounded-full flex items-center justify-center ${style.iconBg}`}>
                        <span className="text-xl">{style.icon}</span>
                    </div>
                    <div className="flex-1">
                        {title && <h3 className={`text-lg font-semibold ${style.title}`}>{title}</h3>}
                        <p className={`mt-1 text-sm ${style.message}`}>{message}</p>
                        <div className="mt-5 flex justify-end gap-2">
                            {(actions && actions.length > 0 ? actions : [{ label: "OK", variant: "primary", onClick: onClose }]).map((action, idx) => (
                                <button
                                    key={idx}
                                    onClick={action.onClick || onClose}
                                    className={`${action.variant === "secondary"
                                        ? "bg-gray-100 hover:bg-gray-200 text-gray-800"
                                        : style.button
                                    } px-4 py-2 rounded-md text-sm font-medium transition-colors`}
                                >
                                    {action.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomAlert; 