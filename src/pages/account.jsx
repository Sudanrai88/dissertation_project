
import { React, useState, useEffect } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from "firebase/auth";
import ItineraryList from "@/components/Account/ItineraryList";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";


function account() {
    const auth = getAuth();

    //Simple accounts page that shows picture from google, name and description that should be able to be edited.
    //Each itinerary in the database should create a component that dynamically shows data from the database. Information should be fitted in the wireframed areas.
    const [itineraries, setItineraries] = useState([]);
    const [user, loading] = useAuthState(auth);

    useEffect(() => {
        async function fetchItineraries() {
            try {
                if (!user) return;
                const token = await user.getIdToken();
                const response = await fetch('http://localhost:8080/api/itinerary/fetchItineraries', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token,
                    },
                });
                const data = await response.json();
                console.log(data)
                setItineraries(data);
            } catch (error) {
                console.error("Error fetching itineraries:", error);
            }
        }

        fetchItineraries();
    }, [user]);

    async function deleteItinerary(itineraryId) {
        try {
            if (!user) return;
            const token = await user.getIdToken();

            const response = await fetch(`http://localhost:8080/api/itinerary/deleteItinerary?itineraryId=${itineraryId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': token,
                }
            });

            if (response.status === 200) {
                console.log("deleted");

                // Remove the deleted itinerary from the state
                setItineraries(prev => prev.filter(it => it.itineraryId !== itineraryId));
            } else {
                console.error("Failed to delete place");
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    }

    if (loading) {
        return <div>Loading...</div>;
    }


    return (
        <div className="account-page">
            <NavBar />
            <div className="content max-w-[75%] m-auto">
                <h2>Your Itineraries</h2>
                <div className="itineraries">
                    {itineraries.map(itinerary => (
                        <ItineraryList key={itinerary.itineraryId} itinerary={itinerary} onDelete={deleteItinerary} />
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}


export default account