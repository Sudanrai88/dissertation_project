import React, { useState } from 'react';
//Only take in Location as text, send to the backend.


const TypedLocation = ({setLocationText}) => {

  const handleLocationChange = (event) => {
    setLocationText(event.target.value);
  };

  return (
    <div className='flex flex-col'>
        <label className="text-[20px] mb-[16px]" htmlFor="locationInput">Enter your location</label>
        <input className='w-[100%] border p-2 rounded-[10px]'
          type="text"
          id="locationInput"
          onChange={handleLocationChange}
          placeholder='Birmingham, bullring'
        />
    </div>
  );
};

export default TypedLocation;
