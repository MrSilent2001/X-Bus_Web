import Bus from "@/assets/images/Bus.png";
import BusLogo from "@/assets/images/BusLogo.png";
import CustomButton from "@/components/Button/CustomButton.tsx";
import Footer from "@/components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import { faArrowRight, faBus, faMapMarkerAlt, faCreditCard, faHeadset } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LandingPage = () => {
    const navigate = useNavigate();

    const handleGetStartedClick = () => {
        navigate("/login");
    };
    const handleSignUp = () => {
        navigate("/signup");
    }

    const features = [
        {
            icon: faBus,
            title: "Smart Bus Tracking",
            description: "Real-time location tracking for all buses in the network"
        },
        {
            icon: faMapMarkerAlt,
            title: "Route Optimization",
            description: "Efficient routes planned using advanced algorithms"
        },
        {
            icon: faCreditCard,
            title: "Easy Payments",
            description: "Secure and convenient payment options"
        },
        {
            icon: faHeadset,
            title: "24/7 Support",
            description: "Round-the-clock customer support service"
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Navigation Header */}
            <nav className="bg-white shadow-sm border-b border-gray-100 px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <img src={BusLogo} alt="X-Bus Logo" className="h-16 w-auto" />
                        <span className="text-3xl font-bold text-gray-900">X-Bus</span>
                    </div>
                    <div className="flex gap-2">
                        <CustomButton
                            onClick={handleSignUp}
                            buttonLabel="Sign Up"
                            variant="outline"
                            buttonClassName="h-12 w-40 px-8 py-3 text-lg font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
                        />
                        <CustomButton
                            onClick={() => navigate("/bus-registration-requests")}
                            buttonLabel="Bus Registration"
                            variant="primary"
                            buttonClassName="h-12 w-40 px-8 py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
                        />
                    </div>

                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-red-50 via-white to-red-100 py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Content */}
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                                    Revolutionizing
                                    <span className="block text-red-700">Public Transport</span>
                                </h1>
                                <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                                    Experience the future of bus transportation with real-time tracking,
                                    smart routing, and seamless payments. Join thousands of satisfied commuters.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <CustomButton
                                    onClick={handleGetStartedClick}
                                    buttonLabel="Start Your Journey"
                                    buttonClassName="bg-red-700 hover:bg-red-800 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                                    icon={<FontAwesomeIcon icon={faArrowRight} className="ml-2" />}
                                />
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-8 pt-8">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-red-700">50K+</div>
                                    <div className="text-gray-600">Happy Users</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-red-700">200+</div>
                                    <div className="text-gray-600">Buses</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-red-700">24/7</div>
                                    <div className="text-gray-600">Support</div>
                                </div>
                            </div>
                        </div>

                        {/* Right Image */}
                        <div className="relative">
                            <img
                                src={Bus}
                                alt="Modern Bus"
                                className="w-full h-auto"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Middle Get Started Button Section */}
            <section className="py-16 px-6 bg-white">
                <div className="max-w-4xl mx-auto flex flex-col items-center justify-center text-center">
                    <h2 className="text-4xl font-bold text-gray-900 mb-6">
                        Ready to Get Started?
                    </h2>
                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        Join thousands of commuters who have already discovered the convenience of smart public transportation
                    </p>
                    <CustomButton
                        onClick={handleGetStartedClick}
                        buttonLabel="Get Started Now"
                        buttonClassName="bg-red-700 hover:bg-red-800 text-white px-10 py-6 text-xl font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                        showIcon
                        icon={<FontAwesomeIcon icon={faArrowRight} className="ml-2" />}
                        iconPosition="right"
                    />
                </div>
            </section>

            {/* Features Section */}
            <section className="py-10 px-6 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Why Choose X-Bus?
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            We're committed to making your daily commute smarter, safer, and more convenient
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="bg-white p-8 text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2"
                            >
                                <div className="w-16 h-16 bg-red-700 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <FontAwesomeIcon
                                        icon={feature.icon}
                                        className="text-white text-2xl"
                                    />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6 bg-gradient-to-r from-red-700 to-red-900">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold text-white mb-6">
                        Transform Your Commute Today
                    </h2>
                    <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
                        Experience the future of transportation with X-Bus smart solutions
                    </p>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default LandingPage;