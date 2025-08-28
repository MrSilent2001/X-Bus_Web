import { useState, useMemo, useRef, useEffect } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import Navbar from "@/components/TopNavbar/Navbar";
import Footer from "@/components/Footer/Footer";
import CustomButton from "@/components/Button/CustomButton";
import { FaSearch, FaMapMarkerAlt, FaBus, FaLocationArrow, FaFilter, FaEye, FaEyeSlash, FaSync  } from "react-icons/fa";

const LocationTracking = () => {
    const allMarkers = [
        { 
            id: 1, 
            position: { lat: 6.9271, lng: 79.8612 }, 
            name: "Colombo Central",
            busCount: 15,
            status: "Active",
            route: "Colombo - Kandy",
            lastUpdate: "2 min ago"
        },
        { 
            id: 2, 
            position: { lat: 7.2906, lng: 80.6337 }, 
            name: "Kandy Station",
            busCount: 8,
            status: "Active",
            route: "Kandy - Colombo",
            lastUpdate: "1 min ago"
        },
        { 
            id: 3, 
            position: { lat: 6.0535, lng: 80.2210 }, 
            name: "Galle Terminal",
            busCount: 12,
            status: "Active",
            route: "Galle - Colombo",
            lastUpdate: "3 min ago"
        },
        { 
            id: 4, 
            position: { lat: 8.5860, lng: 81.2152 }, 
            name: "Jaffna Hub",
            busCount: 6,
            status: "Active",
            route: "Jaffna - Colombo",
            lastUpdate: "5 min ago"
        },
        { 
            id: 5, 
            position: { lat: 6.9341, lng: 79.8478 }, 
            name: "Dehiwala Station",
            busCount: 10,
            status: "Active",
            route: "Dehiwala - Colombo",
            lastUpdate: "1 min ago"
        },
    ];

    const [search, setSearch] = useState("");
    const [filteredMarkers, setFilteredMarkers] = useState(allMarkers);
    const [selectedMarker, setSelectedMarker] = useState<any>(null);
    const [mapType, setMapType] = useState<"roadmap" | "satellite" | "hybrid" | "terrain">("roadmap");
    const [isMapLoaded, setIsMapLoaded] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const [selectedStatus, setSelectedStatus] = useState("all");

    const mapRef = useRef<google.maps.Map | null>(null);

    const containerStyle = {
        width: "100%",
        height: "calc(100vh - 140px)",
    };

    const center = useMemo(() => ({ lat: 7.8731, lng: 80.7718 }), []);

    // Create marker icon with proper error handling
    const createMarkerIcon = () => {
        if (typeof window !== 'undefined' && window.google && window.google.maps) {
            return {
                url: "http://maps.google.com/mapfiles/ms/icons/bus.png",
                scaledSize: new window.google.maps.Size(40, 40),
            };
        }
        return {
            url: "http://maps.google.com/mapfiles/ms/icons/bus.png",
        };
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearch(value);

        const filtered = allMarkers.filter((marker) =>
            marker.name.toLowerCase().includes(value.toLowerCase()) ||
            marker.route.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredMarkers(filtered);
    };

    const handleMarkerClick = (marker: any) => {
        setSelectedMarker(marker);
    };

    const handleMapClick = () => {
        setSelectedMarker(null);
    };

    const resetMap = () => {
        setSearch("");
        setFilteredMarkers(allMarkers);
        setSelectedMarker(null);
        setSelectedStatus("all");
        if (mapRef.current) {
            mapRef.current.setCenter(center);
            mapRef.current.setZoom(6);
        }
    };

    const toggleControls = () => {
        setShowControls(!showControls);
    };

    const refreshData = () => {
        // Simulate data refresh
        console.log("Refreshing data...");
    };

    // Fit bounds whenever markers change
    useEffect(() => {
        if (mapRef.current && filteredMarkers.length && isMapLoaded) {
            const bounds = new window.google.maps.LatLngBounds();
            filteredMarkers.forEach((marker) => bounds.extend(marker.position));
            mapRef.current.fitBounds(bounds);
        }
    }, [filteredMarkers, isMapLoaded]);

    const onMapLoad = (map: google.maps.Map) => {
        mapRef.current = map;
        setIsMapLoaded(true);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100">
            <Navbar />

            <div className="relative pt-20">
                {/* Enhanced Header Section */}
                <div className="bg-white shadow-lg border-b border-gray-100 px-6 py-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">Live Bus Tracking</h1>
                                <p className="text-gray-600 text-lg">Monitor real-time location of all buses in the network</p>
                            </div>
                            <div className="flex items-center space-x-6">
                                <div className="text-center bg-gradient-to-r from-red-50 to-red-100 p-4 rounded-xl border border-red-200">
                                    <p className="text-3xl font-bold text-red-700">{allMarkers.length}</p>
                                    <p className="text-sm text-gray-600 font-medium">Active Stations</p>
                                </div>
                                <div className="text-center bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
                                    <p className="text-3xl font-bold text-green-700">
                                        {allMarkers.reduce((sum, marker) => sum + marker.busCount, 0)}
                                    </p>
                                    <p className="text-sm text-gray-600 font-medium">Total Buses</p>
                                </div>
                            </div>
                        </div>
                        
                        {/* Quick Actions Bar */}
                        <div className="flex items-center justify-between bg-gray-50 rounded-xl p-4">
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-2 text-sm text-gray-600">
                                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                    <span>Live Updates</span>
                                </div>
                                <div className="text-sm text-gray-500">
                                    Last updated: {new Date().toLocaleTimeString()}
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <CustomButton
                                    type="button"
                                    variant="secondary"
                                    size="sm"
                                    buttonLabel="Refresh"
                                    showIcon={true}
                                    icon={<FaSync  className="text-sm" />}
                                    onClick={refreshData}
                                />
                                <CustomButton
                                    type="button"
                                    variant="primary"
                                    size="sm"
                                    buttonLabel={showControls ? 'Hide' : 'Show'}
                                    showIcon={true}
                                    icon={showControls ? <FaEyeSlash className="text-sm" /> : <FaEye className="text-sm" />}
                                    onClick={toggleControls}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Enhanced Map Container */}
                <div className="relative">
                    {/* Enhanced Search and Controls */}
                    {showControls && (
                        <div className="absolute top-6 left-6 z-10 space-y-4 max-w-sm">
                            {/* Enhanced Search Bar */}
                            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 backdrop-blur-sm">
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3">
                                        <FaSearch className="text-gray-400 text-lg" />
                                        <input
                                            type="text"
                                            placeholder="Search stations or routes..."
                                            value={search}
                                            onChange={handleSearch}
                                            className="flex-1 outline-none text-gray-700 placeholder-gray-400 text-lg"
                                        />
                                        {search && (
                                            <CustomButton
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                buttonLabel="✕"
                                                onClick={() => setSearch("")}
                                                buttonClassName="text-gray-400 hover:text-red-600 p-1"
                                            />
                                        )}
                                    </div>
                                    
                                    {/* Status Filter */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                                            <FaFilter className="text-red-600" />
                                            <span>Filter by Status</span>
                                        </label>
                                        <select
                                            value={selectedStatus}
                                            onChange={(e) => setSelectedStatus(e.target.value)}
                                            className="w-full p-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
                                        >
                                            <option value="all">All Stations</option>
                                            <option value="active">Active Only</option>
                                            <option value="inactive">Inactive Only</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Enhanced Map Controls */}
                            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 backdrop-blur-sm">
                                <h3 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                                    <FaLocationArrow className="text-red-600" />
                                    <span>Map Controls</span>
                                </h3>
                                <div className="space-y-4">
                                    <CustomButton
                                        type="button"
                                        variant="primary"
                                        size="lg"
                                        buttonLabel="Reset Map View"
                                        showIcon={true}
                                        icon={<FaLocationArrow className="text-sm" />}
                                        onClick={resetMap}
                                        fullWidth={true}
                                    />
                                    
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Map Type</label>
                                        <select
                                            value={mapType}
                                            onChange={(e) => setMapType(e.target.value as any)}
                                            className="w-full p-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
                                        >
                                            <option value="roadmap">Road Map</option>
                                            <option value="satellite">Satellite</option>
                                            <option value="hybrid">Hybrid</option>
                                            <option value="terrain">Terrain</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Enhanced Station List */}
                            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 backdrop-blur-sm max-h-80 overflow-y-auto">
                                <h3 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                                    <FaMapMarkerAlt className="text-red-600" />
                                    <span>Active Stations</span>
                                    <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-medium">
                                        {filteredMarkers.length}
                                    </span>
                                </h3>
                                <div className="space-y-3">
                                    {filteredMarkers.map((marker) => (
                                        <div
                                            key={marker.id}
                                            className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 cursor-pointer transition-all duration-200 border border-transparent hover:border-red-200"
                                            onClick={() => {
                                                if (mapRef.current) {
                                                    mapRef.current.setCenter(marker.position);
                                                    mapRef.current.setZoom(12);
                                                }
                                            }}
                                        >
                                            <div className="relative">
                                                <FaMapMarkerAlt className="text-red-600 text-lg" />
                                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-semibold text-gray-900 truncate">{marker.name}</p>
                                                <p className="text-xs text-gray-500">{marker.route}</p>
                                                <p className="text-xs text-gray-400">{marker.lastUpdate}</p>
                                            </div>
                                            <div className="text-right">
                                                <div className="flex items-center space-x-1">
                                                    <FaBus className="text-red-600 text-xs" />
                                                    <span className="text-sm font-medium text-gray-700">{marker.busCount}</span>
                                                </div>
                                                <div className="w-2 h-2 bg-green-500 rounded-full mt-1"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Enhanced Map */}
                    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
                        <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={center}
                            zoom={6}
                            mapTypeId={mapType}
                            onLoad={onMapLoad}
                            onClick={handleMapClick}
                            options={{
                                zoomControl: true,
                                streetViewControl: false,
                                mapTypeControl: false,
                                fullscreenControl: false,
                                styles: [
                                    {
                                        featureType: "poi",
                                        elementType: "labels",
                                        stylers: [{ visibility: "off" }]
                                    }
                                ]
                            }}
                        >
                            {filteredMarkers.map((marker) => (
                                <Marker
                                    key={marker.id}
                                    position={marker.position}
                                    title={marker.name}
                                    onClick={() => handleMarkerClick(marker)}
                                    icon={createMarkerIcon()}
                                />
                            ))}

                            {selectedMarker && (
                                <InfoWindow
                                    position={selectedMarker.position}
                                    onCloseClick={() => setSelectedMarker(null)}
                                >
                                    <div className="p-4 max-w-xs">
                                        <div className="flex items-center space-x-3 mb-3">
                                            <FaMapMarkerAlt className="text-red-600 text-xl" />
                                            <div>
                                                <h3 className="font-bold text-gray-900 text-lg">{selectedMarker.name}</h3>
                                                <p className="text-sm text-gray-600">{selectedMarker.route}</p>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <span className="flex items-center space-x-2">
                                                    <FaBus className="text-red-600" />
                                                    <span className="text-sm font-medium">Active Buses</span>
                                                </span>
                                                <span className="text-sm font-bold text-gray-900">{selectedMarker.busCount}</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-600">Status</span>
                                                <span className="flex items-center space-x-1">
                                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                    <span className="text-sm text-green-600 font-medium">{selectedMarker.status}</span>
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-600">Last Update</span>
                                                <span className="text-sm text-gray-900">{selectedMarker.lastUpdate}</span>
                                            </div>
                                        </div>
                                    </div>
                                </InfoWindow>
                            )}
                        </GoogleMap>
                    </LoadScript>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default LocationTracking;
