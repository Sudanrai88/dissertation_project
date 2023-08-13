import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from "firebase/auth";
import ConfirmModal from '@/components/ConfirmModal';
import {
    GoogleMap, LoadScript, Marker, InfoWindow,
    DirectionsService, DirectionsRenderer
} from '@react-google-maps/api';


function ItineraryDetail() {
    const NEXT_PUBLIC_GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    //States
    const [itinerary, setItinerary] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [placeToDelete, setPlaceToDelete] = useState(null);
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [directions, setDirections] = useState(null);

    const router = useRouter();
    const { id, source } = router.query;

    const auth = getAuth();
    const [user, loading] = useAuthState(auth);

    //Fetch Itinerary
    useEffect(() => {
        if (!id || !source) return;

        if(source === "account") {
            fetchItineraryDetails();
        } else if (source === "dashboard") {
            fetchPopularItineraryDetails();
        }
        
    }, [id, user]);

    //Directions Google Maps
    useEffect(() => {
        if (!window.google) {
            console.log("Waiting for Google...");
            const checkGoogleInterval = setInterval(() => {
                if (window.google) {
                    console.log("Google is now loaded!");
                    clearInterval(checkGoogleInterval);

                    console.log("here")
                    if (itinerary && itinerary.listOfDestinations.length > 0) {
                        const directionsService = new window.google.maps.DirectionsService();

                        const originLat = itinerary.listOfDestinations[0].latitude;
                        const originLon = itinerary.listOfDestinations[0].longitude;
                        const destinationLat = itinerary.listOfDestinations[itinerary.listOfDestinations.length - 1].latitude;
                        const destinationLong = itinerary.listOfDestinations[itinerary.listOfDestinations.length - 1].longitude;
                        const waypoints = itinerary.listOfDestinations.slice(1, -1).map(location => ({
                            location: { lat: location.latitude, lng: location.longitude },
                            stopover: true,
                        }));

                        directionsService.route(
                            {
                                origin: { lat: originLat, lng: originLon },
                                destination: { lat: destinationLat, lng: destinationLong },
                                waypoints: waypoints,
                                travelMode: window.google.maps.TravelMode.WALKING,
                            },
                            (result, status) => {
                                if (status === window.google.maps.DirectionsStatus.OK) {
                                    setDirections(result);
                                } else {
                                    console.error(`error fetching directions ${result}`);
                                }
                            }
                        );

                    }
                }
            }, 100);
        }
    }, [itinerary]);

    //Fetch Itinerary Logic
    async function fetchItineraryDetails() {
        if (!user) return;

        const token = await user.getIdToken();

        const response = await fetch(`http://localhost:8080/api/itinerary/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            },
        });
        const data = await response.json();
        setItinerary(data);
    }

    async function fetchPopularItineraryDetails() {
        if (!user) return;

        const token = await user.getIdToken();

        const response = await fetch(`http://localhost:8080/api/itinerary/popular/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            },
        });
        const data = await response.json();
        setItinerary(data);
    }

    //Delete a place
    async function deletePlace(placeId) {
        try {
            console.log(itinerary.itineraryId)
            console.log(placeId)
            if (!user) return;
            const token = await user.getIdToken();

            const response = await fetch(`http://localhost:8080/api/itinerary/deletePlace?itineraryId=${itinerary.itineraryId}&placeId=${placeId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': token,
                }
            });

            if (response.status === 200) {
                // Ideally, you might also want to remove the place from the local state 
                // so that it disappears from the UI without requiring a refresh or refetch.
                const updatedDestinations = itinerary.listOfDestinations.filter(dest => dest.placeId !== placeId);
                setItinerary(prev => ({ ...prev, listOfDestinations: updatedDestinations }));
            } else {
                // Handle any errors
                console.error("Failed to delete place");
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    }

    //Delete a place Modal
    async function handleConfirmDelete() {
        if (placeToDelete) {
            await deletePlace(placeToDelete);
        }
        setModalOpen(false);
    }

    //Prompt for Modal
    function promptDelete(placeId) {
        setPlaceToDelete(placeId);
        setModalOpen(true);
    }

    const mapStyles = {
        height: "100%",
        width: "100%"
    };

    let defaultCenter = { lat: 40.756795, lng: -73.954298 };  // Default to New York

    if (itinerary && itinerary.listOfDestinations.length > 0) {
        console.log(itinerary);
        defaultCenter = {
            lat: itinerary.listOfDestinations[0].originLocation[0],
            lng: itinerary.listOfDestinations[0].originLocation[1]
        };
    }

    if (!itinerary) return <div>Loading...</div>;

    return (
        <div className="itinerary-detail">
            <div className="left-content">
                <h2>{itinerary.itineraryId}</h2>
                <ul>
                    {itinerary.listOfDestinations.map((destination, index) => (
                        <div key={index}>
                            <li>{destination.name}</li>
                            <button> add </button>
                            <button onClick={() => promptDelete(destination.placeId)}> delete </button>
                        </div>
                    ))}
                </ul>
                <ConfirmModal
                    isOpen={isModalOpen}
                    message="Are you sure you want to delete this?"
                    onConfirm={handleConfirmDelete}
                    onCancel={() => setModalOpen(false)}
                />
            </div>

            <div className="right-content">
                <LoadScript googleMapsApiKey={NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
                    <GoogleMap mapContainerStyle={mapStyles} zoom={13} center={defaultCenter}>
                        {directions && <DirectionsRenderer directions={directions} />}
                        {itinerary.listOfDestinations.map((destination, index) => (
                            <React.Fragment key={index}>
                                <Marker
                                    position={{ lat: destination.latitude, lng: destination.longitude }}
                                    label={`${index + 1}`}
                                    onClick={() => setSelectedPlace(destination)}
                                />
                                {selectedPlace === destination && (
                                    <InfoWindow
                                        position={{ lat: destination.originLocation[0], lng: destination.originLocation[1] }}
                                        onCloseClick={() => setSelectedPlace(null)}
                                    >
                                        <div className="info-window-container">
                                            <div className="info-window-header">
                                                <h4>{destination.name}</h4>
                                                <img src={destination.imageUrl} alt={destination.name} />
                                            </div>
                                        </div>
                                    </InfoWindow>
                                )}
                            </React.Fragment>
                        ))}
                    </GoogleMap>
                </LoadScript>
            </div>
        </div>
    );
}

export default ItineraryDetail;