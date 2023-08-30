import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth, signOut } from "firebase/auth";
import ConfirmModal from '@/components/ConfirmModal';
import {
    GoogleMap, LoadScript, Marker, InfoWindow,
    DirectionsService, DirectionsRenderer
} from '@react-google-maps/api';
import Image from 'next/image';
import { faStar as fasStar, faGripVertical as fasGrip, faPlus as fasPlus, faTrashCan as faTrash } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import SideNavBar from '@/components/SideNavBar/SideNavBar';



function ItineraryDetail() {
    const NEXT_PUBLIC_GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    //States
    const [itinerary, setItinerary] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [placeToDelete, setPlaceToDelete] = useState(null);
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [directions, setDirections] = useState(null);

    const [itineraryUpdated, setItineraryUpdated] = useState(false);
    const [itinerarySwapped, setItinerarySwapped] = useState(false);


    const [activeInputIndex, setActiveInputIndex] = useState(null);
    const [activeInputId, setActiveInputId] = useState(null);
    const [inputValue, setInputValue] = useState('');

    const [photoUrls, setPhotoUrls] = useState({});
    const [defaultCenter, setDefaultCenter] = useState(null);


    const router = useRouter();
    const { id, source } = router.query;

    const auth = getAuth();
    const [user, loading] = useAuthState(auth);

    //Fetch Itinerary, fix the explore click to show this page. Not all fetchPopularItineraryDetails
    useEffect(() => {
        if (!id || !source) return;

        if (source === "account") {
            fetchItineraryDetails();

        } else if (source === "dashboard") {
            fetchPopularItineraryDetails();
        }

    }, [id, user]);

    useEffect(() => {
        if (itinerary && itinerary.listOfDestinations) {
            itinerary.listOfDestinations.forEach(destination => {
                getDestinationImage(destination.placeId, destination.imagesRef);
                console.log(photoUrls)
            });
        }
    }, [itinerary]);


    //Directions Google Maps
    const fetchDirections = () => {

        if (itinerary && itinerary.listOfDestinations.length > 0) {

            const directionsService = new window.google.maps.DirectionsService();

            //ensure that the itinerary that is being read has been updated by the delete / add.
            const originLat = itinerary.listOfDestinations[0].latitude;
            const originLon = itinerary.listOfDestinations[0].longitude;
            const destinationLat = itinerary.listOfDestinations[itinerary.listOfDestinations.length - 1].latitude;
            const destinationLong = itinerary.listOfDestinations[itinerary.listOfDestinations.length - 1].longitude;
            const waypoints = itinerary.listOfDestinations.slice(1, -1).map(location => ({
                location: { lat: location.latitude, lng: location.longitude },
                stopover: false,
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

    useEffect(() => {
        if (itineraryUpdated) {
            fetchDirections();

            setItineraryUpdated(false);
        }
    }, [itineraryUpdated]);

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
            if (!user) return;
            const token = await user.getIdToken();

            const response = await fetch(`http://localhost:8080/api/itinerary/deletePlace?itineraryId=${itinerary.itineraryId}&placeId=${placeId}&index=${activeInputIndex}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': token,
                }
            });
            if (response.status === 200) {
                if (source === "account") {
                    await fetchItineraryDetails();

                } else if (source === "dashboard") {
                    await fetchPopularItineraryDetails();
                }

                handlePressedSubmit();

                //Remove the place from the local state 
                // so that it disappears from the UI aswell
                const updatedDestinations = itinerary.listOfDestinations.filter(dest => dest.placeId !== placeId);
                setItinerary(prev => ({ ...prev, listOfDestinations: updatedDestinations }));
                setItineraryUpdated(true);

            }

            else {
                // Handle any errors
                console.error("Failed to delete place");
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    }

    const addDestination = (placeId, index) => {
        setActiveInputId(placeId);
        setActiveInputIndex(index);
        console.log(index)
        setInputValue(''); // optionally clear the input when switching between items
    };

    const handleLocationChange = (event) => {
        setInputValue(event.target.value);
    };

    const handlePressedSubmit = () => {
        setActiveInputId(null);
    }

    async function submitNewDestination(itineraryId) {
        //On button click send the text location to the backend, which does an API call to find the singular itinerary by name, this then saves the itinerary to
        //the specific user itinerary in the database therefore showing in the frontend!
        //The endpoint needs, locationText, 
        if (!user) return;
        console.log(inputValue);
        const token = await user.getIdToken();
        try {
            const response = await fetch(`http://localhost:8080/api/itinerary/addNewItinerary`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
                body: JSON.stringify({ inputValue, itineraryId, index: activeInputIndex }),
            });

            if (response.ok) {
                // Fetch itineraries again to reload on the view
                if (source === "account") {
                    await fetchItineraryDetails();

                } else if (source === "dashboard") {
                    await fetchPopularItineraryDetails();
                }
                console.log(itinerary)
                handlePressedSubmit();
                setItineraryUpdated(true);

            } else {
                // Error handling
                console.error("Failed to add new destination");
            }
        } catch {
            console.error("Error while sending data to backend:", error);
        }

    };

    //Delete a place Modal
    async function handleConfirmDelete() {
        if (placeToDelete) {
            await deletePlace(placeToDelete);
        }
        setModalOpen(false);
    }


    async function swapOrderIndex(source, toGoDestination) {
        const itineraryId = itinerary.itineraryId;
        console.log("accessed")

        if (!user) return;
        const token = await user.getIdToken();
        try {
            const response = await fetch(`http://localhost:8080/api/itinerary/swapOrderIndex`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
                body: JSON.stringify({ source, itineraryId, toGoDestination }),
            });
            if (response.ok) {
                fetchItineraryDetails();
            }
        } catch (error) {
            console.error(error);

        }
    }


    const getDestinationImage = (placeId, photoRef) => {
        const storageKey = `photoUrl_${placeId}`;
        const cachedUrl = localStorage.getItem(storageKey);

        if (cachedUrl) {
            console.log("From cache");
            setPhotoUrls(prevState => ({ ...prevState, [placeId]: cachedUrl }));
        } else if (photoRef) {
            const baseUrl = 'https://maps.googleapis.com/maps/api/place/photo';
            const maxWidth = 400;
            const finalUrl = `${baseUrl}?maxwidth=${maxWidth}&photo_reference=${photoRef}&key=${NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
            console.log("callMade");

            // Set the URL in the state
            setPhotoUrls(prevState => ({ ...prevState, [placeId]: finalUrl }));
            localStorage.setItem(storageKey, finalUrl);
        }

    };

    const handleOnDragEnd = (result) => {
        //Change the index of the destinations in the itinerary list (AS WELL AS DOING SO FOR THE BACKEND)
        //Can do both the with 1 call as the positioning
        if (!result.destination) return;

        const source = result.source.index + 1
        const toGoDestination = result.destination.index + 1

        swapOrderIndex(source, toGoDestination);

    }

    //Prompt for Modal
    function promptDelete(placeId, index) {
        setPlaceToDelete(placeId);
        setActiveInputIndex(index)
        console.log(index)
        setModalOpen(true);
    }

    const mapStyles = {
        height: "100%",
        width: "100%"
    };

    const onMarkerClick = ((index, destination) => {
        if (itinerary && itinerary.listOfDestinations.length > 0) {
            console.log("changed2")
            console.log(itinerary.listOfDestinations[index].latitude)
            setDefaultCenter({
                lat: itinerary.listOfDestinations[index].latitude,
                lng: itinerary.listOfDestinations[index].longitude
            });
        }

        setSelectedPlace(destination)

    })

    if (!itinerary) return <div>Loading...</div>;


    //Add an order to the map to itienrary
    return (

        <div className="itinerary-detail">
            <SideNavBar />
            <div className="left-content max-w-[800px] lg:min-w-[740px] px-[0px] sm:px-[16px] ml-[25px] sm:ml-[0px]">
                <div className="">
                    <h2 className="text-[30px] font-bold  sm:mx-[60px] p-[20px]"> Trip to {itinerary.itineraryId}</h2>
                </div>
                <hr></hr>
                <div className=''>
                    <div className='flex justify-center'>
                        <div className="text-[25px] font-bold w-[90%]">
                            <h3 >
                                Itinerary
                            </h3>
                        </div>
                    </div>

                    <div className=' '>
                        <div className='flex justify-center'>
                            <div className='w-[90%]'>
                                <h3 >
                                    Day 1
                                </h3>
                            </div>
                        </div>

                        <DragDropContext onDragEnd={handleOnDragEnd}>
                            <Droppable droppableId='Destinations'>
                                {(provided) =>
                                (
                                    <div className='Whole Itinerary' {...provided.droppableProps} ref={provided.innerRef}>
                                        {itinerary.listOfDestinations.map((destination, index) => (
                                            <Draggable key={destination.placeId} draggableId={destination.placeId} index={index}>
                                                {(provided) => (
                                                    <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} className='Each Destination'>
                                                        <div className='flex p-2'>
                                                            <div className='flex items-center'>
                                                                <FontAwesomeIcon icon={fasGrip} />
                                                            </div>
                                                            <div className='left-spacer w-[20px]'>
                                                            </div>
                                                            <div className='px-5 py-4 w-[70%] bg-gray-100 rounded-[10px]'>
                                                                <li className='font-bold'>{destination.name} </li>
                                                                <div className='flex'>
                                                                    <div className='text-[#ec9b3b]'>
                                                                        <p > <FontAwesomeIcon icon={fasStar} /> {destination.rating} </p>
                                                                    </div>
                                                                    <div className="text-gray-600 ml-[8px]">
                                                                        <p> ({destination.rating_amount})</p>
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <p> Description about the place! </p>
                                                                </div>
                                                                <div className='flex justify-between' >
                                                                    <button> add time </button>
                                                                    <button className=""> add cost </button>
                                                                </div>

                                                            </div>
                                                            <div className='DestinationImage relative mx-[20px] w-[40%]'>
                                                                {photoUrls[destination.placeId] && <Image className="rounded-[10px]" objectFit='cover' layout="fill" src={photoUrls[destination.placeId]} alt="Destination Image" />}
                                                            </div>
                                                            <div>
                                                                <button onClick={() => promptDelete(destination.placeId, destination.order)}> <FontAwesomeIcon icon={faTrash} /> </button>
                                                            </div>
                                                        </div>
                                                        <div className='relative group'>
                                                            {activeInputId === destination.placeId ? (
                                                                <>
                                                                    <input
                                                                        type="text"
                                                                        onChange={handleLocationChange}
                                                                        placeholder="Enter destination..."
                                                                        autoFocus
                                                                    />

                                                                    <button onClick={() => submitNewDestination(itinerary.itineraryId)}>submit</button>
                                                                </>

                                                            ) : (
                                                                <button onClick={() => addDestination(destination.placeId, destination.order)} className="ml-[40px] hover:text-blue-500 invisible group-hover:visible">
                                                                    <FontAwesomeIcon icon={fasPlus} />
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}

                            </Droppable>
                        </DragDropContext>
                    </div>

                </div>
                <ConfirmModal
                    isOpen={isModalOpen}
                    message="Are you sure you want to delete this?"
                    onConfirm={handleConfirmDelete}
                    onCancel={() => setModalOpen(false)}
                />
            </div>

            <div className="right-content hidden md:block">
                <LoadScript googleMapsApiKey={NEXT_PUBLIC_GOOGLE_MAPS_API_KEY} onLoad={fetchDirections}>
                    <GoogleMap mapContainerStyle={mapStyles} zoom={10} center={defaultCenter} isMarkerShown={false}>
                        <DirectionsRenderer directions={directions} suppressInfoWindows={true} suppressMarkers={true} />
                        {itinerary.listOfDestinations.map((destination, index) => (
                            <div key={index}>
                                <Marker
                                    position={{ lat: destination.latitude, lng: destination.longitude }}
                                    label={`${index + 1}`}
                                    onClick={() => onMarkerClick(index, destination)}
                                />
                                {selectedPlace === destination && (
                                    <InfoWindow
                                        position={{ lat: destination.latitude, lng: destination.longitude }}
                                        onCloseClick={() => setSelectedPlace(null)}
                                    >
                                        <div className="">

                                            <div className="">

                                                <h4>{destination.name}</h4>
                                                <img src={destination.imageUrl} alt={destination.name} />

                                            </div>
                                        </div>
                                    </InfoWindow>
                                )}
                            </div>
                        ))}
                    </GoogleMap>
                </LoadScript>
            </div>
        </div>

    );
}


export default ItineraryDetail;