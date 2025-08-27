import CustomButton from "@/components/Button/CustomButton.tsx";
import {Link, useNavigate} from "react-router-dom";
import {Bus} from "@/types/bus.ts";

interface SidebarProps {
    busData: Bus[];
}

const Sidebar = ({ busData }: SidebarProps) =>{
    const navigate = useNavigate();

    const handleAddBus = () => {
        navigate("/create-bus-account");
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 h-fit">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Active Buses</h2>
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                    <span className="text-red-600 text-sm font-bold">{busData.length}</span>
                </div>
            </div>

            <div className="max-h-[500px] overflow-y-auto space-y-3 mb-6">
                {busData.map((bus) => (
                    <Link key={bus.regNo} to={`/busProfile/${bus.regNo}`}>
                        <div className="flex items-center p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-xl border border-red-200 hover:from-red-100 hover:to-red-200 hover:border-red-300 transition-all duration-300 transform hover:scale-105 cursor-pointer">
                            {/* Bus Picture or Default Icon */}
                            {bus.profilePicture ? (
                                <img 
                                    src={bus.profilePicture} 
                                    alt={`Bus ${bus.regNo}`} 
                                    className="w-12 h-12 rounded-xl object-cover mr-4 border-2 border-red-200"
                                    onError={(e) => {
                                        // Fallback to default icon if image fails to load
                                        const target = e.target as HTMLImageElement;
                                        target.style.display = 'none';
                                        target.nextElementSibling?.classList.remove('hidden');
                                    }}
                                />
                            ) : null}
                            <div className={`w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center mr-4 ${bus.profilePicture ? 'hidden' : ''}`}>
                                <span className="text-white font-bold text-sm">🚌</span>
                            </div>
                            
                            <div className="flex-1">
                                <p className="font-bold text-gray-900">{bus.regNo}</p>
                                <p className="text-sm text-gray-600">Route: {bus.routeNo}</p>
                                <p className="text-xs text-gray-500">{bus.route}</p>
                                <p className="text-xs text-gray-500">Capacity: {bus.seatingCapacity} seats</p>
                            </div>
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        </div>
                    </Link>
                ))}
            </div>

            <CustomButton
                type="button"
                onClick={handleAddBus}
                buttonLabel="+ Add New Bus"
                buttonClassName="w-full bg-red-700 hover:bg-red-800 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            />

            {/* Quick Stats */}
            <div className="mt-6 space-y-3">
                <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-xl p-4 border border-red-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Total Revenue</p>
                            <p className="text-lg font-bold text-red-700">Rs. 2.4M</p>
                        </div>
                        <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                            <span className="text-white text-sm">💰</span>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Active Routes</p>
                            <p className="text-lg font-bold text-green-700">{busData.length}</p>
                        </div>
                        <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                            <span className="text-white text-sm">🛣️</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;