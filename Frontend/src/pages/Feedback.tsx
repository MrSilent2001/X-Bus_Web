import Navbar from "@/components/TopNavbar/Navbar.tsx";
import Footer from "@/components/Footer/Footer.tsx";
import FeedbackCard from "@/components/Card/FeedbackCard.tsx";

const Feedback = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100">
            <Navbar/>
            
            <div className="pt-20 pb-8">
                <FeedbackCard/>
            </div>

            <Footer/>
        </div>
    );
}

export default Feedback;
