import { React, useState, useEffect } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from "firebase/auth";
import { useRouter } from 'next/navigation';
import Image from "next/image";

const NEXT_PUBLIC_GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

function itineraryChooser() {
  const router = useRouter();
  const auth = getAuth();

  const [itineraries, setItineraries] = useState([]);
  const [itineraryName, setItineraryName] = useState("");
  const [user, loading] = useAuthState(auth);
  const [photos, setPhotos] = useState({});

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [activeDestination, setActiveDestination] = useState(null);

  

  useEffect(() => {
    const fetchTempItineraries = async () => {
      if (!user) return;

      const token = await user.getIdToken();
      const response = await fetch('http://localhost:8080/api/itinerary/fetchTempItineraries', {
        headers: {
          'Authorization': token,
        },
      });
      const data = await response.json();
      setItineraries(data);

      data.forEach(fetchTempDestinationPhoto);
    };

    fetchTempItineraries();
  }, [user]);

  async function fetchTempDestinationPhoto(itinerary) {
    const itineraryId = itinerary.itineraryId;
    const photoUrls = [];

    for (const destination of itinerary.listOfDestinations) {
      const photoRef = destination?.images;

      if (photoRef) {
        const baseUrl = 'https://maps.googleapis.com/maps/api/place/photo';
        const maxWidth = 400;
        const finalUrl = `${baseUrl}?maxwidth=${maxWidth}&photo_reference=${photoRef}&key=${NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;

        photoUrls.push(finalUrl);
      }
    }

    setPhotos(prevPhotos => ({ ...prevPhotos, [itineraryId]: photoUrls }));
  }

  const handleImageClick = (destination) => {
    setActiveDestination(destination);
    setShowModal(true);
  };

  const handleSelect = async (itineraryId) => {
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
      setErrorMessage('Error occurred during search');
    }
  }

  const setErrorMessage = () => {
    console.log("Something went wrong....")
  }

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
          <div style={{ display: 'flex', gap: '16px', overflowX: 'auto' }}>

            {itinerary.listOfDestinations && itinerary.listOfDestinations.map((destination, destIndex) => (
              <div key={destination.id} style={{ flex: 'none' }}>
                <div>{destination.name} Rating: {destination.rating}</div>
                <div 
                  className="relative h-[100px] w-[150px] rounded-[20px] cursor-pointer"
                  onClick={() => handleImageClick(destination)} // Set onClick handler here
                >
                  {photos[itinerary.itineraryId] && photos[itinerary.itineraryId][destIndex] &&
                    <Image objectFit={'contain'} fill src={photos[itinerary.itineraryId][destIndex]} alt="YAAAh"  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"/>}
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => handleSelect(itinerary.itineraryId)}>Select</button>
        </div>
      ))}

      {showModal && activeDestination && (
  <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-70 flex items-center justify-center">
    <div className="w-[40%] h-[50%] bg-white p-5 rounded-lg flex">
      <div className="flex-1 mr-5 max-h-[60%] max-w-[70%]">
        <Image objectFit={'contain'} layout={'responsive'} width={400} height={300} src={activeDestination?.image} alt="Destination" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
      </div>
      <div className="flex-2">
        <h2>{activeDestination?.name}</h2>
        <p>Rating: {activeDestination?.rating}</p>
        <p>Description: {/* Here, you can add more details about the destination. */}</p>
        <button onClick={() => setShowModal(false)} className="border border-gray-500 px-3 py-1 rounded hover:bg-gray-200">Close</button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}

export default itineraryChooser;