import {Link, useNavigate} from "react-router-dom";
import Logo from "../../assets/images/BusLogo.png";
import PopOver from "@/components/PopOver/PopOver.tsx";

const Navbar = () => {
    const navigate = useNavigate();

    const handleRedirect = () =>{
        navigate("/dashboard");
    }


    return (
        <nav className="fixed top-0 left-0 w-full px-6 py-2 bg-gradient-to-r from-red-300 via-red-200 to-white from-0% via-10% to-100% shadow-md z-50">
            <div className="flex items-center justify-between">

                {/* Logo Section */}
                <div className="flex items-center space-x-2">
                        <img className="h-14 w-auto cursor-pointer" src={Logo} alt="Logo" onClick={handleRedirect}/>

                </div>

                {/* Navigation Links */}
                <div className="hidden md:flex gap-x-12 font-light text-lg text-red-900">
                    <Link to="/dashboard" className="hover:text-red-600">Home</Link>
                    <Link to="/locationTracking" className="hover:text-red-600">Location</Link>
                    <Link to="/feedback" className="hover:text-red-600">Feedback</Link>
                    {/*<Link to="/summery" className="hover:text-red-600">Summery</Link>*/}
                </div>

                <PopOver/>
            </div>
        </nav>
    );
}

export default Navbar;
