import Navbar from "@/components/TopNavbar/Navbar.tsx";
import Footer from "@/components/Footer/Footer.tsx";
import BusAccountCreationForm from "@/section/mainSection/busAccountCreationForm.tsx";

const CreateBusAccount = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100">
            <Navbar />
            
            <div className="pt-20 pb-16">
                <BusAccountCreationForm />
            </div>

            <Footer />
        </div>
    );
}

export default CreateBusAccount;