import { useEffect, useState } from "react";
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
import {getTotalExpenses} from "@/api/paymentAPI.ts";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
        legend: {
            position: "top",
        },
        title: {
            display: true,
            text: "Monthly Expenses",
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
                text: "Expenses (Rs)",
            },
            beginAtZero: true,
        },
    },
};

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const ExpenseChart = ({ selectedBus }: { selectedBus: string }) => {
    console.log(selectedBus)
    const [chartData, setChartData] = useState({
        labels: monthNames,
        datasets: [
            {
                label: "Expenses",
                data: Array(12).fill(0),
                backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
        ],
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchExpenseData = async () => {
            setLoading(true);
            const busId = selectedBus === "all" ? undefined : Number(selectedBus);
            console.log(busId)
            const data = await getTotalExpenses(busId);

            if (data && data.annualExpenses) {
                const currentYear = new Date().getFullYear().toString();
                const monthlyData = data.annualExpenses[currentYear] || {};

                // Map monthly data from annualExpense object to an array ordered by months
                const monthlyAmounts = monthNames.map((month) => monthlyData[month] ?? 0);

                setChartData({
                    labels: monthNames,
                    datasets: [
                        {
                            label: `Monthly Expense (${currentYear})`,
                            data: monthlyAmounts,
                            backgroundColor: "rgba(255, 99, 132, 0.5)",
                        },
                    ],
                });
            }
            setLoading(false);
        };

        fetchExpenseData();
    }, [selectedBus]);

    if (loading) return <div>Loading chart data...</div>;

    return <Bar data={chartData} options={options} />;
};

export default ExpenseChart;
