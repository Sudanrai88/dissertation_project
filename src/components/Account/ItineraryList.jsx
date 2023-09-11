import { React, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ConfirmModal from '../ConfirmModal';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from "firebase/auth";
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';



const NEXT_PUBLIC_GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

function ItineraryList({ popItineraries, source, itinerary, onDelete, addItineraryToPopular, showActions, showPopular, BottomMargin }) {

    const router = useRouter();
    const [photoUrl, setPhotoUrl] = useState('');
    const auth = getAuth();
    const [user, loading] = useAuthState(auth);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [itineraryToDelete, setItineraryToDelete] = useState(null);
    const [itineraryToAdd, setItineraryToAdd] = useState(null);
    const [isActionModalOpen, setActionModalOpen] = useState(false);
    const [isLiked, setIsLiked] = useState(false);

    const currentItinerary = source === "dashboard" ? popItineraries : itinerary;


    useEffect(() => {
        // Get the photoRef
        const photoRef = currentItinerary.listOfDestinations?.find(destination => destination?.images)?.images;
        const itineraryId = currentItinerary.itineraryId;

        // Construct a unique key for local storage using the itinerary ID
        const storageKey = `photoUrl_${itineraryId}`;

        // Checks if the image is in locl storage
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
        const likedStorageKey = `isLiked_${itineraryId}`;
        const likedInStorage = localStorage.getItem(likedStorageKey);

        if (likedInStorage) {
            setIsLiked(likedInStorage === 'true');
        }
    }, [itinerary, popItineraries]);

    const handleLikeClick = async () => {
        const newValue = isLiked ? -1 : 1;

        popItineraries.userLikes += newValue;


        try {
            const response = await fetch(`https://touristic-backend-75e99f3f8303.herokuapp.com/api/itinerary/changeLike?itineraryId=${popItineraries.itineraryId}&value=${newValue}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            setIsLiked(!isLiked);

            const likedStorageKey = `isLiked_${popItineraries.itineraryId}`;
            localStorage.setItem(likedStorageKey, String(!isLiked));
        } catch (error) {
            popItineraries.userLikes -= newValue;
            console.error("Error changing like:", error);
        }
    };


    //Prompt for Modal
    function promptDelete(itineraryId) {
        setItineraryToDelete(itineraryId);
        setDeleteModalOpen(true);
    }

    //Delete a place Modal
    async function handleConfirmDelete() {
        if (itineraryToDelete) {
            await onDelete(itineraryToDelete);
        }
        setDeleteModalOpen(false);
    }

    function promptAdd(itineraryId) {
        setItineraryToAdd(itineraryId);
        setAddModalOpen(true);
    }

    async function handleConfirmAdd() {
        if (itineraryToAdd) {
            await addItineraryToPopular(itineraryToAdd);
        }
        setAddModalOpen(false);
    }

    function handleItineraryClick() {
        router.push({
            pathname: `/itinerary/${currentItinerary.itineraryId}`,
            query: { source: source }
        });
    }


    return (
        <div className="flex">
            <div className={`px-0 sm:px-2 h-[250px] w-[330px] smallerPhones:h-[300px] smallerPhones:w-[350px] ${BottomMargin} pb-[60px] sm:py-0 sm:h-[220px] sm:w-[270px]`}>
                <div className={`relative sm:h-[165px] sm:w-[253px] h-[100%] w-[100%] rounded-[20px]`} onClick={handleItineraryClick}>
                    {photoUrl && <Image className="rounded-[10px]" objectFit='cover' layout="fill" src={photoUrl} alt="Destination Image" />}
                    {showActions && (
                        <div
                            className="absolute top-2 right-2 cursor-pointer bg-[rgba(33,37,41,.502)] px-[6px] rounded-full "
                            onClick={(e) => {
                                e.stopPropagation();
                                setActionModalOpen(!isActionModalOpen);  // toggle the modal's visibility
                            }}
                        >
                            <div className='items-center text-white'>
                                ≡
                            </div>

                            {isActionModalOpen && (
                                <div className="absolute mt-2 right-0 bg-white rounded  p-2">
                                    <button onClick={() => {
                                        promptDelete(itinerary.itineraryId);
                                        setActionModalOpen(false);
                                    }}>
                                        Delete
                                    </button>
                                    <button onClick={() => {
                                        promptAdd(itinerary.itineraryId);
                                        setActionModalOpen(false);
                                    }}>
                                        Share
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                </div>
                <div className='p-[4px] text-[17px] font-medium'>
                    <h3 onClick={handleItineraryClick}> {currentItinerary.itineraryId}</h3>
                </div>
                <div >
                    {showPopular && (
                        <>
                            <div className='Description px-[4px] overflow-hidden whitespace-nowrap truncate w-[263px]'>
                                Hello there Hello there Hello there v Hello there
                            </div>
                            <div className='Likes px-[4px]'>

                                <p>
                                    <FontAwesomeIcon
                                        icon={isLiked ? fasHeart : farHeart}
                                        onClick={handleLikeClick}
                                        className="cursor-pointer transform hover:scale-110 transition-transform duration-150" 
                                    /> {popItineraries.userLikes}
                                </p>



                            </div>
                        </>
                
                
                )}
                </div>
            </div>

            <ConfirmModal
                isOpen={isDeleteModalOpen}
                message="Are you sure you want to delete this?"
                onConfirm={handleConfirmDelete}
                onCancel={() => setDeleteModalOpen(false)}
            />
            <ConfirmModal
                isOpen={isAddModalOpen}
                message="Are you sure you want to share this?"
                onConfirm={handleConfirmAdd}
                onCancel={() => setAddModalOpen(false)}
            />
        </div>
    );
}

export default ItineraryList;