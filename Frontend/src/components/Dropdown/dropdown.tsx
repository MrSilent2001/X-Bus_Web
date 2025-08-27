'use client';
import React, { useState, useRef, useEffect } from 'react';
import { FaChevronDown, FaSearch, FaCheck } from 'react-icons/fa';

interface DropdownOption {
    label: string;
    value: string;
    icon?: React.ReactNode;
    description?: string;
}

interface DropdownProps {
    options: DropdownOption[];
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
    width?: string;
    searchable?: boolean;
    disabled?: boolean;
    error?: string;
    label?: string;
    required?: boolean;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'outline' | 'filled';
}

const Dropdown: React.FC<DropdownProps> = ({ 
    options, 
    placeholder = "Select an option", 
    value, 
    onChange, 
    width,
    searchable = false,
    disabled = false,
    error,
    label,
    required = false,
    size = 'md',
    variant = 'default'
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);

    const sizeClasses = {
        sm: 'py-2 px-3 text-sm',
        md: 'py-3 px-4 text-base',
        lg: 'py-4 px-5 text-lg'
    };

    const variantClasses = {
        default: 'bg-white border border-gray-300 hover:border-red-500 focus:border-red-500',
        outline: 'bg-transparent border-2 border-gray-300 hover:border-red-500 focus:border-red-500',
        filled: 'bg-gray-50 border border-gray-300 hover:border-red-500 focus:border-red-500'
    };

    const selectedOption = options.find(option => option.value === value);

    const filteredOptions = searchable 
        ? options.filter(option => 
            option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
            option.description?.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : options;

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setSearchTerm('');
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (selectedValue: string) => {
        if (onChange) {
            onChange(selectedValue);
        }
        setIsOpen(false);
        setSearchTerm('');
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            setIsOpen(!isOpen);
        }
        if (event.key === 'Escape') {
            setIsOpen(false);
            setSearchTerm('');
        }
    };

    return (
        <div className="relative" style={{ width }} ref={dropdownRef}>
            {/* Label */}
            {label && (
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}

            {/* Dropdown Trigger */}
            <div
                className={`
                    relative cursor-pointer rounded-xl transition-all duration-200
                    ${sizeClasses[size]}
                    ${variantClasses[variant]}
                    ${disabled ? 'opacity-50 cursor-not-allowed bg-gray-100' : ''}
                    ${error ? 'border-red-500' : ''}
                    ${isOpen ? 'ring-2 ring-red-200 border-red-500' : ''}
                `}
                onClick={() => !disabled && setIsOpen(!isOpen)}
                onKeyDown={handleKeyDown}
                tabIndex={disabled ? -1 : 0}
                role="combobox"
                aria-expanded={isOpen}
                aria-haspopup="listbox"
                aria-label={label || placeholder}
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 min-w-0 flex-1">
                        {selectedOption?.icon && (
                            <span className="text-gray-500">{selectedOption.icon}</span>
                        )}
                        <div className="min-w-0 flex-1">
                            <span className={`block truncate ${selectedOption ? 'text-gray-900' : 'text-gray-500'}`}>
                                {selectedOption ? selectedOption.label : placeholder}
                            </span>
                            {selectedOption?.description && (
                                <span className="block text-xs text-gray-500 truncate">
                                    {selectedOption.description}
                                </span>
                            )}
                        </div>
                    </div>
                    <FaChevronDown 
                        className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
                    />
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                    <span className="mr-1">⚠</span>
                    {error}
                </p>
            )}

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl max-h-60 overflow-hidden">
                    {/* Search Input */}
                    {searchable && (
                        <div className="p-3 border-b border-gray-100">
                            <div className="relative">
                                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                                <input
                                    type="text"
                                    placeholder="Search options..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                                    autoFocus
                                />
                            </div>
                        </div>
                    )}

                    {/* Options List */}
                    <div className="max-h-48 overflow-y-auto">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option) => (
                                <div
                                    key={option.value}
                                    className={`
                                        flex items-center space-x-3 px-4 py-3 cursor-pointer transition-colors duration-150
                                        ${option.value === value 
                                            ? 'bg-red-50 text-red-700 border-r-2 border-red-500' 
                                            : 'hover:bg-gray-50 text-gray-700'
                                        }
                                    `}
                                    onClick={() => handleSelect(option.value)}
                                >
                                    {option.icon && (
                                        <span className="text-gray-500">{option.icon}</span>
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <span className="block truncate font-medium">
                                                {option.label}
                                            </span>
                                            {option.value === value && (
                                                <FaCheck className="text-red-600 text-sm ml-2 flex-shrink-0" />
                                            )}
                                        </div>
                                        {option.description && (
                                            <span className="block text-xs text-gray-500 truncate mt-1">
                                                {option.description}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="px-4 py-3 text-sm text-gray-500 text-center">
                                {searchable && searchTerm ? 'No options found' : 'No options available'}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dropdown;