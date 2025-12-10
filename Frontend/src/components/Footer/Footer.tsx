import { RiFacebookCircleFill, RiInstagramFill } from "react-icons/ri";
import { FaTwitter, FaYoutube } from "react-icons/fa";
import footerData from "../../data/data.json";
import Logo from "@/assets/images/BusLogo.png";

const Footer = () => {
    return (
        <footer className="w-full bg-gray-900 text-white py-12 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <img src={Logo} alt="X-Bus Logo" className="h-16 w-auto" />
                            <span className="text-2xl font-bold">X-Bus</span>
                        </div>
                        <p className="text-gray-400 text-sm">
                            Revolutionizing public transportation with smart technology and exceptional service.
                        </p>
                        <div className="space-y-2 text-gray-400 text-sm">
                            <div>
                                <a href={`tel:${footerData.footerData.contact}`} className="hover:text-white transition-colors">
                                    {footerData.footerData.contact}
                                </a>
                            </div>
                            <div>
                                <a href={`mailto:${footerData.footerData.email}`} className="hover:text-white transition-colors">
                                    {footerData.footerData.email}
                                </a>
                            </div>
                            <p>{footerData.footerData.address}</p>
                        </div>
                    </div>
                    
                    {/* Services */}
                    <div>
                        <h4 className="font-semibold mb-4 text-white">Services</h4>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li className="hover:text-white transition-colors cursor-pointer">Bus Tracking</li>
                            <li className="hover:text-white transition-colors cursor-pointer">Route Planning</li>
                            <li className="hover:text-white transition-colors cursor-pointer">Payment Solutions</li>
                            <li className="hover:text-white transition-colors cursor-pointer">Customer Support</li>
                        </ul>
                    </div>
                    
                    {/* Company */}
                    <div>
                        <h4 className="font-semibold mb-4 text-white">Company</h4>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li className="hover:text-white transition-colors cursor-pointer">About Us</li>
                            <li className="hover:text-white transition-colors cursor-pointer">Careers</li>
                            <li className="hover:text-white transition-colors cursor-pointer">Press</li>
                            <li className="hover:text-white transition-colors cursor-pointer">Contact</li>
                        </ul>
                    </div>
                    
                    {/* Support & Social */}
                    <div>
                        <h4 className="font-semibold mb-4 text-white">Support</h4>
                        <ul className="space-y-2 text-gray-400 text-sm mb-6">
                            <li className="hover:text-white transition-colors cursor-pointer">Help Center</li>
                            <li className="hover:text-white transition-colors cursor-pointer">Safety</li>
                            <li className="hover:text-white transition-colors cursor-pointer">Terms of Service</li>
                            <li className="hover:text-white transition-colors cursor-pointer">Privacy Policy</li>
                        </ul>
                        
                        {/* Social Media Links */}
                        <div className="flex space-x-4 text-gray-400">
                            <a href="#" aria-label="Facebook" className="hover:text-white transition-colors">
                                <RiFacebookCircleFill className="text-2xl"/>
                            </a>
                            <a href="#" aria-label="YouTube" className="hover:text-white transition-colors">
                                <FaYoutube className="text-2xl"/>
                            </a>
                            <a href="#" aria-label="Instagram" className="hover:text-white transition-colors">
                                <RiInstagramFill className="text-2xl"/>
                            </a>
                            <a href="#" aria-label="Twitter" className="hover:text-white transition-colors">
                                <FaTwitter className="text-2xl"/>
                            </a>
                        </div>
                    </div>
                </div>
                
                {/* Copyright */}
                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
                    <p>{footerData.footerData.copyright}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
