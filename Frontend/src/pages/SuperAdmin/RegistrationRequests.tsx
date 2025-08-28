import React, { useEffect, useState } from "react";
import Navbar from "@/components/TopNavbar/Navbar";
import Footer from "@/components/Footer/Footer";
import CustomButton from "@/components/Button/CustomButton";
import { approveBusRegistrationRequest, BusRegistrationRequest, listBusRegistrationRequests, rejectBusRegistrationRequest } from "@/api/busAPI";

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

    const handleApprove = async (id: string) => {
        try {
            await approveBusRegistrationRequest(id);
            await load();
        } catch (e) {
            setError("Failed to approve request");
        }
    };

    const handleReject = async (id: string) => {
        try {
            await rejectBusRegistrationRequest(id);
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
                        <div className="overflow-x-auto">
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
                                            <td className="px-4 py-3">{r.contact}</td>
                                            <td className="px-4 py-3 font-medium">{r.regNo}</td>
                                            <td className="px-4 py-3">{r.busType}</td>
                                            <td className="px-4 py-3">{r.manufactureYear}</td>
                                            <td className="px-4 py-3">{r.chassisNo}</td>
                                            <td className="px-4 py-3">
                                                <a href={r.proofLetterUrl} target="_blank" rel="noreferrer" className="text-blue-600 underline">View</a>
                                            </td>
                                            <td className="px-4 py-3 capitalize">{r.status}</td>
                                            <td className="px-4 py-3 flex gap-2">
                                                <CustomButton
                                                    buttonLabel="Approve"
                                                    variant="success"
                                                    size="sm"
                                                    disabled={r.status !== "pending"}
                                                    onClick={() => handleApprove(r.id)}
                                                />
                                                <CustomButton
                                                    buttonLabel="Reject"
                                                    variant="danger"
                                                    size="sm"
                                                    disabled={r.status !== "pending"}
                                                    onClick={() => handleReject(r.id)}
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