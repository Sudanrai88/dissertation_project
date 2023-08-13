import React, { useState } from 'react';
//Only take in Location as text, send to the backend.


const TypedLocation = ({setLocationText}) => {

  const handleLocationChange = (event) => {
    setLocationText(event.target.value);
  };

  return (
    <div>
      <form>
        <label htmlFor="locationInput">Enter Location:</label>
        <input
          type="text"
          id="locationInput"
          onChange={handleLocationChange}
        />
      </form>
    </div>
  );
};

export default TypedLocation;
