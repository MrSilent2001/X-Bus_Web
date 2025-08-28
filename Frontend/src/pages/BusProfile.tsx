import Navbar from "@/components/TopNavbar/Navbar.tsx";
import Footer from "@/components/Footer/Footer.tsx";
import BusProfileForm from "@/section/mainSection/busProfileForm.tsx";

const BusProfile = () => {

    return(
        <div>
            <Navbar/>

            <BusProfileForm/>

            <Footer/>
        </div>
    );
}

export default BusProfile;