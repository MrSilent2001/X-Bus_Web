import { useState, useEffect } from "react";
import Navbar from "@/components/TopNavbar/Navbar.tsx";
import Footer from "@/components/Footer/Footer.tsx";
import CustomButton from "@/components/Button/CustomButton.tsx";
import CustomAlert from "@/components/Alert/CustomAlert.tsx";
import InputField from "@/components/InputField/InputField.tsx";
import { BusOperator } from "@/types/user";
import { Bus } from "@/types/bus";
import { getAllOperators, createOperator, assignOperatorToBus, unassignOperatorFromBus, deleteOperator } from "@/api/operatorAPI";
import { getAllBuses } from "@/api/busAPI";
import { getUserByEmail } from "@/api/userAPI";
import { useAuth } from "@/context/authContext.tsx";

const BusOperators = () => {
    const [activeTab, setActiveTab] = useState<'operators' | 'add-operator'>('operators');
    const [operators, setOperators] = useState<BusOperator[]>([]);
    const [buses, setBuses] = useState<Bus[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertVariant, setAlertVariant] = useState<"success" | "error" | "warning" | "info">("info");
    const [, setUserPermission] = useState<string>("");

    const { user } = useAuth();

    const [operatorForm, setOperatorForm] = useState({
        name: "",
        email: "",
        contactNo: "",
        nic: "",
        licenseNo: "",
        experience: 0,
        selectedBusRegNo: ""
    });

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (user?.email) checkUserPermission();
    }, [user?.email]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [operatorsData, busesData] = await Promise.all([
                getAllOperators(),
                getAllBuses()
            ]);
            setOperators(operatorsData);
            setBuses(busesData);
        } catch (error) {
            console.error("Error fetching data:", error);
            showAlertMessage("Failed to fetch data", "error");
        } finally {
            setLoading(false);
        }
    };

    const checkUserPermission = async () => {
        try {
            const userData = await getUserByEmail(user!.email);
            if (userData?.data) {
                setUserPermission(userData.data.regPermStatus || "");
            }
        } catch (error) {
            console.error("Error checking user permission:", error);
        }
    };

    const showAlertMessage = (message: string, variant: "success" | "error" | "warning" | "info" = "info") => {
        setAlertMessage(message);
        setAlertVariant(variant);
        setShowAlert(true);
    };

    const handleAddOperatorToBus = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!operatorForm.name.trim()) return showAlertMessage("Please enter operator name", "warning");
        if (!operatorForm.email.trim()) return showAlertMessage("Please enter operator email", "warning");
        if (!operatorForm.contactNo.trim()) return showAlertMessage("Please enter contact number", "warning");
        if (!operatorForm.nic.trim()) return showAlertMessage("Please enter NIC", "warning");
        if (!operatorForm.licenseNo.trim()) return showAlertMessage("Please enter license number", "warning");
        if (operatorForm.experience < 0) return showAlertMessage("Experience cannot be negative", "warning");
        if (!operatorForm.selectedBusRegNo) return showAlertMessage("Please select a bus", "warning");

        try {
            const operatorData = {
                ...operatorForm,
                profilePicture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
            };
            const newOperator = await createOperator(operatorData);

            if (newOperator?.id) {
                await assignOperatorToBus(newOperator.id, operatorForm.selectedBusRegNo);
                showAlertMessage("Operator added and assigned to bus successfully!", "success");

                setOperatorForm({
                    name: "",
                    email: "",
                    contactNo: "",
                    nic: "",
                    licenseNo: "",
                    experience: 0,
                    selectedBusRegNo: ""
                });

                fetchData();
            }
        } catch (error) {
            console.error(error);
            showAlertMessage("Failed to add operator to bus", "error");
        }
    };

    const handleUnassignOperator = async (operatorId: string) => {
        try {
            await unassignOperatorFromBus(operatorId);
            showAlertMessage("Operator unassigned successfully!", "success");
            fetchData();
        } catch {
            showAlertMessage("Failed to unassign operator", "error");
        }
    };

    const handleDeleteOperator = async (operatorId: string) => {
        try {
            await deleteOperator(operatorId);
            showAlertMessage("Operator deleted successfully!", "success");
            fetchData();
        } catch {
            showAlertMessage("Failed to delete operator", "error");
        }
    };

    const getUnassignedBuses = () => buses.filter(bus => !bus.operatorId);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100">
                <Navbar />
                <div className="flex items-center justify-center h-screen mt-16">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading operators data...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100">
            <Navbar />

            <div className="p-6 mt-16 max-w-7xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">Bus Operators Management</h1>
                    <p className="text-gray-600 mt-1">Manage bus operators and their assignments</p>
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 mb-6">
                    <div className="border-b border-gray-200">
                        <nav className="flex space-x-8 px-6">
                            <button
                                onClick={() => setActiveTab('operators')}
                                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                    activeTab === 'operators'
                                        ? 'border-red-500 text-red-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                View Operators
                            </button>
                            <button
                                onClick={() => setActiveTab('add-operator')}
                                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                    activeTab === 'add-operator'
                                        ? 'border-red-500 text-red-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                Add Operator to Bus
                            </button>
                        </nav>
                    </div>

                    <div className="p-6">
                        {/* Operators Tab */}
                        {activeTab === 'operators' && (
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">All Bus Operators</h3>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                                        <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Operator</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Info</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">License & Experience</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned Bus</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                        {operators.map(operator => (
                                            <tr key={operator.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap flex items-center">
                                                    {operator.profilePicture ? (
                                                        <img src={operator.profilePicture} alt={operator.name} className="w-10 h-10 rounded-full object-cover mr-3" />
                                                    ) : (
                                                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                                                            <span className="text-white font-bold text-sm">{operator.name.charAt(0).toUpperCase()}</span>
                                                        </div>
                                                    )}
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">{operator.name}</div>
                                                        <div className="text-sm text-gray-500">{operator.email}</div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{operator.contactNo}</div>
                                                    <div className="text-sm text-gray-500">NIC: {operator.nic}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{operator.licenseNo}</div>
                                                    <div className="text-sm text-gray-500">{operator.experience} years experience</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {operator.assignedBusRegNo ? (
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">{operator.assignedBusRegNo}</span>
                                                    ) : (
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Unassigned</span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-2">
                                                    {operator.assignedBusRegNo && (
                                                        <CustomButton
                                                            type="button"
                                                            onClick={() => handleUnassignOperator(operator.id!)}
                                                            buttonLabel="Unassign"
                                                            buttonClassName="px-3 py-1 text-xs bg-yellow-600 hover:bg-yellow-700 text-white rounded-md"
                                                        />
                                                    )}
                                                    <CustomButton
                                                        type="button"
                                                        onClick={() => handleDeleteOperator(operator.id!)}
                                                        buttonLabel="Delete"
                                                        buttonClassName="px-3 py-1 text-xs bg-red-600 hover:bg-red-700 text-white rounded-md"
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                                {operators.length === 0 && (
                                    <div className="text-center py-8 text-gray-500 text-lg">No operators found. Add one using the "Add Operator to Bus" tab.</div>
                                )}
                            </div>
                        )}

                        {/* Add Operator Tab */}
                        {activeTab === 'add-operator' && (
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Operator to Bus</h3>
                                <form onSubmit={handleAddOperatorToBus} className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <InputField id="name" type="text" value={operatorForm.name} onChange={e => setOperatorForm({...operatorForm, name: e.target.value})} label={true} labelName="Full Name" placeholder="Enter full name" />
                                        <InputField id="email" type="email" value={operatorForm.email} onChange={e => setOperatorForm({...operatorForm, email: e.target.value})} label={true} labelName="Email" placeholder="Enter email" />
                                        <InputField id="contactNo" type="tel" value={operatorForm.contactNo} onChange={e => setOperatorForm({...operatorForm, contactNo: e.target.value})} label={true} labelName="Contact Number" placeholder="Enter contact number" />
                                        <InputField id="nic" type="text" value={operatorForm.nic} onChange={e => setOperatorForm({...operatorForm, nic: e.target.value})} label={true} labelName="NIC" placeholder="Enter NIC number" />
                                        <InputField id="licenseNo" type="text" value={operatorForm.licenseNo} onChange={e => setOperatorForm({...operatorForm, licenseNo: e.target.value})} label={true} labelName="License Number" placeholder="Enter license number" />
                                        <InputField id="experience" type="number" value={operatorForm.experience} onChange={e => setOperatorForm({...operatorForm, experience: parseInt(e.target.value) || 0})} label={true} labelName="Years of Experience" placeholder="Enter years of experience" min="0" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Assign to Bus</label>
                                        <select value={operatorForm.selectedBusRegNo} onChange={e => setOperatorForm({...operatorForm, selectedBusRegNo: e.target.value})} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500">
                                            <option value="">Select a bus...</option>
                                            {getUnassignedBuses().map(bus => <option key={bus.regNo} value={bus.regNo}>{bus.regNo} - {bus.route}</option>)}
                                        </select>
                                    </div>
                                    <div className="flex justify-end">
                                        <CustomButton type="submit" buttonLabel="Add Operator to Bus" buttonClassName="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-md" />
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Footer />

            <CustomAlert
                isOpen={showAlert}
                message={alertMessage}
                variant={alertVariant}
                onClose={() => setShowAlert(false)}
                autoCloseMs={3000}
            />
        </div>
    );
};

export default BusOperators;
