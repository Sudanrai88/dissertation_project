
import { React, useState, useEffect } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from "firebase/auth";
import ItineraryList from "@/components/Account/ItineraryList";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import { useRouter } from 'next/navigation';
import Hero from "@/components/Hero";
import Image from "next/image";
import Link from "next/link";

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

    console.log("help me")
    console.log(user.photoURL);

    return (
        <div className="account-page">
            <NavBar startColour={"black"} endColour={"white"} />
            <div>
                <div className="flex flex-col sm:flex-row max-w-[1140px] m-auto py-[100px] justify-center">
                    <div className="sm:mt-[65px] flex-[100%] sm:ml-[0px] sm:flex-[10%] max-h-[auto] sm:max-h-[420px] md:max-h-[450px] sm:border sm:rounded-[20px] p-4">
                        <div className="Profile flex flex-row sm:flex-col justify-center items-center ">
                            <div className="w-[100px] h-[100px] sm:w-[250px] sm:h-[250px] relative">
                                {user.photoURL ? (
                                    <Image
                                        src={user.photoURL}
                                        
                                        objectFit="cover"
                                        layout="fill"
                                        alt="/"
                                        className="rounded-[20px]"
                                    />
                                ) : (        
                                    <Image  
                                        src="/assets/anonymous_avatars_grey_circles.jpg"     
                                        objectFit="cover"
                                        layout="fill"
                                        alt="/"
                                        className="rounded-[20px]"
                                    />             
                                )}
                            </div>
                            <div className="sm:ml-[0px] ml-[25px] sm:mt-[10px]">
                                <div className="text-gray-600">{user.email}</div>
                            </div>

                            <div className="sm:mt-[30px] flex flex-col sm:flex-row justify-center ">
                                <button className="border rounded-[8px] px-2 py-1 mx-[5px] my-[5px]"> Save </button>
                                <button className="border rounded-[8px] px-2 py-1 mx-[5px]" onClick={() => auth.signOut()}>Logout</button>
                            </div>
                        </div>
                    </div>

                    <div className="flex-[75%] Itineraries max-w-[95%] sm:max-w-[80%] justify-center items-start mx-auto ">
  <h2 className="text-black text-[30px] font-bold flex justify-center mb-[20px]">Your Itineraries</h2>
  <div className="flex flex-row flex-wrap justify-start items-center sm:ml-[25px]">
    {itineraries.length > 0 ? (
      itineraries.map(itinerary => (
        <div className="mt-[0px] w-[100%] sm:w-[auto]">
          <ItineraryList
            BottomMargin={"mb-[10px]"}
            key={itinerary.itineraryId}
            itinerary={itinerary}
            addItineraryToPopular={addItineraryToPopular}
            showActions={true}
            showPopular={false}
            onDelete={deleteItinerary}
            source="account" />
        </div>
      ))
    ) : (
      <div className="text-center flex flex-col justify-center items-center w-[100%] mr-[20px]">
        <p>You have currently have no itineraries.</p>
        <Link href="/generatePage">
           <button>
          Press here to start generating!
        </button> 
        </Link>
        
      </div>
    )}
  </div>
</div>

                </div>

            </div>

            <Footer />
        </div>
    );
}


export default account