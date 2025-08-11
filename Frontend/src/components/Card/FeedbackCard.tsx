import Pagination from "@/components/Pagination/Pagination.tsx";
import {useState, useMemo, useEffect} from "react";
import {Feedback} from "@/types/feedback.ts";
import {getAllFeedbacks} from "@/api/feedbackAPI.ts";

const ITEMS_PER_PAGE = 5;

const FeedbackCard = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const[feedback, setFeedback] = useState<Feedback[]>([])

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const response = await getAllFeedbacks();
                setFeedback(response);
            } catch (error) {
                console.error("Error fetching buses:", error);
            }
        };

        fetchFeedbacks();
    }, [])

    const totalPages = useMemo(() => Math.ceil(feedback.length / ITEMS_PER_PAGE), []);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentFeedbacks = feedback.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const formatDate = (isoString: string) => {
        return new Date(isoString).toISOString().split("T")[0]; // Extract YYYY-MM-DD
    };

    const formatTime = (timeString: string) => {
        return timeString.slice(0, 5); // Extract HH:MM
    };


    return (
        <div className="max-w-screen-lg mx-auto px-4">
            <h1 className="mt-24 text-xl font-bold">Passenger Feedbacks</h1>

            {currentFeedbacks.map((item, index) => (
                <div
                    key={index}
                    className="my-8 bg-white p-6 rounded-lg shadow-md border border-gray-300"
                >
                    <div className="flex flex-col space-y-2">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-bold">{item.passengerName}</h2>
                            <h3 className="text-red-700 font-bold">{item.busRegNo}</h3>
                        </div>

                        <span className="text-xs text-gray-500">{formatDate(item.createdAt)}</span>
                        {item.time && <span className="text-gray-700 text-xs">{formatTime(item.time)}</span>}

                        <p className="text-md">{item.message}</p>
                    </div>
                </div>
            ))}


            {/* Pagination Component */}
            <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
            />
        </div>
    );
};

export default FeedbackCard;
