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
import ForgetPassword from "@/pages/auth/ForgetPassword.tsx";
import VerifyOTP from "@/pages/auth/VerifyOTP.tsx";
import ResetPassword from "@/pages/auth/ResetPassword.tsx";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute.tsx";
import EditBusProfile from "@/pages/EditBusProfile.tsx";

const PageRoutes = () =>{
    return (
        <Routes>
            <Route path="/" element={<LandingPage/>}/>

            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/forgot-password" element={<ForgetPassword/>}/>
            <Route path="/verifyOTP" element={<VerifyOTP/>}/>
            <Route path="/reset-password" element={<ResetPassword/>}/>

            <Route element={<ProtectedRoute/>}>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route path="/create-bus-account" element={<CreateBusAccount/>}/>
                    <Route path="/adminProfile" element={<AdminProfile/>}/>
                    <Route path="/busProfile/:regNo" element={<BusProfile/>}/>
                    <Route path="/editBusProfile/:regNo" element={<EditBusProfile/>}/>
                    <Route path="/locationTracking" element={<LocationTracking/>}/>
                    <Route path="/feedback" element={<Feedback/>}/>
                    <Route path="/summery" element={<SummeryReport/>}/>
            </Route>
        </Routes>
    );
}

export default PageRoutes;