import { RiFacebookCircleFill, RiInstagramFill } from "react-icons/ri";
import { FaTwitter, FaYoutube } from "react-icons/fa";
import footerData from "../../data/data.json";

const Footer = () => {
    return (
        <footer className="w-full bg-gradient-to-r from-red-100 to-white shadow-md  text-black py-8 px-4 md:px-20">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
                    {/* Left Side - Contact Info */}
                    <div className="text-center md:text-left">
                        <h3 className="text-2xl font-semibold py-4">Contact</h3>
                        <div className="font-thin py-2">
                            <a href={`tel:${footerData.footerData.contact}`}>{footerData.footerData.contact}</a>
                        </div>
                        <div className="font-thin py-2">
                            <a href={`mailto:${footerData.footerData.email}`}>{footerData.footerData.email}</a>
                        </div>
                        <p className="font-thin py-2">
                            {footerData.footerData.address}
                        </p>
                    </div>

                    {/* Middle - Contact Info */}
                    <div className="text-center md:text-left">
                        <p className="mb-4 md:mb-0 font-medium">{footerData.footerData.copyright}</p>
                    </div>

                    {/* Right Side - Social Links & Copyright */}
                    <div className="text-center md:text-right">
                        <div className="flex justify-center md:justify-end space-x-6 mt-4 text-burgundy-700">
                            <a href="#" aria-label="Facebook">
                                <RiFacebookCircleFill className="text-3xl"/>
                            </a>
                            <a href="#" aria-label="YouTube">
                                <FaYoutube className="text-3xl"/>
                            </a>
                            <a href="#" aria-label="Instagram">
                                <RiInstagramFill className="text-3xl"/>
                            </a>
                            <a href="#" aria-label="Twitter">
                                <FaTwitter className="text-3xl"/>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
