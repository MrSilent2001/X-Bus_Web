import Navbar from "@/components/TopNavbar/Navbar.tsx";
import Footer from "@/components/Footer/Footer.tsx";
import FeedbackCard from "@/components/Card/FeedbackCard.tsx";

const Feedback = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar/>

            <FeedbackCard/>

            <Footer/>
        </div>

    );
}

export default Feedback;
