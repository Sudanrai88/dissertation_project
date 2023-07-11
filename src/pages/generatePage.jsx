import React, { useState } from 'react';
import AccessLocation from '@/components/AccessLocation';
import TypedLocation from '@/components/TypedLocation';
import RadiusSelector from '@/components/RadiusSelector';
import PreferenceSelector from '@/components/Preferences/PreferenceSelector';

function generatePage() {
  const [preferences, setPreferences] = useState({});
  const [radius, setFetchRadius] = useState('');
  
  const [accessedLatitude, setAccessedLatitude] = useState('');
  const [accessedLongitude, setAccessedLongitude] = useState('');
  const [locationText, setLocationText] = useState('');
  // Other state variables and functions for collecting data

  const handleSearch = () => {
    const requestData = {
      preferences,
      radius,
      accessedLatitude,
      accessedLongitude,
      locationText,
    };

    console.log('Request Data:', requestData);

    fetch('http://localhost:8080/api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data
        console.log('Received response:', data);
      })
      .catch((error) => {
        // Handle any errors
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <div>
        <button>
          <AccessLocation setAccessedLatitude={setAccessedLatitude} setAccessedLongitude={setAccessedLongitude}/>
        </button>
      </div>
      <div>
        <TypedLocation setLocationText={setLocationText}   />
      </div>
      <div>
        <RadiusSelector setFetchRadius={setFetchRadius} />
      </div>
      <div>
        <PreferenceSelector setPreferences={setPreferences} />
      </div>
      <button onClick={handleSearch}>Search </button>
    </div>
  );
}

export default generatePage;
