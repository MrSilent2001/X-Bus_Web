import {useState, useEffect, useCallback, useRef} from "react";
import {Feedback} from "@/types/feedback.ts";
import {getAllFeedbacks} from "@/api/feedbackAPI.ts";
import { 
    FaUser, 
    FaBus, 
    FaCalendarAlt, 
    FaClock, 
    FaStar,
    FaFileAlt
} from "react-icons/fa";
import { MdCelebration } from "react-icons/md";

const ITEMS_PER_PAGE = 10;

const FeedbackCard = () => {
    const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
    const [displayedFeedbacks, setDisplayedFeedbacks] = useState<Feedback[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [initialLoading, setInitialLoading] = useState(true);
    const observerRef = useRef<IntersectionObserver | null>(null);

    // Fetch all feedbacks on component mount
    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                setInitialLoading(true);
                const response = await getAllFeedbacks();
                setFeedbacks(response);
                setInitialLoading(false);
            } catch (error) {
                console.error("Error fetching feedbacks:", error);
                setInitialLoading(false);
            }
        };

        fetchFeedbacks();
    }, []);

    // Update displayed feedbacks when currentPage changes
    useEffect(() => {
        const startIndex = 0;
        const endIndex = currentPage * ITEMS_PER_PAGE;
        const newDisplayedFeedbacks = feedbacks.slice(startIndex, endIndex);
        setDisplayedFeedbacks(newDisplayedFeedbacks);
        setHasMore(endIndex < feedbacks.length);
    }, [currentPage, feedbacks]);

    // Intersection Observer for infinite scroll
    const lastElementRef = useCallback((node: HTMLDivElement) => {
        if (loading) return;
        
        if (observerRef.current) {
            observerRef.current.disconnect();
        }
        
        observerRef.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setLoading(true);
                setTimeout(() => {
                    setCurrentPage(prev => prev + 1);
                    setLoading(false);
                }, 500);
            }
        });
        
        if (node) {
            observerRef.current.observe(node);
        }
    }, [loading, hasMore]);

    const formatDate = (isoString: string) => {
        return new Date(isoString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const formatTime = (timeString: string) => {
        return timeString.slice(0, 5); // Extract HH:MM
    };

    if (initialLoading) {
        return (
            <div className="max-w-4xl mx-auto px-4">
                <div className="text-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading feedbacks...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4">
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Passenger Feedbacks</h1>
                <p className="text-gray-600">What our passengers are saying about their journey</p>
                <div className="mt-4 flex items-center justify-center space-x-4">
                    <div className="text-center">
                        <p className="text-2xl font-bold text-red-700">{feedbacks.length}</p>
                        <p className="text-sm text-gray-500">Total Feedbacks</p>
                    </div>
                    <div className="w-px h-8 bg-gray-300"></div>
                    <div className="text-center">
                        <p className="text-2xl font-bold text-red-700">{displayedFeedbacks.length}</p>
                        <p className="text-sm text-gray-500">Displayed</p>
                    </div>
                </div>
            </div>

            {/* Feedback Cards */}
            <div className="space-y-6">
                {displayedFeedbacks.map((item, index) => {
                    const isLastElement = index === displayedFeedbacks.length - 1;
                    
                    return (
                        <div
                            key={item.id || index}
                            ref={isLastElement ? lastElementRef : null}
                            className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                        >
                            <div className="flex flex-col space-y-4">
                                {/* Header */}
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                                            <FaUser className="text-red-600 text-lg" />
                                        </div>
                                        <div>
                                            <h2 className="text-lg font-bold text-gray-900">{item.passengerName}</h2>
                                            <p className="text-sm text-gray-500">Passenger</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="flex items-center space-x-2">
                                            <FaBus className="text-red-600" />
                                            <h3 className="text-red-700 font-bold text-lg">{item.busRegNo}</h3>
                                        </div>
                                        <p className="text-sm text-gray-500">Bus Registration</p>
                                    </div>
                                </div>

                                {/* Message */}
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <p className="text-gray-700 leading-relaxed">"{item.message}"</p>
                                </div>

                                {/* Footer */}
                                <div className="flex items-center justify-between text-sm text-gray-500">
                                    <div className="flex items-center space-x-4">
                                        <span className="flex items-center">
                                            <FaCalendarAlt className="mr-2 text-gray-400" />
                                            {formatDate(item.createdAt)}
                                        </span>
                                        {item.time && (
                                            <span className="flex items-center">
                                                <FaClock className="mr-2 text-gray-400" />
                                                {formatTime(item.time)}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <FaStar className="text-yellow-400" />
                                        <FaStar className="text-yellow-400" />
                                        <FaStar className="text-yellow-400" />
                                        <FaStar className="text-yellow-400" />
                                        <FaStar className="text-yellow-400" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Loading Indicator */}
            {loading && (
                <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-700 mx-auto"></div>
                    <p className="mt-2 text-gray-600">Loading more feedbacks...</p>
                </div>
            )}

            {/* No More Data */}
            {!hasMore && displayedFeedbacks.length > 0 && (
                <div className="text-center py-8">
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4 max-w-md mx-auto">
                        <div className="flex items-center justify-center space-x-2 mb-2">
                            <MdCelebration className="text-green-600 text-xl" />
                            <p className="text-green-700 font-medium">You've reached the end!</p>
                        </div>
                        <p className="text-green-600 text-sm">All feedbacks have been loaded</p>
                    </div>
                </div>
            )}

            {/* No Feedbacks */}
            {feedbacks.length === 0 && !initialLoading && (
                <div className="text-center py-20">
                    <div className="bg-gray-50 rounded-2xl p-8 max-w-md mx-auto">
                        <FaFileAlt className="text-6xl text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No Feedbacks Yet</h3>
                        <p className="text-gray-600">Be the first to share your experience!</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FeedbackCard;
