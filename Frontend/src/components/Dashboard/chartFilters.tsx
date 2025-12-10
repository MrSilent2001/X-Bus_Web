"use client";

import { useEffect, useState } from "react";
import Dropdown from "@/components/Dropdown/dropdown.tsx";
import { getAllBuses } from "@/api/busAPI.ts";
import { Bus } from "@/types/bus.ts";

interface ChartFiltersProps {
    selectedBus: string;
    setSelectedBus: (bus: string) => void;
}

const ChartFilters = ({ selectedBus, setSelectedBus }: ChartFiltersProps) => {
    const [busOptions, setBusOptions] = useState<{ label: string; value: string }[]>([]);

    useEffect(() => {
        const fetchBuses = async () => {
            const buses: Bus[] = await getAllBuses();
            const options = buses.map((bus) => ({
                label: bus.regNo,
                value: bus.id?.toString() ?? bus.regNo,
            }));
            setBusOptions([{ label: "All", value: "all" }, ...options]);
        };
        fetchBuses();
    }, []);

    return (
        <Dropdown
            options={busOptions}
            width="180px"
            placeholder="Bus Reg. No."
            value={selectedBus}
            onChange={(value) => setSelectedBus(value)}
        />
    );
};

export default ChartFilters;
