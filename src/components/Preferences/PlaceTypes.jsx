import React, { useState } from 'react';

function PlaceTypes() {
  const groupTypes = {
    'Food':['cafe', 'bar', 'bakery', 'restaurant'],
    'Tourist Spots':['tourist_attraction', 'point_of_interest', 'amusement_park', 'natural_feature'],
    'Art':['art_gallery', 'museum'],
    'Active':['stadium', 'amusement_park'],
    'Relaxed':['book_store', 'cafe', 'painter'],
  };

  const [selectedGroupTypes, setSelectedGroupTypes] = useState([]);

  const handleCheckboxChange = (e) => {
    const value = e.target.value;

    if (e.target.checked) {
      if (selectedGroupTypes.length < 2)
      setSelectedGroupTypes([...selectedGroupTypes, value]);
    } else {
      setSelectedGroupTypes(selectedGroupTypes.filter((group) => group !== value));
    }
  };
  
  return (
    <div>
      <h3>What type of places are you interested in visiting?</h3>
      <p> Select a maximum of 2 types.</p>

      {Object.entries(groupTypes).map(([groupName, placeTypes]) => (
        <label key={groupName}>
          <input
            type="checkbox"
            value={groupName}
            checked={selectedGroupTypes.includes(groupName)}
            onChange={handleCheckboxChange}
          />
          {groupName}
        </label>
      ))}
      <p>You selected: {selectedGroupTypes.join(', ')}</p>
    </div>
  );
}

export default PlaceTypes;
