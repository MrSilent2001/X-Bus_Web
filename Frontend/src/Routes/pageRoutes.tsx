import {Routes, Route} from "react-router-dom";
import SignUp from "@/pages/auth/SignUp.tsx";
import Login from "@/pages/auth/Login.tsx";
import Dashboard from "@/pages/Dashboard.tsx";
import LandingPage from "@/pages/LandingPage.tsx";
import CreateBusAccount from "@/pages/CreateBusAccount.tsx";
import AdminProfile from "@/pages/AdminProfile.tsx";
import BusProfile from "@/pages/BusProfile.tsx";
import LocationTracking from "@/pages/LocationTracking.tsx";
import Feedback from "@/pages/Feedback.tsx";
import SummeryReport from "@/pages/SummeryReport.tsx";

const PageRoutes = () =>{
    return (
        <Routes>
            <Route path="/" element={<LandingPage/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/create-bus-account" element={<CreateBusAccount/>}/>
            <Route path="/adminProfile" element={<AdminProfile/>}/>
            <Route path="/busProfile" element={<BusProfile/>}/>
            <Route path="/locationTracking" element={<LocationTracking/>}/>
            <Route path="/feedback" element={<Feedback/>}/>
            <Route path="/summery" element={<SummeryReport/>}/>
        </Routes>
    );
}

export default PageRoutes;