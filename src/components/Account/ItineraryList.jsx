import { React, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ConfirmModal from '../ConfirmModal';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from "firebase/auth";

const NEXT_PUBLIC_GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

function ItineraryList({ itinerary, onDelete }) {
    const router = useRouter();
    const [photoUrl, setPhotoUrl] = useState('');
    const auth = getAuth();
    const [user, loading] = useAuthState(auth);
    const [isModalOpen, setModalOpen] = useState(false);
    const [itineraryToDelete, setItineraryToDelete] = useState(null);




    useEffect(() => {
        // Get the photoRef
        const photoRef = itinerary.listOfDestinations?.find(destination => destination?.images)?.images;
        const itineraryId = itinerary.itineraryId;

        // Construct a unique key for local storage using the itinerary ID
        const storageKey = `photoUrl_${itineraryId}`;

        // Check if image URL is already in local storage
        const cachedUrl = localStorage.getItem(storageKey);
        if (cachedUrl) {
            console.log("From cache")
            setPhotoUrl(cachedUrl)
        } else {
            if (photoRef) {
                const baseUrl = 'https://maps.googleapis.com/maps/api/place/photo';
                const maxWidth = 400;
                const finalUrl = `${baseUrl}?maxwidth=${maxWidth}&photo_reference=${photoRef}&key=${NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
                console.log("callMade")

                // Set the URL in the state
                setPhotoUrl(finalUrl);
                localStorage.setItem(storageKey, finalUrl);
            }
        }
    }, [itinerary]);


    //Prompt for Modal
    function promptDelete(itineraryId) {
        setItineraryToDelete(itineraryId);
        setModalOpen(true);
    }

    //Delete a place Modal
    async function handleConfirmDelete() {
        if (itineraryToDelete) {
            await onDelete(itineraryToDelete);
        }
        setModalOpen(false);
    }

    return (
        <div className="itinerary-list-item" >
            <div onClick={() => router.push(`/itinerary/${itinerary.itineraryId}`)}>
                {photoUrl && <img src={photoUrl} alt="Destination" />}
                <h3>{itinerary.itineraryId}</h3>
            </div>

            <button onClick={() => promptDelete(itinerary.itineraryId)}>
                Delete Itinerary
            </button>
            <ConfirmModal
                isOpen={isModalOpen}
                message="Are you sure you want to delete this?"
                onConfirm={handleConfirmDelete}
                onCancel={() => setModalOpen(false)}
            />
        </div>
    );
}

export default ItineraryList;