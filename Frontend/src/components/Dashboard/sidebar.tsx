import Bus from "@/assets/images/Bus.png";
import {busData} from "../../data/data.json";
import CustomButton from "@/components/Button/CustomButton.tsx";
import {Link, useNavigate} from "react-router-dom";

const Sidebar = () =>{
    const navigate = useNavigate();

    const handleAddBus = () => {
        console.log("New Bus Added");
        navigate("/create-bus-account");
    };
    return (
        <div className="w-1/4 bg-white shadow-lg p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-10">Active Buses</h2>

            <div className="max-h-[500px] overflow-y-auto">
                {busData.map((bus) => (
                    <Link key={bus.id} to="/busProfile">
                        <div key={bus.id} className="flex items-center p-3 mb-3 bg-red-100 rounded-lg hover:bg-red-300 hover:font-semibold">
                            <img src={Bus} alt="Bus" className="w-16 h-16 rounded"/>
                            <div className="ml-3">
                                <p className="font-bold">{bus.number}</p>
                                <p className="text-sm">{bus.route}</p>
                                <p className="text-xs text-gray-500">{bus.description}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            <CustomButton
                onClick={handleAddBus}
                buttonLabel={"+ Add New"}
                buttonClassName="w-[310px] text-white bg-gradient-to-r from-red-200 to-red-200 rounded-lg h-10 text-red-800 transition-all duration-300 transform hover:bg-gradient-to-r hover:from-red-300 hover:to-red-300 cursor-pointer"
            />
        </div>
    );
}

export default Sidebar;