import CustomButton from "@/components/Button/CustomButton.tsx";
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {getAllBuses} from "@/api/busAPI.ts";
import {Bus} from "@/types/bus.ts";

const Sidebar = () =>{
    const navigate = useNavigate();
    const [busData, setBusData] = useState<Bus[]>([]);

    useEffect(() => {
        const fetchBuses = async () => {
            try {
                const response = await getAllBuses();
                setBusData(response);
            } catch (error) {
                console.error("Error fetching buses:", error);
            }
        };

        fetchBuses();
    }, []);

    const handleAddBus = () => {
        navigate("/create-bus-account");
    };
    return (
        <div className="w-1/4 bg-white shadow-lg p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-10">Active Buses</h2>

            <div className="max-h-[500px] overflow-y-auto">
                {busData.map((busData) => (
                    <Link key={busData.regNo} to={`/busProfile/${busData.regNo}`}>
                        <div key={busData.id} className="flex items-center p-3 mb-3 bg-red-100 rounded-lg hover:bg-red-300 hover:font-semibold">
                            <img src={busData.profilePicture} alt="Bus" className="w-16 h-16 rounded"/>
                            <div className="ml-3">
                                <p className="font-bold">{busData.regNo}</p>
                                <p className="text-sm">{busData.routeNo}</p>
                                <p className="text-xs text-gray-500">{busData.route}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            <CustomButton
                type="button"
                onClick={handleAddBus}
                buttonLabel={"+ Add New"}
                buttonClassName="w-[310px] text-white bg-gradient-to-r from-red-200 to-red-200 rounded-lg h-10 text-red-800 transition-all duration-300 transform hover:bg-gradient-to-r hover:from-red-300 hover:to-red-300 cursor-pointer"
            />
        </div>
    );
}

export default Sidebar;