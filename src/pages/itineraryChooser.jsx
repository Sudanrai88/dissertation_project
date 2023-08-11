import { React, useState, useEffect } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from "firebase/auth";
import { useRouter } from 'next/navigation';



function itineraryChooser() {
  const router = useRouter();
  const auth = getAuth();

  const [itineraries, setItineraries] = useState([]);
  const [itineraryName, setItineraryName] = useState("");
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    const fetchItineraries = async () => {
      if (!user) return;  // Exit if user isn't defined yet

      const token = await user.getIdToken();
      const response = await fetch('http://localhost:8080/api/itinerary/fetchTempItineraries', {
        headers: {
          'Authorization': token,
        },
      });
      const data = await response.json();
      console.log(data);
      setItineraries(data);
    };

    fetchItineraries();
  }, [user]);

  const handleSelect = async (itineraryId) => {
    console.log(itineraryId);
    console.log(itineraryName);
    const token = await user.getIdToken();
    const response = await fetch('http://localhost:8080/api/itinerary/select', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
      body: JSON.stringify({ itineraryId, itineraryName }),
    });

    if (response.ok) {
  
      router.push('/successPage');
    } else {
      // Handle error response
      setErrorMessage('Error occurred during search');
    }
  }

  const setErrorMessage = () => {
    console.log("Something went wrong....")
  }

  // Handle the response, maybe navigate the user to another page or show a confirmation


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <input
        type="text"
        value={itineraryName}
        onChange={(e) => setItineraryName(e.target.value)}
        placeholder="Enter Itinerary Name"
      />

      {itineraries.map((itinerary, index) => (
        <div key={itinerary.id} style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
          <h2>Itinerary {index + 1}</h2>
          <ul>
            {itinerary.listOfDestinations && itinerary.listOfDestinations.map(destination => (
              <li key={destination.id}>
                {/* You can modify how to display the destination here */}
                {destination.name}        Rating:  {destination.rating}
              </li>
            ))}
          </ul>
          <button onClick={() => handleSelect(itinerary.itineraryId)}>Select</button>
        </div>
      ))}
    </div>
  );
}

export default itineraryChooser;