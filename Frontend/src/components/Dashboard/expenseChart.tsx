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

const ExpenseChart = () => {
    return (
        <Bar data={chartData.expenses} options={options} />
    );
};

export default ExpenseChart;

