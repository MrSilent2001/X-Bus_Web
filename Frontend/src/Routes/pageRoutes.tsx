import {Routes, Route} from "react-router-dom";
import SignUp from "@/pages/auth/SignUp.tsx";
import Login from "@/pages/auth/Login.tsx";
import Dashboard from "@/pages/Dashboard.tsx";
import LandingPage from "@/pages/LandingPage.tsx";

const PageRoutes = () =>{
    return (
        <Routes>
            <Route path="/" element={<LandingPage/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>

        </Routes>
    );
}

export default PageRoutes;