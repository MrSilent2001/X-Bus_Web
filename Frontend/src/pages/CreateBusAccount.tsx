import Navbar from "@/components/TopNavbar/Navbar.tsx";
import Footer from "@/components/Footer/Footer.tsx";
import BusAccountCreationForm from "@/section/mainSection/busAccountCreationForm.tsx";


const CreateBusAccount = () => {
    return(
        <>
            <Navbar/>

            <BusAccountCreationForm/>

            <Footer/>
        </>
    );
}

export default CreateBusAccount;