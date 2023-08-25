import { useDrop } from 'react-dnd';
import Draggable from './Draggable';

const Droppable = ({promptDelete, listOfDestinations, moveDestination, itinerary, activeInputId, activeInputIndex, addDestination, submitNewDestination }) => {
    
    const [, drop] = useDrop(
        () => ({
          accept: "DESTINATION",


          hover(item, monitor) {
            const dragIndex = item.index;
            const hoverIndex = item.index;
  
            console.log(dragIndex);
            console.log(hoverIndex)
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) return;
            // Move the item
            drop: () => moveDestination(dragIndex, hoverIndex)
            // Update the index for dragged item
            item.index = hoverIndex;

          }
        }),
      
      )



    return (
        <div>
            {listOfDestinations.map((destination, index) => (
                <Draggable
                    destination={destination}
                    itinerary={itinerary}
                    activeInputId={activeInputId}
                    activeInputIndex={activeInputIndex}
                    index={index}
                    key={index}
                    addDestination={addDestination}
                    submitNewDestination={submitNewDestination}
                    promptDelete={promptDelete}
                     />

            ))}
        </div>
    );
};

export default Droppable;