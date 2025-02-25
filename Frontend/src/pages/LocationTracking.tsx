import Navbar from "@/components/TopNavbar/Navbar.tsx";
import Footer from "@/components/Footer/Footer.tsx";

const LocationTracking = () =>{
    return(
        <div>
            <Navbar/>

            <div className="h-screen">
                <h1>Location Tracking</h1>
            </div>

            <Footer/>
        </div>
    );
}

export default LocationTracking;