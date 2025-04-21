import Navbar from "@/components/TopNavbar/Navbar.tsx";
import Footer from "@/components/Footer/Footer.tsx";
import AdminProfileForm from "@/section/mainSection/adminProfileForm.tsx";

const AdminProfile = () =>{
    return(
        <div>
            <Navbar/>

            <AdminProfileForm/>

            <Footer/>
        </div>
    );
}

export default AdminProfile;