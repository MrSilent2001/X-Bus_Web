import { useState, useEffect } from "react";
import Navbar from "@/components/TopNavbar/Navbar.tsx";
import Footer from "@/components/Footer/Footer.tsx";
import IncomeChart from "@/components/Dashboard/incomeChart.tsx";
import ExpenseChart from "@/components/Dashboard/expenseChart.tsx";
import Sidebar from "@/components/Dashboard/sidebar.tsx";
import ChartFilters from "@/components/Dashboard/chartFilters.tsx";
import { getAllBuses } from "@/api/busAPI.ts";
import { getTotalIncome, getTotalExpenses } from "@/api/paymentAPI.ts";
import { Bus } from "@/types/bus.ts";

const Dashboard = () => {
    const [selectedIncomeBus, setSelectedIncomeBus] = useState<string>("all");
    const [selectedExpenseBus, setSelectedExpenseBus] = useState<string>("all");
    const [busData, setBusData] = useState<Bus[]>([]);
    const [totalRevenue, setTotalRevenue] = useState<number>(0);
    const [monthlyRevenue, setMonthlyRevenue] = useState<number>(0);
    const [totalTrips, setTotalTrips] = useState<number>(0);
    const [customerSatisfaction, setCustomerSatisfaction] = useState<number>(4.8);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                
                // Fetch bus data
                const buses = await getAllBuses();
                setBusData(buses);
                
                // Fetch total revenue
                const incomeData = await getTotalIncome();
                if (incomeData && incomeData.annualIncome) {
                    const currentYear = new Date().getFullYear().toString();
                    const currentMonth = new Date().toLocaleString('default', { month: 'short' });
                    
                    // Calculate total revenue for current year
                    const yearData = incomeData.annualIncome[currentYear] || {};
                    const totalYearRevenue = Object.values(yearData).reduce((sum: number, amount: any) => sum + (amount || 0), 0);
                    setTotalRevenue(totalYearRevenue);
                    
                    // Get current month revenue
                    setMonthlyRevenue(yearData[currentMonth] || 0);
                }
                
                // Calculate total trips (simplified - could be enhanced with actual trip data)
                setTotalTrips(buses.length * 52); // Assuming each bus makes 52 trips per year
                
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const formatCurrency = (amount: number) => {
        if (amount >= 1000000) {
            return `Rs. ${(amount / 1000000).toFixed(1)}M`;
        } else if (amount >= 1000) {
            return `Rs. ${(amount / 1000).toFixed(1)}K`;
        }
        return `Rs. ${amount.toLocaleString()}`;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100">
                <Navbar />
                <div className="flex items-center justify-center h-screen mt-16">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading dashboard data...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100">
            <Navbar />
            
            <div className="flex p-6 mt-16">
                {/* Sidebar */}
                <div className="w-1/4 pr-6">
                    <Sidebar busData={busData} />
                </div>

                {/* Main Content */}
                <div className="w-3/4 space-y-6">
                    {/* Dashboard Header */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                                <p className="text-gray-600 mt-1">Monitor your bus fleet performance and financial metrics</p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="text-right">
                                    <p className="text-sm text-gray-500">Total Revenue</p>
                                    <p className="text-2xl font-bold text-red-700">{formatCurrency(totalRevenue)}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-gray-500">Active Buses</p>
                                    <p className="text-2xl font-bold text-red-700">{busData.length}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Charts Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Income Section */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">Income Analytics</h2>
                                    <p className="text-sm text-gray-600">Revenue performance</p>
                                </div>
                                <ChartFilters selectedBus={selectedIncomeBus} setSelectedBus={setSelectedIncomeBus} />
                            </div>
                            
                            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4 border border-red-200 h-64">
                                <IncomeChart selectedBus={selectedIncomeBus} />
                            </div>
                        </div>

                        {/* Expenses Section */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">Expense Analytics</h2>
                                    <p className="text-sm text-gray-600">Operational costs</p>
                                </div>
                                <ChartFilters selectedBus={selectedExpenseBus} setSelectedBus={setSelectedExpenseBus} />
                            </div>
                            
                            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4 border border-red-200 h-64">
                                <ExpenseChart selectedBus={selectedExpenseBus} />
                            </div>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">Monthly Revenue</p>
                                    <p className="text-2xl font-bold text-red-700">{formatCurrency(monthlyRevenue)}</p>
                                    <p className="text-sm text-green-600 mt-1">↑ 12% from last month</p>
                                </div>
                                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                                    <span className="text-red-600 text-xl">💰</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">Total Trips</p>
                                    <p className="text-2xl font-bold text-red-700">{totalTrips.toLocaleString()}</p>
                                    <p className="text-sm text-green-600 mt-1">↑ 8% from last month</p>
                                </div>
                                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                                    <span className="text-red-600 text-xl">🚌</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">Customer Satisfaction</p>
                                    <p className="text-2xl font-bold text-red-700">{customerSatisfaction}/5</p>
                                    <p className="text-sm text-green-600 mt-1">↑ 0.2 from last month</p>
                                </div>
                                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                                    <span className="text-red-600 text-xl">⭐</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <Footer />
        </div>
    );
};

export default Dashboard;
