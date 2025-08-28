import Navbar from "@/components/TopNavbar/Navbar.tsx";
import Footer from "@/components/Footer/Footer.tsx";
import EditAdminProfileForm from "@/section/mainSection/editAdminProfileForm.tsx";

const EditAdminProfile = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100">
            <Navbar />
            
            <div className="pt-20 pb-16">
                <EditAdminProfileForm />
            </div>

            <Footer />
        </div>
    );
};

export default EditAdminProfile;