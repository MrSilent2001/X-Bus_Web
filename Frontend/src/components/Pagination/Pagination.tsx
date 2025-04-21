"use client";

import React, { useState, useEffect } from "react";
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    DoubleArrowLeftIcon,
    DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import CustomButton from "@/components/Button/CustomButton.tsx";
import { cn } from "@/lib/utils";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
                                                   currentPage = 1,
                                                   totalPages,
                                                   onPageChange,
                                               }) => {
    const [visibleRange, setVisibleRange] = useState<number[]>([1, Math.min(5, totalPages)]);

    useEffect(() => {
        if (totalPages <= 5) {
            setVisibleRange([1, totalPages]);
        } else if (currentPage <= 3) {
            setVisibleRange([1, 5]);
        } else if (currentPage >= totalPages - 2) {
            setVisibleRange([totalPages - 4, totalPages]);
        } else {
            setVisibleRange([currentPage - 2, currentPage + 2]);
        }
    }, [currentPage, totalPages]);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            console.log(`Changing page to: ${newPage}`);
            onPageChange(newPage);
        }
    };

    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1).slice(
        visibleRange[0] - 1,
        visibleRange[1]
    );

    return (
        <div className="flex justify-center my-4">
            <div className="flex items-center space-x-2">
                {/* First Page */}
                <CustomButton
                    variant="outline"
                    buttonLabel=""
                    buttonClassName="px-2 py-1 bg-gray-100 border-stone-300 cursor-pointer"
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === 1}
                    icon={<DoubleArrowLeftIcon className="w-4 h-4 text-red-800" />}
                />

                {/* Previous Page */}
                <CustomButton
                    variant="outline"
                    buttonLabel=""
                    buttonClassName="px-2 py-1 bg-gray-100 border-stone-300 cursor-pointer"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    icon={<ChevronLeftIcon className="w-4 h-4 text-red-800" />}
                />

                {/* Page Numbers */}
                {pageNumbers.map((pageNumber) => (
                    <CustomButton
                        key={pageNumber}
                        variant="outline"
                        buttonLabel={pageNumber.toString()}
                        buttonClassName={cn(
                            "rounded-lg py-1 px-3 transition-all duration-300 cursor-pointer",
                            pageNumber === currentPage
                                ? "bg-carnation-550 text-red-800 scale-105 border-stone-300"
                                : "bg-white text-red-300 hover:bg-neutral-200 border-stone-300"
                        )}
                        onClick={() => handlePageChange(pageNumber)}
                    />
                ))}

                {/* Next Page */}
                <CustomButton
                    variant="outline"
                    buttonLabel=""
                    buttonClassName="px-2 py-1 bg-gray-100 border-stone-300 cursor-pointer"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    icon={<ChevronRightIcon className="w-4 h-4 text-red-800" />}
                />

                {/* Last Page */}
                <CustomButton
                    variant="outline"
                    buttonLabel=""
                    buttonClassName="px-2 py-1 bg-gray-100 border-stone-300 cursor-pointer"
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages}
                    icon={<DoubleArrowRightIcon className="w-4 h-4 text-red-800" />}
                />
            </div>
        </div>
    );
};

export default Pagination;
