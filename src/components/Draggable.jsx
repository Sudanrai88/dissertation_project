import { useDrag } from 'react-dnd';
import { faStar as fasStar, faGripVertical as fasGrip, faPlus as fasPlus, faTrashCan as faTrash } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Draggable = ({ itinerary, index, activeInputId, addDestination, submitNewDestination, promptDelete, destination }) => {
    const [, ref] = useDrag({
        type: 'DESTINATION',
        item: { index },
    });

    // Use your existing render code for each destination item
    return (
        <div ref={ref}>
                <div key={index}>
                    <div className='flex p-2'>
                        <div
                            className='flex items-center'
                            style={{ cursor: 'grab' }} // Add the hand cursor only to the grip
                        >
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
                        <div className='px-5 w-[40%]'>
                            <p> hi </p>
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
        </div>


    );
};

export default Draggable;