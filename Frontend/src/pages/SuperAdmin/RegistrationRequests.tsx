import React, { useEffect, useState } from "react";
import Navbar from "@/components/TopNavbar/Navbar";
import Footer from "@/components/Footer/Footer";
import CustomButton from "@/components/Button/CustomButton";
import { updateBusRegistrationRequest, BusRegistrationRequest, listBusRegistrationRequests } from "@/api/busAPI";

const RegistrationRequests: React.FC = () => {
    const [requests, setRequests] = useState<BusRegistrationRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const load = async () => {
        setLoading(true);
        setError("");
        const data = await listBusRegistrationRequests();
        setRequests(data);
        setLoading(false);
    };

    useEffect(() => { load(); }, []);

    const handleApprove = async (busRegNo: string, status = "GRANTED") => {
        try {
            console.log("Approve clicked for", busRegNo);
            await updateBusRegistrationRequest(busRegNo, status);
            await load();
        } catch (e) {
            setError("Failed to approve request");
        }
    };

    const handleReject = async (busRegNo: string) => {
        try {
            await updateBusRegistrationRequest(busRegNo, "NOTGRANTED");
            await load();
        } catch (e) {
            setError("Failed to reject request");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="pt-24 pb-10 px-6">
                <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-6">Bus Registration Requests</h1>
                    {error && <p className="text-red-600 mb-4">{error}</p>}
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <div className="overflow-x-auto min-h-[200px]">
                            <table className="min-w-full text-left text-sm">
                                <thead className="border-b bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-3">Owner</th>
                                        <th className="px-4 py-3">Email</th>
                                        <th className="px-4 py-3">Contact</th>
                                        <th className="px-4 py-3">Reg No</th>
                                        <th className="px-4 py-3">Type</th>
                                        <th className="px-4 py-3">Year</th>
                                        <th className="px-4 py-3">Chassis</th>
                                        <th className="px-4 py-3">Proof</th>
                                        <th className="px-4 py-3">Status</th>
                                        <th className="px-4 py-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {requests.map((r) => (
                                        <tr key={r.id} className="border-b">
                                            <td className="px-4 py-3">{r.ownerName}</td>
                                            <td className="px-4 py-3">{r.email}</td>
                                            <td className="px-4 py-3">{r.contactNo}</td>
                                            <td className="px-4 py-3 font-medium">{r.busRegNo}</td>
                                            <td className="px-4 py-3">{r.type}</td>
                                            <td className="px-4 py-3">{r.manufacturedYear}</td>
                                            <td className="px-4 py-3">{r.chassisNo}</td>
                                            <td className="px-4 py-3">
                                                <a href={r.proof} target="_blank" rel="noreferrer" className="text-blue-600 underline">View</a>
                                            </td>
                                            <td className="px-4 py-3 capitalize">{r.status}</td>
                                            <td className="px-4 py-3 flex gap-2">
                                                <CustomButton
                                                    buttonLabel="Approve"
                                                    variant="success"
                                                    size="sm"
                                                    disabled={r.status !== "NOTGRANTED"}
                                                    onClick={() => handleApprove(r.busRegNo)}
                                                />
                                                <CustomButton
                                                    buttonLabel="Reject"
                                                    variant="danger"
                                                    size="sm"
                                                    disabled={r.status !== "GRANTED"}
                                                    onClick={() => handleReject(r.busRegNo)}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default RegistrationRequests; 