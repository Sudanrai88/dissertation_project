import React, { useEffect, useState } from 'react';

function PlaceTypes({ setGroupTypes }) {
  const groupTypes = {
    'Food': ['cafe', 'bar', 'bakery', 'restaurant'],
    'Tourist Spots': ['tourist_attraction', 'point_of_interest', 'amusement_park', 'natural_feature'],
    'Art': ['art_gallery', 'museum'],
    'Active': ['stadium', 'amusement_park'],
    'Relaxed': ['book_store', 'cafe', 'painter'],
  };

  const [selectedGroupTypes, setSelectedGroupTypes] = useState([]);

  useEffect(() => {
    setGroupTypes(selectedGroupTypes);
  }, [selectedGroupTypes]);

  function handleButtonClick(groupName) {
    if (selectedGroupTypes.includes(groupName)) {
      setSelectedGroupTypes(prev => prev.filter(g => g !== groupName));
    } else {
      if (selectedGroupTypes.length < 2) {
        setSelectedGroupTypes(prev => [...prev, groupName]);
      }
    }
  }

  return (
    <div>
      <h3 className='text-[20px] mb-[10px]'>What type of activities are you interested in?</h3>
      <p className='text-[16px] mb-[16px] text-gray-600 font-thin '> Select a maximum of 2 types.</p>

      <div className='flex flex-row justify-between'>
      {Object.entries(groupTypes).map(([groupName, placeTypes]) => (
        
          <label key={groupName} className='w-1/5' >
            <button
              key={groupName}
              className={`px-4 border cursor-pointer m-[5px] w-[90%] ${selectedGroupTypes.includes(groupName) ? 'border-blue-600' : ''}`}
              onClick={() => handleButtonClick(groupName)}
            >
              {groupName}
            </button>
          </label>
        
      ))}
      </div>
    </div>
  );
}

export default PlaceTypes;
