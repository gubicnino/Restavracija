import { MapPinIcon, NavigationIcon } from "lucide-react";
import { useState } from "react";
import { AlertCircleIcon, Loader2Icon } from "lucide-react";

export default function Map(props, zoom = 15) {
    const [showDirections, setShowDirections] = useState(false);
    const [userLocation, setUserLocation] = useState(null);
    const [locationError, setLocationError] = useState(null);
    const [isLoadingLocation, setIsLoadingLocation] = useState(false);
   
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    const encodedLocation = encodeURIComponent(props.location);

    const getUserLocation = () => {
        setIsLoadingLocation(true);
        setLocationError(null);
        
        if (!navigator.geolocation) {
            setLocationError("Vaš brskalnik ne podpira geolokacije");
            setIsLoadingLocation(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setUserLocation({ lat: latitude, lng: longitude });
                setIsLoadingLocation(false);
                setShowDirections(true);
            },
            (error) => {
                console.error("Geolocation error:", error);
                let errorMessage = "Napaka pri pridobivanju lokacije";
                
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage = "Dostop do lokacije je zavrnjen. Omogočite GPS v nastavitvah brskalnika.";
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = "Lokacija ni na voljo";
                        break;
                    case error.TIMEOUT:
                        errorMessage = "Zahteva za lokacijo je potekla";
                        break;
                }
                
                setLocationError(errorMessage);
                setIsLoadingLocation(false);
            },
            {
                enableHighAccuracy: true, //gps
                timeout: 10000,
                maximumAge: 0
            }
        );
    };
    const handleDirectionsClick = () => {
        if (!showDirections) {
            getUserLocation();
        } else {
            setShowDirections(false);
            setUserLocation(null);
            setLocationError(null);
        }
    };
    const placeUrl = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodedLocation}&zoom=${zoom}`;
    
    const directionsUrl = userLocation 
        ? `https://www.google.com/maps/embed/v1/directions?key=${apiKey}&origin=${userLocation.lat},${userLocation.lng}&destination=${encodedLocation}&mode=driving`
        : `https://www.google.com/maps/embed/v1/directions?key=${apiKey}&origin=current+location&destination=${encodedLocation}&mode=driving`;
    
    const embedUrl = showDirections ? directionsUrl : placeUrl;
    
    return (
        <>
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-playfair text-2xl text-white mb-6 flex items-center gap-3">
                    <span className="w-6 h-6 text-gold">{props.icon}</span>
                    {props.title}
                </h3>
                {/* Toggle button */}
                <button
                    onClick={handleDirectionsClick}
                    disabled={isLoadingLocation}
                    className="flex items-center gap-2 px-4 py-2 border border-gold/30 text-gold hover:bg-gold hover:text-black-rich transition-all duration-300 text-sm font-inter tracking-wider uppercase"
                >
                    {isLoadingLocation ? (
                        <>
                            <Loader2Icon className="w-4 h-4 animate-spin" />
                            Pridobivam lokacijo...
                        </>
                    ) : showDirections ? (
                        <>
                            <MapPinIcon className="w-4 h-4" />
                            Prikaži lokacijo
                        </>
                    ) : (
                        <>
                            <NavigationIcon className="w-4 h-4" />
                            Pokaži pot
                        </>
                    )}
                </button>
            </div>
            {/* Error message */}
            {locationError && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 flex items-start gap-2">
                    <AlertCircleIcon className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-red-400 text-sm font-inter">{locationError}</p>
                        <button 
                            onClick={() => setLocationError(null)}
                            className="text-red-500 hover:text-red-400 text-xs mt-1 underline"
                        >
                            Zapri
                        </button>
                    </div>
                </div>
            )}
            <div className="relative w-full h-96 bg-black-card border border-white/5 overflow-hidden">
                <iframe
                    src={embedUrl}
                    width="100%"
                    height="100%"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    style={{ border: 0 }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/0 transition-colors pointer-events-none" />
            </div>
        </>
)
}