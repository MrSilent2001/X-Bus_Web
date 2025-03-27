import Navbar from "@/components/TopNavbar/Navbar.tsx";
import Footer from "@/components/Footer/Footer.tsx";
import EditAdminProfileForm from "@/section/mainSection/editAdminProfileForm.tsx";

const EditAdminProfile = () => {

    return(
        <div>
            <Navbar/>

            <EditAdminProfileForm/>

            <Footer/>
        </div>
    );
}

export default EditAdminProfile;