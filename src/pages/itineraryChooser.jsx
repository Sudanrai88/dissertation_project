import React, { useState, useEffect } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from "firebase/auth";
import { useRouter } from 'next/router'; // Corrected 'next/navigation' to 'next/router'
import Image from "next/image"; // Using the modern 'next/image'

const NEXT_PUBLIC_GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

function ItineraryChooser() {
  const router = useRouter();
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);

  const [itineraries, setItineraries] = useState([]);
  const [photos, setPhotos] = useState({});
  const [itineraryName, setItineraryName] = useState("");

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [activeDestination, setActiveDestination] = useState(null);

  useEffect(() => {
    async function fetchTempItineraries() {
      if (!user) return;

      const token = await user.getIdToken();
      const response = await fetch('https://touristic-backend-75e99f3f8303.herokuapp.com/api/itinerary/fetchTempItineraries', {
        headers: {
          'Authorization': token,
        },
      });
      const data = await response.json();
      setItineraries(data);

      data.forEach(fetchTempDestinationPhoto);
    }

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

  const handleImageClick = (destination, imageUrl) => {
    setActiveDestination({
      ...destination,
      image: imageUrl
    });
    setShowModal(true);
  }

  const handleSelect = async (itineraryId) => {
    const token = await user.getIdToken();
    const response = await fetch('https://touristic-backend-75e99f3f8303.herokuapp.com/api/itinerary/select', {
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

  const setErrorMessage = (message) => {
    console.error(message);  // Logging error to console
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log(itineraries)

  return (
    <div className="px-4 py-6 flex flex-col max-w-[1440px] m-auto">
      <div className="flex justify-center items-center">

        <input
          type="text"
          value={itineraryName}
          onChange={(e) => setItineraryName(e.target.value)}
          placeholder="Enter Itinerary Name"
          className="border p-2 rounded w-[97%]"
        />
      </div>

      <div className="w-[100%] ">
        {itineraries.map((itinerary, index) => (
          <div className="">
            <Itinerary key={itinerary.id} itinerary={itinerary} index={index} handleImageClick={handleImageClick} handleSelect={handleSelect} photos={photos} />
          </div>
        ))}
      </div>
      <div>
        left side
      </div>

      {showModal && <DestinationModal activeDestination={activeDestination} onClose={() => setShowModal(false)} />}
    </div>
  );
}

const Itinerary = ({ itinerary, index, handleImageClick, handleSelect, photos }) => (

  <div className="p-4 max-w-[100%]">
    <h2 className="text-xl mb-4">
      {itinerary.bestType ? `Best ${itinerary.bestType} Itinerary` : `Itinerary  ${index + 1}`}
    </h2>
    <div className="flex gap-4 overflow-x-auto whitespace-nowrap sm:flex-nowrap">

      {itinerary.listOfDestinations?.map((destination, destIndex) => (
        <div className="w-[100%] md:w-[50%] sm:w-[50%] whitespace-normal">
          <Destination
            key={destination.id}
            destination={destination}
            handleImageClick={() => handleImageClick(destination, photos[itinerary.itineraryId][destIndex])}
            photo={photos[itinerary.itineraryId] && photos[itinerary.itineraryId][destIndex]}
          />
        </div>
      ))}

    </div>
    <button className="mt-4 border p-2 hover:bg-gray-200 rounded" onClick={() => handleSelect(itinerary.itineraryId)}>Select</button>
  </div>
);

const Destination = ({ destination, handleImageClick, photo }) => (
  <div className="flex-none">
    <div
      className="mb-2 whitespace-nowrap overflow-hidden overflow-ellipsis w-[140px]" // Adjust w-[140px] to your preference
      title={destination.name}  // Tooltip to show full name on hover
    >
      {destination.name}
    </div>
    <div
      className="relative h-[200px] w-[250px] rounded-lg cursor-pointer"
      onClick={handleImageClick}
    >
      {photo && <Image objectFit='cover' layout="fill" src={photo} alt="Destination Image" />}
    </div>
  </div>
);

const DestinationModal = ({ activeDestination, onClose }) => (
  <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-70 flex items-center justify-center">
    <div className="w-[90%] sm:w-[40%] h-[50%] bg-white p-5 flex flex-col sm:flex-row">
      <div className=" relative mr-5 h-[100%] w-[100%] sm:w-[60%] max-h-[100%] max-w-[100%] sm:max-w-[60%]">
        <Image objectFit={'cover'} layout={'fill'} src={activeDestination?.image} alt="Destination" />
      </div>
      <div className="flex-2">
        <h2>{activeDestination?.name}</h2>
        <p>Rating: {activeDestination?.rating}</p>
        <p>Price Level: {activeDestination?.price}</p>
        <p>Description: {/* Destination description?? Receive from somewhere? Another API call?? */}</p>
        <button onClick={onClose} className="border border-gray-500 px-3 py-1 rounded hover:bg-gray-200">Close</button>
      </div>
    </div>
  </div>
);

export default ItineraryChooser;

/* FOR TOMORROW, CHAT has reformtted code. What needs to be done tomorrow is the generatePage should be PRETTIER / BETTER. THEN FINISH OFF THE CHOOSER PAGE. */

