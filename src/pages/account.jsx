
import { React, useState, useEffect } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from "firebase/auth";
import ItineraryList from "@/components/Account/ItineraryList";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import { useRouter } from 'next/navigation';
import Hero from "@/components/Hero";

function account() {
    const auth = getAuth();
    const router = useRouter();


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

    async function addItineraryToPopular(itineraryId) {
        console.log(itineraryId);

        try {
            if (!user) return;
            const token = await user.getIdToken();

            const response = await fetch(`http://localhost:8080/api/itinerary/addToPopular`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
                body: JSON.stringify({ itineraryId }),
            });

            if (response.status === 200) {
                console.log("Added!");

            } else {
                console.error("Failed to Add place");
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        router.push("/")
        return <div>Loading...</div>;

    }


    return (
        <div className="account-page">
            <NavBar startColour={"black"} endColour={"white"} />
            <div>
                <div className="flex max-w-[1140px] m-auto py-[100px]">
                    <div className="col-xl-3">
                        <div className="Profile">
                            <img src={user.imageURL} alt="/" className="profile-image" />
                            <div className="profile-name">{user.name}</div>
                            <div className="profile-email">{user.email}</div>
                            <textarea className="profile-description" defaultValue={user.description}></textarea>
                            <div className="mt-[50px] flex justify-center">
                                <button className="border rounded-[8px] px-2 py-1 mx-[5px]"> edit </button>
                                <button className="border rounded-[8px] px-2 py-1 mx-[5px]" onClick={() => auth.signOut()}>Logout</button>
                            </div>
                        </div>
                    </div>

                    <div className="Itineraries max-w-[75%] justify-center">
                        <h2>Your Itineraries</h2>
                        <div className="flex flex-row flex-wrap">
                            {itineraries.map(itinerary => (
                                <div className="mt-[48px]">
                                <ItineraryList
    
                                    key={itinerary.itineraryId}
                                    itinerary={itinerary}
                                    addItineraryToPopular={addItineraryToPopular}
                                    showActions={true}
                                    showPopular={false}
                                    onDelete={deleteItinerary}
                                    source="account" />
                                    </div>
                            ))}
                        </div>
                    </div>

                </div>

            </div>

            <Footer />
        </div>
    );
}


export default account