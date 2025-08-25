import { useState } from "react";
import Navbar from "@/components/TopNavbar/Navbar.tsx";
import Footer from "@/components/Footer/Footer.tsx";
import IncomeChart from "@/components/Dashboard/incomeChart.tsx";
import ExpenseChart from "@/components/Dashboard/expenseChart.tsx";
import Sidebar from "@/components/Dashboard/sidebar.tsx";
import ChartFilters from "@/components/Dashboard/chartFilters.tsx";

const Dashboard = () => {
    const [selectedIncomeBus, setSelectedIncomeBus] = useState<string>("all");
    const [selectedExpenseBus, setSelectedExpenseBus] = useState<string>("all");

    return (
        <>
            <Navbar />
            <div className="flex h-full p-6 bg-gradient-to-br from-red-50 to-white mt-16">
                <Sidebar />

                <div className="w-3/4 ml-6 mt-4">
                    {/* Income Section */}
                    <div className="grid grid-cols-2 gap-4">
                        <h2 className="text-xl font-bold">Income</h2>
                        <div className="flex justify-end space-x-2">
                            <ChartFilters selectedBus={selectedIncomeBus} setSelectedBus={setSelectedIncomeBus} />
                        </div>
                    </div>
                    <div className="h-90 bg-red-100 mt-6 rounded-lg p-4 flex justify-center items-center">
                        <IncomeChart selectedBus={selectedIncomeBus} />
                    </div>

                    {/* Expenses Section */}
                    <div className="grid grid-cols-2 gap-4 mt-6">
                        <h2 className="text-xl font-bold">Expenses</h2>
                        <div className="flex justify-end space-x-2">
                            <ChartFilters selectedBus={selectedExpenseBus} setSelectedBus={setSelectedExpenseBus} />
                        </div>
                    </div>
                    <div className="h-90 bg-red-100 my-6 rounded-lg p-4 flex justify-center items-center">
                        <ExpenseChart selectedBus={selectedExpenseBus} />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Dashboard;
