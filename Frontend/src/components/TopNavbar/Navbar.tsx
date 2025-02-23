import {Link, useNavigate} from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import ProfilePic from "../../assets/images/profilePic.jpeg";

const Navbar = () => {
    const navigate = useNavigate();

    const handleRedirect = () =>{
        navigate("/dashboard");
    }
    return (
        <nav className="fixed top-0 left-0 w-full px-6 py-2 bg-gradient-to-r from-red-100 to-white shadow-md z-50">
            <div className="flex items-center justify-between">

                {/* Logo Section */}
                <div className="flex items-center space-x-2">
                    <img className="h-12 w-auto cursor-pointer" src={Logo} alt="Logo"  onClick={handleRedirect}/>
                </div>

                {/* Navigation Links */}
                <div className="hidden md:flex gap-x-6 font-medium text-red-800">
                    <Link to="/dashboard" className="hover:text-red-600">Home</Link>
                    <Link to="/locationTracking" className="hover:text-red-600">Location</Link>
                    <Link to="/feedback" className="hover:text-red-600">Feedback</Link>
                    <Link to="/summery" className="hover:text-red-600">Summery</Link>
                </div>

                {/* Profile Icon */}
                <div>
                    <img className="h-10 w-10 rounded-full object-cover" src={ProfilePic} alt="User Profile"/>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
