import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import chartData from "@/data/data.json";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
        legend: {
            position: "top",
        },
        title: {
            display: true,
            text: "Monthly Revenue Data",
        },
    },
    scales: {
        x: {
            title: {
                display: true,
                text: "Months",
            },
        },
        y: {
            title: {
                display: true,
                text: "Revenue (Rs)",
            },
            beginAtZero: true,
        },
    },
};

const IncomeChart = () => {
    return (
        <Bar data={chartData.revenue} options={options} />
    );
};

export default IncomeChart;

/*
"use client";
import { useEffect, useState } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import Dropdown from "@/components/Dropdown/dropdown.tsx";

// Register necessary Chart.js elements
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface MonthlyTotal {
    year: number;
    month: number;
    totalPrice: number;
}

interface ChartData {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        borderColor: string;
        backgroundColor: string;
        fill?: boolean;
    }[];
}

// Sample Data
const sampleData: MonthlyTotal[] = [
    { year: 2023, month: 1, totalPrice: 10000 },
    { year: 2023, month: 2, totalPrice: 15000 },
    { year: 2023, month: 3, totalPrice: 20000 },
    { year: 2023, month: 4, totalPrice: 12000 },
    { year: 2023, month: 5, totalPrice: 18000 },
    { year: 2023, month: 6, totalPrice: 22000 },
    { year: 2023, month: 7, totalPrice: 25000 },
    { year: 2023, month: 8, totalPrice: 23000 },
    { year: 2023, month: 9, totalPrice: 21000 },
    { year: 2023, month: 10, totalPrice: 26000 },
    { year: 2023, month: 11, totalPrice: 24000 },
    { year: 2023, month: 12, totalPrice: 28000 },
    { year: 2024, month: 1, totalPrice: 11000 },
    { year: 2024, month: 2, totalPrice: 16000 },
    { year: 2024, month: 3, totalPrice: 19000 },
    { year: 2024, month: 4, totalPrice: 13000 },
    { year: 2024, month: 5, totalPrice: 17000 },
    { year: 2024, month: 6, totalPrice: 21000 },
    { year: 2024, month: 7, totalPrice: 26000 },
    { year: 2024, month: 8, totalPrice: 24000 },
    { year: 2024, month: 9, totalPrice: 22000 },
    { year: 2024, month: 10, totalPrice: 27000 },
    { year: 2024, month: 11, totalPrice: 25000 },
    { year: 2024, month: 12, totalPrice: 29000 },
];

// Simulated API Call
const getMonthlyTotals = async (): Promise<MonthlyTotal[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(sampleData);
        }, 500);
    });
};

const IncomeChart = () => {
    const [revenueChartData, setRevenueChartData] = useState<{ [year: string]: ChartData }>({});
    const [selectedYear, setSelectedYear] = useState<string>("2024");

    useEffect(() => {
        const fetchData = async () => {
            const data = await getMonthlyTotals();
            processChartData(data);
        };

        fetchData();
    }, []);

    // Process API Data into Chart.js Format
    const processChartData = (data: MonthlyTotal[]) => {
        const chartDataByYear: { [year: string]: ChartData } = {};

        data.forEach(({ year, month, totalPrice }) => {
            const yearString = year.toString();

            if (!chartDataByYear[yearString]) {
                chartDataByYear[yearString] = {
                    labels: Array.from({ length: 12 }, (_, i) =>
                        new Date(0, i).toLocaleString("default", { month: "short" })
                    ),
                    datasets: [
                        {
                            label: "Revenue",
                            data: Array(12).fill(0),
                            borderColor: "rgba(75, 192, 192, 1)",
                            backgroundColor: "rgba(75, 192, 192, 0.2)",
                            fill: true,
                        },
                    ],
                };
            }

            chartDataByYear[yearString].datasets[0].data[month - 1] = totalPrice;
        });

        setRevenueChartData(chartDataByYear);
    };

    // Dropdown Change Handler
    const handleYearChange = (value: string) => {
        console.log("Selected Year:", value);
        setSelectedYear(value);
    };

    // Chart.js Options
    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: "top",
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Month",
                    font: {
                        size: 14,
                    },
                },
            },
            y: {
                title: {
                    display: true,
                    text: "Revenue (Rs)",
                    font: {
                        size: 14,
                    },
                },
            },
        },
    };

    // Extract Years for Dropdown Options
    const yearOptions = Object.keys(revenueChartData).map((year) => ({
        label: year,
        value: year,
    }));

    return (
        <div>
            <div style={{ marginBottom: "1rem" }}>
                <Dropdown
                    width="150px"
                    placeholder="Select Year"
                    options={yearOptions}
                    value={selectedYear}
                    onChange={handleYearChange}
                />
            </div>
            {revenueChartData[selectedYear] ? (
                <Line data={revenueChartData[selectedYear]} options={options} />
            ) : (
                <p>Loading chart...</p>
            )}
        </div>
    );
};

export default IncomeChart;

* */