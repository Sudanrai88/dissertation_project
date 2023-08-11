import React, { useState } from 'react';
//Only take in Location as text, send to the backend.


const TypedLocation = ({setLocationText}) => {
  const [location, setLocation] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleLocationSubmit = (event) => {
    event.preventDefault();
    if (location.trim() === '') {
      return;
    }
    // Perform geocoding to convert location to coordinates, useful later to send ot backend
    geocodeLocation(location)
      .then((coordinates) => {
        setLatitude(coordinates.latitude);
        setLongitude(coordinates.longitude);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const geocodeLocation = async (location) => {
    const apiKey = 'AIzaSyCPK1WX2UJH0XJBMtdpV_MhGVwLeXi6ix0';
    const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${apiKey}`;

    const response = await fetch(geocodingUrl);
    const data = await response.json();

    if (data.status === 'OK' && data.results.length > 0) {
      const result = data.results[0];
      const { lat, lng } = result.geometry.location;
      setLocationText(location);
      
      return { latitude: lat, longitude: lng };
    } else {
      throw new Error('Geocoding failed');
    }
  };

  return (
    <div>
      <form onSubmit={handleLocationSubmit}>
        <label htmlFor="locationInput">Enter Location:</label>
        <input
          type="text"
          id="locationInput"
          value={location}
          onChange={handleLocationChange}
        />
        <button type="submit">Submit</button>
      </form>
      {latitude !== null && longitude !== null && (
        <div>
          <h3>Coordinates:</h3>
          <p>Latitude: {latitude}</p> {/*Displayed in browser for now*/}
          <p>Longitude: {longitude}</p>
        </div>
      )}
    </div>
  );
};

export default TypedLocation;
