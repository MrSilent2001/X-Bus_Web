import Navbar from "@/components/TopNavbar/Navbar.tsx";
import Footer from "@/components/Footer/Footer.tsx";
import EditBusProfileForm from "@/section/mainSection/editBusProfileForm.tsx";

const EditBusProfile = () => {

    return(
        <div>
            <Navbar/>

            <EditBusProfileForm/>

            <Footer/>
        </div>
    );
}

export default EditBusProfile;